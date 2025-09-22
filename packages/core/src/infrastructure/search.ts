/**
 * Description : search.ts - 📌 PGVector 기반 간단 검색 어댑터 래퍼와 인덱싱/쿼리 타입 정의
 * Author : Shiwoo Min
 * Date : 2025-09-10
 */
// import type { Search } from '@connectwon/core/ports/search';
/**
 * @description 임베딩 인덱싱 문서
 */
export interface IndexDoc {
  /** @description 문서 ID */
  id: string;
  /** @description 원문 콘텐츠 */
  content: string;
  /** @description 임베딩 벡터(예: 1536차원) */
  embedding: number[];
  /** @description 부가 메타데이터(jsonb 저장 권장) */
  metadata?: Record<string, unknown>;
}

/**
 * @description PGVector를 사용하는 간단 래퍼
 */
export class PgvectorSearch /* implements Search */ {
  /**
   * @param {any} pg node-postgres 등 클라이언트
   * @param {string} [table='documents'] 테이블명
   */
  constructor(
    private readonly pg: any,
    private readonly table = 'documents',
  ) {}

  /**
   * @description 문서 인덱싱(Upsert)
   * @param {IndexDoc} doc 인덱싱 문서
   * @returns {Promise<void>}
   */
  async index(doc: IndexDoc): Promise<void> {
    const text = `
      INSERT INTO ${this.table} (id, content, embedding, metadata)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (id) DO UPDATE
      SET content = EXCLUDED.content,
          embedding = EXCLUDED.embedding,
          metadata = EXCLUDED.metadata
    `;
    const values = [
      doc.id,
      doc.content,
      this.toVector(doc.embedding),
      JSON.stringify(doc.metadata ?? {}),
    ];
    await this.pg.query(text, values);
  }

  /**
   * @description 코사인/내적 기반 유사도 검색 (pgvector <-> 연산자)
   * @param {number[]} queryEmbedding 쿼리 임베딩
   * @param {number} [limit=10] 결과 제한
   * @param {string} [filterJsonPath] jsonb 경로 필터(선택, 구현체 의존)
   * @returns {Promise<Array<{ id: string; content: string; score: number; metadata: any }>>}
   */
  async query(
    queryEmbedding: number[],
    limit = 10,
    filterJsonPath?: string,
  ): Promise<Array<{ id: string; content: string; score: number; metadata: any }>> {
    const base = `
      SELECT id, content, 1 - (embedding <=> $1) as score, metadata
      FROM ${this.table}
      ${filterJsonPath ? `WHERE metadata @@ $2` : ''}
      ORDER BY embedding <-> $1
      LIMIT $${filterJsonPath ? 3 : 2}
    `;
    const values = filterJsonPath
      ? [this.toVector(queryEmbedding), filterJsonPath, limit]
      : [this.toVector(queryEmbedding), limit];
    const res = await this.pg.query(base, values);
    return res.rows.map((r: any) => ({
      id: r.id,
      content: r.content,
      score: Number(r.score),
      metadata: r.metadata,
    }));
  }

  /**
   * @description 간단 헬스체크
   * @returns {Promise<boolean>} 성공 여부
   */
  async health(): Promise<boolean> {
    try {
      await this.pg.query('SELECT 1');
      return true;
    } catch {
      return false;
    }
  }

  /**
   * @description float[]를 pgvector 리터럴로 변환
   * @param {number[]} vec 벡터
   * @returns {string} 예: "[1,0.5,0]"
   * @private
   */
  private toVector(vec: number[]): string {
    // node-postgres에서 pgvector 타입 등록 유무에 따라 문자열/배열 처리 선택
    return `[${vec.join(',')}]`;
  }
}
