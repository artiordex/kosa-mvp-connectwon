/**
 * Description : client.ts - 📌 타입 안전한 API 클라이언트
 * Author : Shiwoo Min
 * Date : 2025-09-16
 */
// 기존 스키마에서 타입 임포트
import type {
  CreatePaymentRequest,
  CreateProgramRequest,
  // 예약 관련
  CreateReservationRequest,
  CreateSessionRequest,
  CreateVenueRequest,
  // 공통 타입
  ErrorResponse,
  // API 응답 타입
  ListResponse,
  // 결제 관련
  Payment,
  PaymentIntentResponse,
  PaymentMethod,
  PaymentStatus,
  // 프로그램 관련
  Program,
  ProgramListResponse,
  ReservationResponse,
  ReservationStatus,
  Room,
  RoomStatus,
  // 세션 관련
  Session,
  SessionListResponse,
  SessionStatus,
  SuccessResponse,
  UpdateUserRequest,
  // 사용자 관련
  User,
  UserListResponse,
  UserRole,
  // 지점/방 관련
  Venue,
} from './schemas/index.js';

// 클라이언트 설정
export interface ApiClientOptions {
  baseUrl?: string;
  getToken?: () => Promise<string | null> | string | null;
  timeout?: number;
  retries?: number;
}

// 에러 클래스
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

// 요청 옵션 타입
interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: unknown;
  params?: Record<string, string | number | boolean | undefined>;
  headers?: Record<string, string>;
}

// 필터 타입 정의
interface BaseListParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

interface UserListParams extends BaseListParams {
  role?: UserRole;
  isActive?: boolean;
}

interface SessionListParams extends BaseListParams {
  programId?: string;
  venueId?: string;
  status?: SessionStatus;
  startDate?: string;
  endDate?: string;
}

interface ReservationListParams extends BaseListParams {
  roomId?: string;
  userId?: string;
  status?: ReservationStatus;
  startDate?: string;
  endDate?: string;
}

interface PaymentListParams extends BaseListParams {
  userId?: string;
  status?: PaymentStatus;
  method?: PaymentMethod;
  minAmount?: number;
  maxAmount?: number;
}

// API 클라이언트 클래스
export class ApiClient {
  private readonly baseUrl: string;
  private readonly getToken?: () => Promise<string | null> | string | null;
  private readonly timeout: number;
  private readonly retries: number;

  constructor(options: ApiClientOptions = {}) {
    this.baseUrl = options.baseUrl || '/api';
    this.getToken = options.getToken;
    this.timeout = options.timeout || 30000;
    this.retries = options.retries || 3;
  }

  // 내부 요청 메서드
  private async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const { method = 'GET', body, params, headers: customHeaders } = options;

    // URL 구성
    let url = `${this.baseUrl}${endpoint}`;
    if (params) {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.set(key, String(value));
        }
      });
      if (searchParams.toString()) {
        url += `?${searchParams}`;
      }
    }

    // 헤더 구성
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...customHeaders,
    };

    // 인증 토큰 추가
    if (this.getToken) {
      const token = await this.getToken();
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }
    }

    // AbortController로 타임아웃 처리
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
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

      if (error instanceof ApiError) {
        throw error;
      }

      if (error instanceof Error) {
        throw new ApiError(error.name === 'AbortError' ? 'Request timeout' : error.message, 0);
      }

      throw new ApiError('Unknown error occurred', 0);
    }
  }

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

    // ErrorResponse 형태인지 확인
    if (errorData && typeof errorData === 'object' && 'error' in errorData) {
      const errorResponse = errorData as ErrorResponse;
      throw ApiError.fromErrorResponse(errorResponse, response.status);
    }

    // 일반 에러 처리
    const message =
      typeof errorData === 'string' ? errorData : `HTTP ${response.status}: ${response.statusText}`;

    throw new ApiError(message, response.status, undefined, errorData);
  }

  private async handleSuccessResponse<T>(response: Response): Promise<T> {
    // No Content
    if (response.status === 204) {
      return undefined as T;
    }

    try {
      const data = await response.json();

      // SuccessResponse 형태인지 확인하고 data 추출
      if (data && typeof data === 'object' && 'message' in data && 'data' in data) {
        return data.data;
      }

      return data;
    } catch {
      // JSON 파싱 실패시 텍스트로 반환
      return (await response.text()) as T;
    }
  }

  // ================== 인증 API ==================
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

  // ================== 사용자 API ==================
  users = {
    list: (params?: UserListParams) => this.request<UserListResponse>('/users', { params }),

    create: (data: UpdateUserRequest) =>
      this.request<User>('/users', { method: 'POST', body: data }),

    get: (id: string) => this.request<User>(`/users/${id}`),

    update: (id: string, data: UpdateUserRequest) =>
      this.request<User>(`/users/${id}`, { method: 'PUT', body: data }),

    delete: (id: string) => this.request<void>(`/users/${id}`, { method: 'DELETE' }),

    updateRole: (id: string, role: UserRole) =>
      this.request<User>(`/users/${id}/role`, {
        method: 'PATCH',
        body: { role },
      }),
  };

  // ================== 지점 API ==================
  venues = {
    list: (params?: BaseListParams) => this.request<ListResponse<Venue>>('/venues', { params }),

    create: (data: CreateVenueRequest) =>
      this.request<Venue>('/venues', { method: 'POST', body: data }),

    get: (id: string) => this.request<Venue>(`/venues/${id}`),

    update: (id: string, data: Partial<CreateVenueRequest>) =>
      this.request<Venue>(`/venues/${id}`, { method: 'PUT', body: data }),

    delete: (id: string) => this.request<void>(`/venues/${id}`, { method: 'DELETE' }),

    rooms: {
      list: (venueId: string, params?: BaseListParams) =>
        this.request<ListResponse<Room>>(`/venues/${venueId}/rooms`, { params }),

      create: (venueId: string, data: { name: string; capacity?: number }) =>
        this.request<Room>(`/venues/${venueId}/rooms`, {
          method: 'POST',
          body: data,
        }),

      get: (venueId: string, roomId: string) =>
        this.request<Room>(`/venues/${venueId}/rooms/${roomId}`),

      update: (
        venueId: string,
        roomId: string,
        data: { name?: string; capacity?: number; status?: RoomStatus },
      ) =>
        this.request<Room>(`/venues/${venueId}/rooms/${roomId}`, {
          method: 'PUT',
          body: data,
        }),

      delete: (venueId: string, roomId: string) =>
        this.request<void>(`/venues/${venueId}/rooms/${roomId}`, {
          method: 'DELETE',
        }),
    },
  };

  // ================== 프로그램 API ==================
  programs = {
    list: (params?: BaseListParams) => this.request<ProgramListResponse>('/programs', { params }),

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

  // ================== 세션 API ==================
  sessions = {
    list: (params?: SessionListParams) =>
      this.request<SessionListResponse>('/sessions', { params }),

    create: (data: CreateSessionRequest) =>
      this.request<Session>('/sessions', { method: 'POST', body: data }),

    get: (id: string) => this.request<Session>(`/sessions/${id}`),

    update: (id: string, data: Partial<CreateSessionRequest>) =>
      this.request<Session>(`/sessions/${id}`, { method: 'PUT', body: data }),

    delete: (id: string) => this.request<void>(`/sessions/${id}`, { method: 'DELETE' }),

    // 세션 상태 관리
    confirm: (id: string) => this.request<Session>(`/sessions/${id}/confirm`, { method: 'POST' }),

    cancel: (id: string, reason?: string) =>
      this.request<Session>(`/sessions/${id}/cancel`, {
        method: 'POST',
        body: { reason },
      }),

    complete: (id: string) => this.request<Session>(`/sessions/${id}/complete`, { method: 'POST' }),

    // 참가자 관리
    participants: {
      list: (sessionId: string) =>
        this.request<{ participants: any[] }>(`/sessions/${sessionId}/participants`),

      add: (sessionId: string, userId: string) =>
        this.request<any>(`/sessions/${sessionId}/participants`, {
          method: 'POST',
          body: { userId },
        }),

      remove: (sessionId: string, userId: string) =>
        this.request<void>(`/sessions/${sessionId}/participants/${userId}`, {
          method: 'DELETE',
        }),

      updateStatus: (sessionId: string, userId: string, status: string) =>
        this.request<any>(`/sessions/${sessionId}/participants/${userId}`, {
          method: 'PATCH',
          body: { status },
        }),
    },
  };

  // ================== 예약 API ==================
  reservations = {
    list: (params?: ReservationListParams) =>
      this.request<ListResponse<ReservationResponse>>('/reservations', { params }),

    create: (data: CreateReservationRequest) =>
      this.request<ReservationResponse>('/reservations', {
        method: 'POST',
        body: data,
      }),

    get: (id: string) => this.request<ReservationResponse>(`/reservations/${id}`),

    update: (id: string, data: Partial<CreateReservationRequest>) =>
      this.request<ReservationResponse>(`/reservations/${id}`, {
        method: 'PUT',
        body: data,
      }),

    cancel: (id: string, reason?: string) =>
      this.request<ReservationResponse>(`/reservations/${id}/cancel`, {
        method: 'POST',
        body: { reason },
      }),

    confirm: (id: string) =>
      this.request<ReservationResponse>(`/reservations/${id}/confirm`, {
        method: 'POST',
      }),
  };

  // ================== 결제 API ==================
  payments = {
    list: (params?: PaymentListParams) =>
      this.request<ListResponse<Payment>>('/payments', { params }),

    create: (data: CreatePaymentRequest) =>
      this.request<PaymentIntentResponse>('/payments', {
        method: 'POST',
        body: data,
      }),

    get: (id: string) => this.request<Payment>(`/payments/${id}`),

    confirm: (id: string, paymentMethodId: string) =>
      this.request<Payment>(`/payments/${id}/confirm`, {
        method: 'POST',
        body: { paymentMethodId },
      }),

    cancel: (id: string, reason?: string) =>
      this.request<Payment>(`/payments/${id}/cancel`, {
        method: 'POST',
        body: { reason },
      }),

    refund: (id: string, amount?: number, reason?: string) =>
      this.request<Payment>(`/payments/${id}/refund`, {
        method: 'POST',
        body: { amount, reason },
      }),
  };
}

// ================== 팩토리 함수 및 기본 인스턴스 ==================
export function createApiClient(options: ApiClientOptions = {}) {
  return new ApiClient(options);
}

// 기본 클라이언트 인스턴스
export const api = createApiClient();

// ================== 유틸리티 함수 ==================
export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError;
}

export function handleApiError(error: unknown): never {
  if (isApiError(error)) {
    throw error;
  }

  if (error instanceof Error) {
    throw new ApiError(error.message, 0);
  }

  throw new ApiError('Unknown error occurred', 0);
}

// ================== 타입 가드 ==================
export function isErrorResponse(data: unknown): data is ErrorResponse {
  return (
    typeof data === 'object' &&
    data !== null &&
    'error' in data &&
    typeof (data as any).error === 'string'
  );
}

export function isSuccessResponse(data: unknown): data is SuccessResponse {
  return (
    typeof data === 'object' &&
    data !== null &&
    'message' in data &&
    typeof (data as any).message === 'string'
  );
}

// ================== 네트워크 상태 체크 ==================
export async function checkApiHealth(client: ApiClient = api): Promise<boolean> {
  try {
    await (client as any).request('/health', { method: 'GET' });
    return true;
  } catch {
    return false;
  }
}
