/**
 * Description : client.ts - 📌 타입 안전한 API 클라이언트
 * Author : Shiwoo Min
 * Date : 2025-09-16
 */
import type {
  CreatePaymentRequest,
  CreateProgramRequest,
  CreateReservationRequest,
  CreateSessionRequest,
  CreateVenueRequest,
  ErrorResponse,
  ListResponse,
  Payment,
  PaymentIntentResponse,
  PaymentMethod,
  PaymentStatus,
  Program,
  ProgramListResponse,
  ReservationResponse,
  ReservationStatus,
  Room,
  RoomStatus,
  Session,
  SessionListResponse,
  SessionStatus,
  SuccessResponse,
  UpdateUserRequest,
  User,
  UserListResponse,
  UserRole,
  Venue,
} from './schemas';

/**
 * @description API 클라이언트 설정용 인터페이스
 */
export interface ApiClientOptions {
  baseUrl?: string;
  getToken?: (() => Promise<string | null>) | string | null;
  timeout?: number;
  retries?: number;
}

/**
 * @description API 요청 중 에러 발생 시 사용되는 클래스
 */
export class ApiError extends Error {
  public readonly status: number;
  public readonly code?: string | undefined;
  public readonly data?: unknown;

  constructor(message: string, status: number, code?: string, data?: unknown) {
    super(message);
    this.status = status;
    this.code = code;
    this.data = data;
    this.name = 'ApiError';
  }

  /**
   * @description 오류 응답 객체를 ApiError 인스턴스로 변환
   */
  static fromErrorResponse(response: ErrorResponse, status: number): ApiError {
    return new ApiError(response.error, status, response.code, response.details);
  }
}

/**
 * @description 쿼리 파라미터에서 허용하는 기본 프리미티브 타입
 */
type QueryPrimitive = string | number | boolean | null | undefined;

/**
 * @description 개별 요청 옵션 타입 정의
 */
interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: unknown;
  params?: Record<string, QueryPrimitive> | undefined;
  headers?: Record<string, string>;
}

/**
 * @description 공통 리스트 API 파라미터 타입 (페이지네이션, 검색 등)
 */
type BaseListParams = {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
} & Record<string, QueryPrimitive>;

/**
 * @description 유저 리스트 파라미터 타입
 */
type UserListParams = BaseListParams & {
  role?: UserRole;
  isActive?: boolean;
};

/**
 * @description 세션 리스트 파라미터 타입
 */
type SessionListParams = BaseListParams & {
  programId?: string;
  venueId?: string;
  status?: SessionStatus;
  startDate?: string;
  endDate?: string;
};

/**
 * @description 예약 리스트 파라미터 타입
 */
type ReservationListParams = BaseListParams & {
  roomId?: string;
  userId?: string;
  status?: ReservationStatus;
  startDate?: string;
  endDate?: string;
};

/**
 * @description 결제 리스트 파라미터 타입
 */
type PaymentListParams = BaseListParams & {
  userId?: string;
  status?: PaymentStatus;
  method?: PaymentMethod;
  minAmount?: number;
  maxAmount?: number;
};

/**
 * @description 타입 안전하고 재시도 기능 포함한 API 클라이언트 클래스
 */
export class ApiClient {
  private readonly baseUrl: string;
  private readonly getToken: string | (() => Promise<string | null>) | null | undefined;
  private readonly timeout: number;
  private readonly retries: number;

  constructor(options: ApiClientOptions = {}) {
    this.baseUrl = options.baseUrl || '/api';
    this.getToken = options.getToken;
    this.timeout = options.timeout ?? 30_000;
    this.retries = options.retries ?? 3;
  }

  /**
   * @description 재시도 로직을 포함한 핵심 HTTP 요청 메서드
   * @param endpoint API 경로
   * @param options 요청 설정
   * @returns 제네릭 타입의 응답 데이터
   */
  private async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    let lastError: Error | null = null;
    for (let attempt = 0; attempt <= this.retries; attempt++) {
      try {
        return await this.performRequest<T>(endpoint, options);
      } catch (error) {
        lastError = error as Error;

        // 재시도 불가 판단
        if (attempt === this.retries || !this.shouldRetry(error)) {
          throw error;
        }

        // 지수적 백오프 대기 (exponential backoff)
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
      }
    }
    throw lastError;
  }

  /**
   * @description 에러가 재시도 가능한지 판단하는 헬퍼 메서드
   * @param error 에러 객체
   * @returns 재시도 가능 여부
   */
  private shouldRetry(error: unknown): boolean {
    if (error instanceof ApiError) {
      const retryableStatusCodes = [408, 429, 500, 502, 503, 504];
      return retryableStatusCodes.includes(error.status);
    }
    if (error instanceof Error) {
      return error.name === 'AbortError' || error.message.includes('fetch');
    }
    return false;
  }

  /**
   * @description 실제 HTTP 요청 수행
   * @param endpoint API 경로
   * @param options 요청 옵션
   * @returns 제네릭 타입의 응답 데이터
   */
  private async performRequest<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const { method = 'GET', body, params, headers: customHeaders } = options;

    // 쿼리스트링 생성
    let url = `${this.baseUrl}${endpoint}`;
    if (params) {
      const sp = new URLSearchParams();
      for (const [k, v] of Object.entries(params)) {
        if (v === undefined || v === null) continue;
        if (typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean') {
          sp.set(k, String(v));
        }
      }
      const qs = sp.toString();
      if (qs) url += `?${qs}`;
    }

    // 헤더 설정
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...customHeaders,
    };

    // 토큰 인증 헤더 추가
    if (this.getToken) {
      const token = typeof this.getToken === 'function' ? await this.getToken() : this.getToken;
      if (token) headers['Authorization'] = `Bearer ${token}`;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url, {
        method,
        headers,
        ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (!response.ok) {
        await this.handleErrorResponse(response);
      }
      return await this.handleSuccessResponse<T>(response);
    } catch (error) {
      clearTimeout(timeoutId);
      if (error instanceof ApiError) throw error;
      if (error instanceof Error) {
        throw new ApiError(error.name === 'AbortError' ? 'Request timeout' : error.message, 0);
      }
      throw new ApiError('Unknown error occurred', 0);
    }
  }

  /**
   * @description 에러 응답 처리 헬퍼
   * @param response Fetch API Response
   * @throws ApiError 관련 에러
   */
  private async handleErrorResponse(response: Response): Promise<never> {
    let errorData: unknown;
    try {
      errorData = await response.json();
    } catch {
      try {
        errorData = await response.text();
      } catch {
        errorData = null;
      }
    }

    if (errorData && typeof errorData === 'object' && 'error' in errorData) {
      throw ApiError.fromErrorResponse(errorData as ErrorResponse, response.status);
    }

    const message = typeof errorData === 'string' ? errorData : `HTTP ${response.status}: ${response.statusText}`;
    throw new ApiError(message, response.status, undefined, errorData);
  }

  /**
   * @description 성공 응답 처리 헬퍼
   * @param response Fetch API Response
   * @returns 제네릭 타입 성공 데이터
   */
  private async handleSuccessResponse<T>(response: Response): Promise<T> {
    if (response.status === 204) return undefined as T;

    try {
      const data: unknown = await response.json();
      if (data && typeof data === 'object' && 'message' in data && 'data' in data) {
        return (data as { data: T }).data;
      }
      return data as T;
    } catch {
      return (await response.text()) as unknown as T;
    }
  }

  /**
   * @description 인증 관련 API 엔드포인트 모음
   */
  auth = {
    login: (email: string, password: string) =>
      this.request<{ user: User; token: string }>('/auth/login', {
        method: 'POST',
        body: { email, password },
      }),
    logout: () => this.request<void>('/auth/logout', { method: 'POST' }),
    me: () => this.request<User>('/auth/me'),
    refresh: () => this.request<{ token: string }>('/auth/refresh', { method: 'POST' }),
    google: {
      url: () => this.request<{ url: string }>('/auth/google'),
      callback: (code: string, state?: string) =>
        this.request<{ user: User; token: string }>('/auth/google/callback', {
          method: 'POST',
          body: { code, state },
        }),
    },
  };

  /**
   * @description 사용자 API 엔드포인트 모음
   */
  users = {
    list: (params?: UserListParams) => this.request<UserListResponse>('/users', params ? { params } : {}),
    create: (data: UpdateUserRequest) => this.request<User>('/users', { method: 'POST', body: data }),
    get: (id: string) => this.request<User>(`/users/${id}`),
    update: (id: string, data: UpdateUserRequest) => this.request<User>(`/users/${id}`, { method: 'PUT', body: data }),
    delete: (id: string) => this.request<void>(`/users/${id}`, { method: 'DELETE' }),
    updateRole: (id: string, role: UserRole) => this.request<User>(`/users/${id}/role`, { method: 'PATCH', body: { role } }),
  };

  /**
   * @description 지점 및 방 API 엔드포인트
   */
  venues = {
    list: (params?: BaseListParams) => this.request<ListResponse<Venue>>('/venues', params ? { params } : {}),
    create: (data: CreateVenueRequest) => this.request<Venue>('/venues', { method: 'POST', body: data }),
    get: (id: string) => this.request<Venue>(`/venues/${id}`),
    update: (id: string, data: Partial<CreateVenueRequest>) => this.request<Venue>(`/venues/${id}`, { method: 'PUT', body: data }),
    delete: (id: string) => this.request<void>(`/venues/${id}`, { method: 'DELETE' }),
    rooms: {
      list: (venueId: string, params?: BaseListParams) => this.request<ListResponse<Room>>(`/venues/${venueId}/rooms`, params ? { params } : {}),
      create: (venueId: string, data: { name: string; capacity?: number }) =>
        this.request<Room>(`/venues/${venueId}/rooms`, { method: 'POST', body: data }),
      get: (venueId: string, roomId: string) => this.request<Room>(`/venues/${venueId}/rooms/${roomId}`),
      update: (venueId: string, roomId: string, data: { name?: string; capacity?: number; status?: RoomStatus }) =>
        this.request<Room>(`/venues/${venueId}/rooms/${roomId}`, { method: 'PUT', body: data }),
      delete: (venueId: string, roomId: string) => this.request<void>(`/venues/${venueId}/rooms/${roomId}`, { method: 'DELETE' }),
    },
  };

  /**
   * @description 프로그램 API 엔드포인트
   */
  programs = {
    list: (params?: BaseListParams) => this.request<ProgramListResponse>('/programs', params ? { params } : {}),
    create: (data: CreateProgramRequest) => this.request<Program>('/programs', { method: 'POST', body: data }),
    get: (id: string) => this.request<Program>(`/programs/${id}`),
    update: (id: string, data: Partial<CreateProgramRequest>) => this.request<Program>(`/programs/${id}`, { method: 'PUT', body: data }),
    delete: (id: string) => this.request<void>(`/programs/${id}`, { method: 'DELETE' }),
    activate: (id: string) => this.request<Program>(`/programs/${id}/activate`, { method: 'POST' }),
    deactivate: (id: string) => this.request<Program>(`/programs/${id}/deactivate`, { method: 'POST' }),
  };

  /**
   * @description 세션 API 엔드포인트
   */
  sessions = {
    list: (params?: SessionListParams) => this.request<SessionListResponse>('/sessions', params ? { params } : {}),
    create: (data: CreateSessionRequest) => this.request<Session>('/sessions', { method: 'POST', body: data }),
    get: (id: string) => this.request<Session>(`/sessions/${id}`),
    update: (id: string, data: Partial<CreateSessionRequest>) => this.request<Session>(`/sessions/${id}`, { method: 'PUT', body: data }),
    delete: (id: string) => this.request<void>(`/sessions/${id}`, { method: 'DELETE' }),
    confirm: (id: string) => this.request<Session>(`/sessions/${id}/confirm`, { method: 'POST' }),
    cancel: (id: string, reason?: string) => this.request<Session>(`/sessions/${id}/cancel`, { method: 'POST', body: { reason } }),
    complete: (id: string) => this.request<Session>(`/sessions/${id}/complete`, { method: 'POST' }),
    participants: {
      list: (sessionId: string) => this.request<{ participants: any[] }>(`/sessions/${sessionId}/participants`),
      add: (sessionId: string, userId: string) =>
        this.request<any>(`/sessions/${sessionId}/participants`, {
          method: 'POST',
          body: { userId },
        }),
      remove: (sessionId: string, userId: string) => this.request<void>(`/sessions/${sessionId}/participants/${userId}`, { method: 'DELETE' }),
      updateStatus: (sessionId: string, userId: string, status: string) =>
        this.request<any>(`/sessions/${sessionId}/participants/${userId}`, {
          method: 'PATCH',
          body: { status },
        }),
    },
  };

  /**
   * @description 예약 API 엔드포인트
   */
  reservations = {
    list: (params?: ReservationListParams) => this.request<ListResponse<ReservationResponse>>('/reservations', params ? { params } : {}),
    create: (data: CreateReservationRequest) => this.request<ReservationResponse>('/reservations', { method: 'POST', body: data }),
    get: (id: string) => this.request<ReservationResponse>(`/reservations/${id}`),
    update: (id: string, data: Partial<CreateReservationRequest>) =>
      this.request<ReservationResponse>(`/reservations/${id}`, { method: 'PUT', body: data }),
    cancel: (id: string, reason?: string) => this.request<ReservationResponse>(`/reservations/${id}/cancel`, { method: 'POST', body: { reason } }),
    confirm: (id: string) => this.request<ReservationResponse>(`/reservations/${id}/confirm`, { method: 'POST' }),
  };

  /**
   * @description 결제 API 엔드포인트
   */
  payments = {
    list: (params?: PaymentListParams) => this.request<ListResponse<Payment>>('/payments', params ? { params } : {}),
    create: (data: CreatePaymentRequest) => this.request<PaymentIntentResponse>('/payments', { method: 'POST', body: data }),
    get: (id: string) => this.request<Payment>(`/payments/${id}`),
    confirm: (id: string, paymentMethodId: string) =>
      this.request<Payment>(`/payments/${id}/confirm`, {
        method: 'POST',
        body: { paymentMethodId },
      }),
    cancel: (id: string, reason?: string) => this.request<Payment>(`/payments/${id}/cancel`, { method: 'POST', body: { reason } }),
    refund: (id: string, amount?: number, reason?: string) =>
      this.request<Payment>(`/payments/${id}/refund`, { method: 'POST', body: { amount, reason } }),
  };
}

/**
 * @description ApiClient 인스턴스 생성 팩토리 함수
 */
export function createApiClient(options: ApiClientOptions = {}) {
  return new ApiClient(options);
}

/**
 * @description 기본 설정으로 생성된 ApiClient 인스턴스
 */
export const api = createApiClient();

/**
 * @description 오류가 ApiError인지 확인하는 타입 가드
 * @param e 확인 대상 오류
 * @returns true면 ApiError 타입
 */
export const isApiError = (e: unknown): e is ApiError => e instanceof ApiError;

/**
 * @description 오류를 ApiError로 래핑해 재던지는 헬퍼 함수
 * @param error 대상 오류
 * @throws ApiError
 */
export function handleApiError(error: unknown): never {
  if (isApiError(error)) throw error;
  if (error instanceof Error) throw new ApiError(error.message, 0);
  throw new ApiError('Unknown error occurred', 0);
}

/**
 * @description 응답이 ErrorResponse 타입인지 확인하는 타입 가드
 * @param d 확인 대상 응답 데이터
 * @returns true면 ErrorResponse 타입
 */
export const isErrorResponse = (d: unknown): d is ErrorResponse =>
  typeof d === 'object' && d !== null && 'error' in d && typeof (d as any).error === 'string';

/**
 * @description 응답이 SuccessResponse 타입인지 확인하는 타입 가드
 * @param d 확인 대상 응답 데이터
 * @returns true면 SuccessResponse 타입
 */
export const isSuccessResponse = (d: unknown): d is SuccessResponse =>
  typeof d === 'object' && d !== null && 'message' in d && typeof (d as any).message === 'string';

/**
 * @description API 서버 헬스 체크 함수
 * @param client ApiClient 인스턴스 (기본값: api)
 * @returns API가 정상 응답하면 true, 아니면 false
 */
export async function checkApiHealth(client: ApiClient = api): Promise<boolean> {
  try {
    await (client as any).request('/health', { method: 'GET' });
    return true;
  } catch {
    return false;
  }
}
