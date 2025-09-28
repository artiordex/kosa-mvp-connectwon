/**
 * Description : search.adapter.ts - 📌 PgVector 기반 검색 서비스 구현체
 * Author : Shiwoo Min
 * Date : 2025-09-27
 */
import type { SearchDocument, SearchDocumentType, SearchFilters, SearchOptions, SearchResult, SearchService } from '@connectwon/core/ports/search.port.js';

// PGVECTOR SEARCH IMPLEMENTATION
export class PgVectorSearchService implements SearchService {
  constructor(
    private readonly db: any, // PostgreSQL client
    private readonly tableName = 'search_documents',
  ) {}

  async searchPrograms(query: string, options?: SearchOptions): Promise<SearchResult[]> {
    return this.searchByType('program', query, options);
  }

  async searchVenues(query: string, options?: SearchOptions): Promise<SearchResult[]> {
    return this.searchByType('venue', query, options);
  }

  async searchSessions(query: string, options?: SearchOptions): Promise<SearchResult[]> {
    return this.searchByType('session', query, options);
  }

  async searchUsers(query: string, options?: SearchOptions): Promise<SearchResult[]> {
    return this.searchByType('user', query, options);
  }

  async searchAll(query: string, options?: SearchOptions): Promise<SearchResult[]> {
    const limit = options?.limit || 20;
    const offset = options?.offset || 0;

    let sql = `
      SELECT
        id, type, title, content, created_at, metadata,
        ts_rank(to_tsvector('english', title || ' ' || content), plainto_tsquery('english', $1)) as score
      FROM ${this.tableName}
      WHERE to_tsvector('english', title || ' ' || content) @@ plainto_tsquery('english', $1)
    `;

    const params: any[] = [query];
    let paramCount = 1;

    // 필터 적용
    if (options?.filters) {
      const { whereClause, filterParams } = this.buildWhereClause(options.filters, paramCount);
      if (whereClause) {
        sql += ` AND ${whereClause}`;
        params.push(...filterParams);
        paramCount += filterParams.length;
      }
    }

    // 정렬
    sql += this.buildOrderClause(options?.sortBy, options?.sortOrder);

    // 페이징
    sql += ` LIMIT $${paramCount + 1} OFFSET $${paramCount + 2}`;
    params.push(limit, offset);

    const result = await this.db.query(sql, params);
    return this.mapToSearchResults(result.rows);
  }

  async findSimilarPrograms(programId: string, limit = 10): Promise<SearchResult[]> {
    return this.findSimilarByType('program', programId, limit);
  }

  async findSimilarVenues(venueId: string, limit = 10): Promise<SearchResult[]> {
    return this.findSimilarByType('venue', venueId, limit);
  }

  async indexDocument(doc: SearchDocument): Promise<void> {
    const sql = `
      INSERT INTO ${this.tableName}
      (id, type, title, content, category, tags, created_by, created_at, metadata, embedding)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      ON CONFLICT (id) DO UPDATE SET
        type = EXCLUDED.type,
        title = EXCLUDED.title,
        content = EXCLUDED.content,
        category = EXCLUDED.category,
        tags = EXCLUDED.tags,
        created_by = EXCLUDED.created_by,
        metadata = EXCLUDED.metadata,
        embedding = EXCLUDED.embedding,
        updated_at = NOW()
    `;

    const params = [
      doc.id,
      doc.type,
      doc.title,
      doc.content,
      doc.category,
      doc.tags || [],
      doc.createdBy,
      doc.createdAt,
      JSON.stringify(doc.metadata || {}),
      doc.embedding ? this.vectorToString(doc.embedding) : null,
    ];

    await this.db.query(sql, params);
  }

  async updateDocument(id: string, doc: Partial<SearchDocument>): Promise<void> {
    const updateFields: string[] = [];
    const params: any[] = [];
    let paramCount = 0;

    if (doc.title !== undefined) {
      updateFields.push(`title = $${++paramCount}`);
      params.push(doc.title);
    }
    if (doc.content !== undefined) {
      updateFields.push(`content = $${++paramCount}`);
      params.push(doc.content);
    }
    if (doc.category !== undefined) {
      updateFields.push(`category = $${++paramCount}`);
      params.push(doc.category);
    }
    if (doc.tags !== undefined) {
      updateFields.push(`tags = $${++paramCount}`);
      params.push(doc.tags);
    }
    if (doc.metadata !== undefined) {
      updateFields.push(`metadata = $${++paramCount}`);
      params.push(JSON.stringify(doc.metadata));
    }
    if (doc.embedding !== undefined) {
      updateFields.push(`embedding = $${++paramCount}`);
      params.push(doc.embedding ? this.vectorToString(doc.embedding) : null);
    }

    if (updateFields.length === 0) return;

    updateFields.push('updated_at = NOW()');

    const sql = `
      UPDATE ${this.tableName}
      SET ${updateFields.join(', ')}
      WHERE id = $${++paramCount}
    `;
    params.push(id);

    await this.db.query(sql, params);
  }

  async removeDocument(id: string): Promise<void> {
    const sql = `DELETE FROM ${this.tableName} WHERE id = $1`;
    await this.db.query(sql, [id]);
  }

  async health(): Promise<boolean> {
    try {
      await this.db.query('SELECT 1');
      return true;
    } catch {
      return false;
    }
  }

  // =============================================================================
  // 🔧 PRIVATE HELPER METHODS
  // =============================================================================

  private async searchByType(type: SearchDocumentType, query: string, options?: SearchOptions): Promise<SearchResult[]> {
    const limit = options?.limit || 20;
    const offset = options?.offset || 0;

    let sql = `
      SELECT
        id, type, title, content, created_at, metadata,
        ts_rank(to_tsvector('english', title || ' ' || content), plainto_tsquery('english', $1)) as score
      FROM ${this.tableName}
      WHERE type = $2
        AND to_tsvector('english', title || ' ' || content) @@ plainto_tsquery('english', $1)
    `;

    const params: any[] = [query, type];
    let paramCount = 2;

    // 필터 적용
    if (options?.filters) {
      const { whereClause, filterParams } = this.buildWhereClause(options.filters, paramCount);
      if (whereClause) {
        sql += ` AND ${whereClause}`;
        params.push(...filterParams);
        paramCount += filterParams.length;
      }
    }

    // 정렬
    sql += this.buildOrderClause(options?.sortBy, options?.sortOrder);

    // 페이징
    sql += ` LIMIT $${paramCount + 1} OFFSET $${paramCount + 2}`;
    params.push(limit, offset);

    const result = await this.db.query(sql, params);
    return this.mapToSearchResults(result.rows);
  }

  private async findSimilarByType(type: SearchDocumentType, targetId: string, limit: number): Promise<SearchResult[]> {
    if (!targetId) return [];

    const sql = `
      SELECT
        s.id, s.type, s.title, s.content, s.created_at, s.metadata,
        1 - (s.embedding <=> target.embedding) as score
      FROM ${this.tableName} s
      CROSS JOIN (
        SELECT embedding
        FROM ${this.tableName}
        WHERE id = $1 AND embedding IS NOT NULL
      ) target
      WHERE s.type = $2
        AND s.id != $1
        AND s.embedding IS NOT NULL
      ORDER BY s.embedding <-> target.embedding
      LIMIT $3
    `;

    const result = await this.db.query(sql, [targetId, type, limit]);
    return this.mapToSearchResults(result.rows);
  }

  private buildWhereClause(
    filters: SearchFilters,
    startParamCount: number,
  ): {
    whereClause: string;
    filterParams: any[];
  } {
    const conditions: string[] = [];
    const params: any[] = [];
    let paramCount = startParamCount;

    if (filters.category?.length) {
      conditions.push(`category = ANY($${++paramCount})`);
      params.push(filters.category);
    }

    if (filters.tags?.length) {
      conditions.push(`tags && $${++paramCount}`);
      params.push(filters.tags);
    }

    if (filters.createdBy?.length) {
      conditions.push(`created_by = ANY($${++paramCount})`);
      params.push(filters.createdBy);
    }

    if (filters.dateRange) {
      conditions.push(`created_at >= $${++paramCount} AND created_at <= $${++paramCount}`);
      params.push(filters.dateRange.start, filters.dateRange.end);
    }

    return {
      whereClause: conditions.join(' AND '),
      filterParams: params,
    };
  }

  private buildOrderClause(sortBy?: string, sortOrder = 'desc'): string {
    const order = sortOrder.toUpperCase();

    switch (sortBy) {
      case 'date':
        return ` ORDER BY created_at ${order}`;
      case 'popularity':
        return ` ORDER BY metadata->>'view_count' ${order}, score DESC`;
      case 'relevance':
      default:
        return ` ORDER BY score DESC, created_at ${order}`;
    }
  }

  private mapToSearchResults(rows: any[]): SearchResult[] {
    return rows.map(row => ({
      id: row.id,
      type: row.type,
      title: row.title,
      content: row.content.substring(0, 200) + (row.content.length > 200 ? '...' : ''),
      score: Number(row.score || 0),
      metadata: row.metadata || {},
    }));
  }

  private vectorToString(vector: number[]): string {
    return `[${vector.join(',')}]`;
  }
}
