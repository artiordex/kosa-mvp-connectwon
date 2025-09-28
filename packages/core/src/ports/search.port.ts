/**
 * Description : search.port.ts - 📌 검색 서비스 포트 인터페이스
 * Author : Shiwoo Min
 * Date : 2025-09-27
 */
export interface SearchService {
  // 기본 텍스트 검색
  searchPrograms(query: string, options?: SearchOptions): Promise<SearchResult[]>;
  searchVenues(query: string, options?: SearchOptions): Promise<SearchResult[]>;
  searchSessions(query: string, options?: SearchOptions): Promise<SearchResult[]>;
  searchUsers(query: string, options?: SearchOptions): Promise<SearchResult[]>;

  // 통합 검색
  searchAll(query: string, options?: SearchOptions): Promise<SearchResult[]>;

  // 벡터 기반 유사도 검색 (AI 추천용)
  findSimilarPrograms(programId: string, limit?: number): Promise<SearchResult[]>;
  findSimilarVenues(venueId: string, limit?: number): Promise<SearchResult[]>;

  // 인덱스 관리
  indexDocument(doc: SearchDocument): Promise<void>;
  updateDocument(id: string, doc: Partial<SearchDocument>): Promise<void>;
  removeDocument(id: string): Promise<void>;

  // 연결 테스트
  health(): Promise<boolean>;
}

// SEARCH TYPES
export interface SearchOptions {
  limit?: number;
  offset?: number;
  filters?: SearchFilters;
  sortBy?: 'relevance' | 'date' | 'popularity';
  sortOrder?: 'asc' | 'desc';
}

export interface SearchFilters {
  type?: SearchDocumentType[];
  category?: string[];
  dateRange?: {
    start: string;
    end: string;
  };
  createdBy?: string[];
  tags?: string[];
}

export interface SearchResult {
  id: string;
  type: SearchDocumentType;
  title: string;
  content: string;
  score: number;
  highlights?: string[];
  metadata?: Record<string, unknown>;
}

export interface SearchDocument {
  id: string;
  type: SearchDocumentType;
  title: string;
  content: string;
  category?: string;
  tags?: string[];
  createdBy?: string;
  createdAt: string;
  metadata?: Record<string, unknown>;
  embedding?: number[];
}

export type SearchDocumentType = 'program' | 'session' | 'venue' | 'room' | 'user' | 'review';

export interface SearchFactory {
  createPostgreSQLSearch(): SearchService;
  createElasticsearchService(): SearchService;
  createPgvectorService(): SearchService;
  createFromEnvironment(): SearchService;
}
