/**
 * Description : client.ts - 📌 타입 안전한 API 클라이언트
 * Author : Shiwoo Min
 * Date : 2025-09-16
 */
import type { CreatePaymentRequest, CreateProgramRequest, CreateReservationRequest, CreateSessionRequest, CreateVenueRequest, ErrorResponse, ListResponse, Payment, PaymentIntentResponse, PaymentMethod, PaymentStatus, Program, ProgramListResponse, ReservationResponse, ReservationStatus, Room, RoomStatus, Session, SessionListResponse, SessionStatus, SuccessResponse, UpdateUserRequest, User, UserListResponse, UserRole, Venue } from './schemas';

// 클라이언트 설정 인터페이스
export interface ApiClientOptions {
  baseUrl?: string;
  getToken?: (() => Promise<string | null>) | string | null;
  timeout?: number;
  retries?: number;
}

// 사용자 정의 API 에러 클래스
export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly code?: string,
    public readonly data?: unknown,
  ) {
    super(message);
    this.name = 'ApiError';
  }
  static fromErrorResponse(response: ErrorResponse, status: number): ApiError {
    return new ApiError(response.error, status, response.code, response.details);
  }
}

// 쿼리 파라미터에서 허용할 프리미티브 타입
type QueryPrimitive = string | number | boolean | null | undefined;

// 요청 옵션 인터페이스
interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: unknown;
  params?: Record<string, QueryPrimitive> | undefined;
  headers?: Record<string, string>;
}

// 기본 리스트 파라미터 타입 - QueryPrimitive와 완전 호환
type BaseListParams = {
  page?: number | undefined;
  limit?: number | undefined;
  search?: string | undefined;
  sortBy?: string | undefined;
  sortOrder?: 'asc' | 'desc' | undefined;
} & Record<string, QueryPrimitive>;

// 유저 리스트 파라미터 타입
type UserListParams = BaseListParams & {
  role?: UserRole | undefined;
  isActive?: boolean | undefined;
};

// 세션 리스트 파라미터 타입
type SessionListParams = BaseListParams & {
  programId?: string | undefined;
  venueId?: string | undefined;
  status?: SessionStatus | undefined;
  startDate?: string | undefined;
  endDate?: string | undefined;
};

// 예약 리스트 파라미터 타입
type ReservationListParams = BaseListParams & {
  roomId?: string | undefined;
  userId?: string | undefined;
  status?: ReservationStatus | undefined;
  startDate?: string | undefined;
  endDate?: string | undefined;
};

// 결제 리스트 파라미터 타입
type PaymentListParams = BaseListParams & {
  userId?: string | undefined;
  status?: PaymentStatus | undefined;
  method?: PaymentMethod | undefined;
  minAmount?: number | undefined;
  maxAmount?: number | undefined;
};

// API 클라이언트
export class ApiClient {
  private readonly baseUrl: string;
  private readonly getToken: string | (() => Promise<string | null>) | null | undefined;
  private readonly timeout: number;
  private readonly retries: number;
  constructor(options: ApiClientOptions = {}) {
    this.baseUrl = options.baseUrl || '/api';
    this.getToken = options.getToken;
    this.timeout = options.timeout || 30_000;
    this.retries = options.retries ?? 3;
  }
  // 재시도 로직이 포함된 핵심 요청 메서드
  private async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    let lastError: Error | null = null;
    // 재시도 로직
    for (let attempt = 0; attempt <= this.retries; attempt++) {
      try {
        return await this.performRequest<T>(endpoint, options);
      } catch (error) {
        lastError = error as Error;
        // 재시도 불가 판단
        if (attempt === this.retries || !this.shouldRetry(error)) {
          throw error;
        }
        // 재시도 전 대기 (exponential backoff)
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
      }
    }
    throw lastError;
  }

  // 재시도 가능 여부 판단 헬퍼
  private shouldRetry(error: unknown): boolean {
    // HTTP 상태 코드 기반 재시도 판단
    if (error instanceof ApiError) {
      const retryableStatusCodes = [408, 429, 500, 502, 503, 504];
      return retryableStatusCodes.includes(error.status);
    }
    // 네트워크 에러나 타임아웃은 재시도 가능
    if (error instanceof Error) {
      return error.name === 'AbortError' || error.message.includes('fetch');
    }
    return false;
  }

  // 실제 요청 수행 메서드
  private async performRequest<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const { method = 'GET', body, params, headers: customHeaders } = options;
    // 쿼리스트링 생성 (undefined/null 무시, 프리미티브만 허용)
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

    // Authorization 대괄호 표기
    if (this.getToken) {
      const token = typeof this.getToken === 'function' ? await this.getToken() : this.getToken;
      if (token) headers['Authorization'] = `Bearer ${token}`;
    }
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);
    // 요청 수행
    try {
      const response = await fetch(url, {
        method,
        headers,
        // body 프로퍼티 자체를 조건부로 추가 (BodyInit | null 규칙)
        ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      // 에러 응답 처리
      if (!response.ok) {
        await this.handleErrorResponse(response);
      }
      // 성공 응답 처리
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

  // 에러 응답 처리 헬퍼
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
    // 에러 응답 구조 파악
    if (errorData && typeof errorData === 'object' && 'error' in errorData) {
      throw ApiError.fromErrorResponse(errorData as ErrorResponse, response.status);
    }
    const message =
      typeof errorData === 'string' ? errorData : `HTTP ${response.status}: ${response.statusText}`;
    throw new ApiError(message, response.status, undefined, errorData);
  }

  // 성공 응답 처리 헬퍼
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

  // 인증 API 엔드포인트
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

  // 사용자 API 엔드포인트
  users = {
    list: (params?: UserListParams) =>
      this.request<UserListResponse>('/users', params ? { params } : {}),
    create: (data: UpdateUserRequest) =>
      this.request<User>('/users', { method: 'POST', body: data }),
    get: (id: string) => this.request<User>(`/users/${id}`),
    update: (id: string, data: UpdateUserRequest) =>
      this.request<User>(`/users/${id}`, { method: 'PUT', body: data }),
    delete: (id: string) => this.request<void>(`/users/${id}`, { method: 'DELETE' }),
    updateRole: (id: string, role: UserRole) =>
      this.request<User>(`/users/${id}/role`, { method: 'PATCH', body: { role } }),
  };

  // 지점/방 API 엔드포인트
  venues = {
    list: (params?: BaseListParams) =>
      this.request<ListResponse<Venue>>('/venues', params ? { params } : {}),
    create: (data: CreateVenueRequest) =>
      this.request<Venue>('/venues', { method: 'POST', body: data }),
    get: (id: string) => this.request<Venue>(`/venues/${id}`),
    update: (id: string, data: Partial<CreateVenueRequest>) =>
      this.request<Venue>(`/venues/${id}`, { method: 'PUT', body: data }),
    delete: (id: string) => this.request<void>(`/venues/${id}`, { method: 'DELETE' }),
    rooms: {
      list: (venueId: string, params?: BaseListParams) =>
        this.request<ListResponse<Room>>(`/venues/${venueId}/rooms`, params ? { params } : {}),
      create: (venueId: string, data: { name: string; capacity?: number }) =>
        this.request<Room>(`/venues/${venueId}/rooms`, { method: 'POST', body: data }),
      get: (venueId: string, roomId: string) =>
        this.request<Room>(`/venues/${venueId}/rooms/${roomId}`),
      update: (
        venueId: string,
        roomId: string,
        data: { name?: string; capacity?: number; status?: RoomStatus },
      ) => this.request<Room>(`/venues/${venueId}/rooms/${roomId}`, { method: 'PUT', body: data }),
      delete: (venueId: string, roomId: string) =>
        this.request<void>(`/venues/${venueId}/rooms/${roomId}`, { method: 'DELETE' }),
    },
  };

  // 프로그램 API 엔드포인트
  programs = {
    list: (params?: BaseListParams) =>
      this.request<ProgramListResponse>('/programs', params ? { params } : {}),
    create: (data: CreateProgramRequest) =>
      this.request<Program>('/programs', { method: 'POST', body: data }),
    get: (id: string) => this.request<Program>(`/programs/${id}`),
    update: (id: string, data: Partial<CreateProgramRequest>) =>
      this.request<Program>(`/programs/${id}`, { method: 'PUT', body: data }),
    delete: (id: string) => this.request<void>(`/programs/${id}`, { method: 'DELETE' }),
    activate: (id: string) => this.request<Program>(`/programs/${id}/activate`, { method: 'POST' }),
    deactivate: (id: string) =>
      this.request<Program>(`/programs/${id}/deactivate`, { method: 'POST' }),
  };

  // 세션 API 엔드포인트
  sessions = {
    list: (params?: SessionListParams) =>
      this.request<SessionListResponse>('/sessions', params ? { params } : {}),
    create: (data: CreateSessionRequest) =>
      this.request<Session>('/sessions', { method: 'POST', body: data }),
    get: (id: string) => this.request<Session>(`/sessions/${id}`),
    update: (id: string, data: Partial<CreateSessionRequest>) =>
      this.request<Session>(`/sessions/${id}`, { method: 'PUT', body: data }),
    delete: (id: string) => this.request<void>(`/sessions/${id}`, { method: 'DELETE' }),
    confirm: (id: string) => this.request<Session>(`/sessions/${id}/confirm`, { method: 'POST' }),
    cancel: (id: string, reason?: string) =>
      this.request<Session>(`/sessions/${id}/cancel`, { method: 'POST', body: { reason } }),
    complete: (id: string) => this.request<Session>(`/sessions/${id}/complete`, { method: 'POST' }),
    participants: {
      list: (sessionId: string) =>
        this.request<{ participants: any[] }>(`/sessions/${sessionId}/participants`),
      add: (sessionId: string, userId: string) =>
        this.request<any>(`/sessions/${sessionId}/participants`, {
          method: 'POST',
          body: { userId },
        }),
      remove: (sessionId: string, userId: string) =>
        this.request<void>(`/sessions/${sessionId}/participants/${userId}`, { method: 'DELETE' }),
      updateStatus: (sessionId: string, userId: string, status: string) =>
        this.request<any>(`/sessions/${sessionId}/participants/${userId}`, {
          method: 'PATCH',
          body: { status },
        }),
    },
  };

  // 예약 API 엔드포인트
  reservations = {
    list: (params?: ReservationListParams) =>
      this.request<ListResponse<ReservationResponse>>('/reservations', params ? { params } : {}),
    create: (data: CreateReservationRequest) =>
      this.request<ReservationResponse>('/reservations', { method: 'POST', body: data }),
    get: (id: string) => this.request<ReservationResponse>(`/reservations/${id}`),
    update: (id: string, data: Partial<CreateReservationRequest>) =>
      this.request<ReservationResponse>(`/reservations/${id}`, { method: 'PUT', body: data }),
    cancel: (id: string, reason?: string) =>
      this.request<ReservationResponse>(`/reservations/${id}/cancel`, {
        method: 'POST',
        body: { reason },
      }),
    confirm: (id: string) =>
      this.request<ReservationResponse>(`/reservations/${id}/confirm`, { method: 'POST' }),
  };

  // 결제 API 엔드포인트
  payments = {
    list: (params?: PaymentListParams) =>
      this.request<ListResponse<Payment>>('/payments', params ? { params } : {}),
    create: (data: CreatePaymentRequest) =>
      this.request<PaymentIntentResponse>('/payments', { method: 'POST', body: data }),
    get: (id: string) => this.request<Payment>(`/payments/${id}`),
    confirm: (id: string, paymentMethodId: string) =>
      this.request<Payment>(`/payments/${id}/confirm`, {
        method: 'POST',
        body: { paymentMethodId },
      }),
    cancel: (id: string, reason?: string) =>
      this.request<Payment>(`/payments/${id}/cancel`, { method: 'POST', body: { reason } }),
    refund: (id: string, amount?: number, reason?: string) =>
      this.request<Payment>(`/payments/${id}/refund`, { method: 'POST', body: { amount, reason } }),
  };
}

// ApiClient 인스턴스를 생성하는 팩토리 함수
export function createApiClient(options: ApiClientOptions = {}) {
  return new ApiClient(options);
}
// 기본 설정으로 생성된 인스턴스
export const api = createApiClient();

// 에러가 ApiError 타입인지 확인하는 타입 가드
export const isApiError = (e: unknown): e is ApiError => e instanceof ApiError;

// API 에러를 처리하고 ApiError로 재변환하는 헬퍼 함수
export function handleApiError(error: unknown): never {
  if (isApiError(error)) throw error;
  if (error instanceof Error) throw new ApiError(error.message, 0);
  throw new ApiError('Unknown error occurred', 0);
}

// 응답이 ErrorResponse 타입인지 확인하는 타입 가드
export const isErrorResponse = (d: unknown): d is ErrorResponse =>
  typeof d === 'object' && d !== null && 'error' in d && typeof (d as any).error === 'string';

// 응답이 SuccessResponse 타입인지 확인하는 타입 가드
export const isSuccessResponse = (d: unknown): d is SuccessResponse =>
  typeof d === 'object' && d !== null && 'message' in d && typeof (d as any).message === 'string';

// API 헬스 체크 함수
export async function checkApiHealth(client: ApiClient = api): Promise<boolean> {
  try {
    await (client as any).request('/health', { method: 'GET' });
    return true;
  } catch {
    return false;
  }
}
