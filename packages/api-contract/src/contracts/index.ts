/**
 * Description : index.ts - 📌 Contracts 관련 타입정의
 * Author : Shiwoo Min
 * Date : 2025-09-11
 */
export * from './auth.js';
export * from './users.js';
export * from './programs.js';
export * from './sessions.js';
export * from './venues.js';
export * from './reservation.js';
export * from './participants.js';
export * from './ai.js';
export * from './payments.js';

// Common types and utilities
export interface ApiError {
  error: string;
  message: string;
  status_code: number;
  details?: Record<string, any>;
  timestamp: string;
}

export interface ApiResponse<T = any> {
  data?: T;
  message?: string;
  error?: string;
  timestamp: string;
}

export interface PaginationQuery {
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface PaginatedResponse<T = any> {
  data: T[];
  pagination: PaginationMeta;
  message?: string;
}

// Health check and system status
export interface HealthCheckResponse {
  status: 'ok' | 'error';
  timestamp: string;
  version: string;
  database: {
    status: 'connected' | 'disconnected';
    latency_ms?: number;
  };
  services: Record<
    string,
    {
      status: 'ok' | 'error';
      latency_ms?: number;
    }
  >;
}

// Batch operations
export interface BatchRequest<T = any> {
  items: T[];
  options?: {
    continue_on_error?: boolean;
    return_results?: boolean;
  };
}

export interface BatchResponse<T = any> {
  success_count: number;
  error_count: number;
  results?: T[];
  errors?: {
    index: number;
    error: string;
    item?: any;
  }[];
}

// Search and filtering
export interface SearchQuery {
  q?: string;
  filters?: Record<string, any>;
  facets?: string[];
  highlight?: boolean;
}

export interface SearchResponse<T = any> {
  data: T[];
  total: number;
  facets?: Record<
    string,
    Array<{
      value: string;
      count: number;
    }>
  >;
  query_time_ms: number;
  pagination?: PaginationMeta;
}

// File upload
export interface FileUploadRequest {
  file: File | Buffer;
  filename?: string;
  content_type?: string;
  metadata?: Record<string, any>;
}

export interface FileUploadResponse {
  file_id: string;
  filename: string;
  size: number;
  content_type: string;
  url?: string;
  metadata?: Record<string, any>;
  created_at: string;
}

// Webhook contracts
export interface WebhookEvent {
  id: string;
  type: string;
  data: Record<string, any>;
  created_at: string;
  source: string;
}

export interface WebhookSubscription {
  id: string;
  url: string;
  events: string[];
  active: boolean;
  secret?: string;
  created_at: string;
  updated_at: string;
}

// Export validation schemas (if using a validation library like Zod)
export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 100;
export const DEFAULT_SORT_ORDER = 'desc';

export const COMMON_DATE_FORMATS = {
  ISO: 'YYYY-MM-DDTHH:mm:ss.sssZ',
  DATE_ONLY: 'YYYY-MM-DD',
  TIME_ONLY: 'HH:mm:ss',
  DATETIME_LOCAL: 'YYYY-MM-DDTHH:mm:ss',
} as const;
