/**
 * Description: client.ts - 📌 Zod 스키마 기반 타입 안전한 API 클라이언트
 * Author: Shiwoo Min
 * Date: 2025-09-24
 */

import {
  BaseResponse,
  ChangePasswordRequest,
  ConfirmResetPasswordRequest,
  CreateParticipantRequest,
  CreatePaymentRequest,
  CreateProgramRequest,
  CreateUserRequest,
  CreateVenueRequest,
  ErrorResponse,
  LoginRequest,
  LoginResponse,
  PaginationInfo,
  ParticipantListQuery,
  ParticipantsListResponse,
  Payment,
  PaymentListQuery,
  PaymentsListResponse,
  ProcessPaymentRequest,
  ProcessPaymentResponse,
  Program,
  ProgramListQuery,
  ProgramParticipant,
  ProgramsListResponse,
  RefreshTokenRequest,
  RefundPaymentRequest,
  RefundPaymentResponse,
  ResetPasswordRequest,
  SearchQuery,
  UpdateParticipantRequest,
  UpdatePaymentRequest,
  UpdateProgramRequest,
  UpdateUserRequest,
  UpdateVenueRequest,
  User,
  Venue,
  VenueListResponse,
  VenueStatsResponse,
} from './index.js';

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
  public readonly code: string | undefined;
  public readonly data: unknown;

  constructor(message: string, status: number, code?: string, data?: unknown) {
    super(message);
    this.status = status;
    this.code = code;
    this.data = data;
    this.name = 'ApiError';
  }

  static fromErrorResponse(response: ErrorResponse, status: number): ApiError {
    return new ApiError(response.message, status, response.code, response.details);
  }
}

/**
 * @description 쿼리 파라미터 기본 타입
 */
type QueryPrimitive = string | number | boolean | null | undefined;

/**
 * @description 개별 요청 옵션
 */
interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: unknown;
  params?: Record<string, QueryPrimitive>;
  headers?: Record<string, string>;
}

/**
 * @description 타입 안전하고 재시도 기능을 포함한 API 클라이언트
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
   */
  private async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    let lastError: Error | null = null;

    for (let attempt = 0; attempt <= this.retries; attempt++) {
      try {
        return await this.performRequest<T>(endpoint, options);
      } catch (error) {
        lastError = error as Error;
        if (attempt === this.retries || !this.shouldRetry(error)) {
          throw error;
        }
        // 지수적 백오프 대기
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
      }
    }

    throw lastError;
  }

  /**
   * @description 재시도 가능 여부 판단
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
   */
  private async performRequest<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const { method = 'GET', body, params, headers: customHeaders } = options;

    // URL 생성
    let url = `${this.baseUrl}${endpoint}`;
    if (params) {
      const searchParams = new URLSearchParams();
      for (const [key, value] of Object.entries(params)) {
        if (value !== undefined && value !== null) {
          searchParams.set(key, String(value));
        }
      }
      const queryString = searchParams.toString();
      if (queryString) url += `?${queryString}`;
    }

    // 헤더 설정
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...customHeaders,
    };

    // 토큰 인증
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
   * @description 에러 응답 처리
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
   * @description 성공 응답 처리
   */
  private async handleSuccessResponse<T>(response: Response): Promise<T> {
    if (response.status === 204) return undefined as T;

    try {
      const data: unknown = await response.json();
      if (data && typeof data === 'object' && 'data' in data) {
        return (data as { data: T }).data;
      }
      return data as T;
    } catch {
      return (await response.text()) as unknown as T;
    }
  }

  /**
   * @description 인증 API 엔드포인트
   */
  auth = {
    login: (request: LoginRequest) =>
      this.request<LoginResponse>('/auth/login', {
        method: 'POST',
        body: request,
      }),

    logout: () => this.request<BaseResponse>('/auth/logout', { method: 'POST' }),

    me: () => this.request<User>('/auth/me'),

    refresh: (request: RefreshTokenRequest) =>
      this.request<LoginResponse>('/auth/refresh', {
        method: 'POST',
        body: request,
      }),

    changePassword: (request: ChangePasswordRequest) =>
      this.request<BaseResponse>('/auth/change-password', {
        method: 'POST',
        body: request,
      }),

    resetPassword: (request: ResetPasswordRequest) =>
      this.request<BaseResponse>('/auth/reset-password', {
        method: 'POST',
        body: request,
      }),

    confirmResetPassword: (request: ConfirmResetPasswordRequest) =>
      this.request<BaseResponse>('/auth/confirm-reset-password', {
        method: 'POST',
        body: request,
      }),
  };

  /**
   * @description 사용자 API 엔드포인트
   */
  users = {
    list: (params?: Partial<SearchQuery>) => this.request<{ data: User[]; pagination: PaginationInfo }>('/users', params ? { params } : {}),
    create: (data: CreateUserRequest) => this.request<User>('/users', { method: 'POST', body: data }),
    get: (id: string) => this.request<User>(`/users/${id}`),
    update: (id: string, data: UpdateUserRequest) => this.request<User>(`/users/${id}`, { method: 'PUT', body: data }),
    delete: (id: string) => this.request<BaseResponse>(`/users/${id}`, { method: 'DELETE' }),
  };

  /**
   * @description 프로그램 API 엔드포인트
   */
  programs = {
    list: (params?: Partial<ProgramListQuery>) => this.request<ProgramsListResponse>('/programs', params ? { params } : {}),
    create: (data: CreateProgramRequest) => this.request<Program>('/programs', { method: 'POST', body: data }),
    get: (id: string) => this.request<Program>(`/programs/${id}`),
    update: (id: string, data: UpdateProgramRequest) => this.request<Program>(`/programs/${id}`, { method: 'PUT', body: data }),
    delete: (id: string) => this.request<BaseResponse>(`/programs/${id}`, { method: 'DELETE' }),
    activate: (id: string) => this.request<Program>(`/programs/${id}/activate`, { method: 'POST' }),
    deactivate: (id: string) => this.request<Program>(`/programs/${id}/deactivate`, { method: 'POST' }),
  };

  /**
   * @description 참가자 API 엔드포인트
   */
  participants = {
    list: (params?: Partial<ParticipantListQuery>) => this.request<ParticipantsListResponse>('/participants', params ? { params } : {}),
    create: (data: CreateParticipantRequest) => this.request<ProgramParticipant>('/participants', { method: 'POST', body: data }),
    get: (id: string) => this.request<ProgramParticipant>(`/participants/${id}`),
    update: (id: string, data: UpdateParticipantRequest) => this.request<ProgramParticipant>(`/participants/${id}`, { method: 'PUT', body: data }),
    delete: (id: string) => this.request<BaseResponse>(`/participants/${id}`, { method: 'DELETE' }),
  };

  /**
   * @description 장소 API 엔드포인트
   */
  venues = {
    list: (params?: { page?: number; limit?: number }) => this.request<VenueListResponse>('/venues', params ? { params } : {}),
    create: (data: CreateVenueRequest) => this.request<Venue>('/venues', { method: 'POST', body: data }),
    get: (id: string) => this.request<Venue>(`/venues/${id}`),
    update: (id: string, data: UpdateVenueRequest) => this.request<Venue>(`/venues/${id}`, { method: 'PATCH', body: data }),
    delete: (id: string) => this.request<BaseResponse>(`/venues/${id}`, { method: 'DELETE' }),
    getStats: (id: string) => this.request<VenueStatsResponse>(`/venues/${id}/stats`),
  };

  /**
   * @description 결제 API 엔드포인트
   */
  payments = {
    list: (params?: Partial<PaymentListQuery>) => this.request<PaymentsListResponse>('/payments', params ? { params } : {}),
    create: (data: CreatePaymentRequest) => this.request<Payment>('/payments', { method: 'POST', body: data }),
    get: (id: string) => this.request<Payment>(`/payments/${id}`),
    update: (id: string, data: UpdatePaymentRequest) => this.request<Payment>(`/payments/${id}`, { method: 'PUT', body: data }),
    process: (data: ProcessPaymentRequest) => this.request<ProcessPaymentResponse>('/payments/process', { method: 'POST', body: data }),
    refund: (data: RefundPaymentRequest) => this.request<RefundPaymentResponse>('/payments/refund', { method: 'POST', body: data }),
    cancel: (id: string, reason?: string) =>
      this.request<Payment>(`/payments/${id}/cancel`, {
        method: 'POST',
        body: { reason },
      }),
  };

  /**
   * @description 헬스 체크 엔드포인트
   */
  health = () => this.request<{ status: string; timestamp: string }>('/health');
}

/**
 * @description ApiClient 팩토리 함수
 */
export function createApiClient(options: ApiClientOptions = {}) {
  return new ApiClient(options);
}

/**
 * @description 기본 API 클라이언트 인스턴스
 */
export const api = createApiClient();

/**
 * @description 타입 가드 및 헬퍼 함수들
 */
export const isApiError = (e: unknown): e is ApiError => e instanceof ApiError;

export function handleApiError(error: unknown): never {
  if (isApiError(error)) throw error;
  if (error instanceof Error) throw new ApiError(error.message, 0);
  throw new ApiError('Unknown error occurred', 0);
}
export const isErrorResponse = (d: unknown): d is ErrorResponse => typeof d === 'object' && d !== null && 'error' in d;
export const isBaseResponse = (d: unknown): d is BaseResponse => typeof d === 'object' && d !== null && 'message' in d;

/**
 * @description API 헬스 체크
 */
export async function checkApiHealth(client: ApiClient = api): Promise<boolean> {
  try {
    await client.health();
    return true;
  } catch {
    return false;
  }
}
