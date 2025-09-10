/**
 * Description : search.ts - 📌 검색 어댑터(PGVector 래퍼)
 * Author      : Shiwoo Min
 * Date        : 2025-09-10
 *
 * - node-postgres Pool/Client 같은 SQL 클라이언트를 주입
 * - 테이블/컬럼 이름은 프로젝트 실스키마에 맞게 바꿔 사용
 */

// import type { Search } from '@connectwon/core/ports/search';

export interface IndexDoc {
  id: string;
  content: string;
  embedding: number[]; // pgvector: vector(1536) 등
  metadata?: Record<string, unknown>;
}

export class PgvectorSearch /* implements Search */ {
  constructor(
    private readonly pg: any,
    private readonly table = 'documents',
  ) {}

  /** 인덱싱(Upsert) */
  async index(doc: IndexDoc): Promise<void> {
    // 메타데이터는 jsonb로 저장
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
   * 유사도 검색
   * @param queryEmbedding 질의 벡터
   * @param limit          반환 개수
   * @param filterJsonPath metadata 필터 (jsonpath 문자열, 선택)
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

  /** 간단 헬스체크 */
  async health(): Promise<boolean> {
    try {
      await this.pg.query('SELECT 1');
      return true;
    } catch {
      return false;
    }
  }

  /** float[] → pgvector 캐스팅 헬퍼 */
  private toVector(vec: number[]): any {
    // node-postgres는 pgvector 확장 타입 등록 시 배열을 그대로 넘겨도 되고,
    // 문자열 캐스팅이 필요한 경우가 있어 프로젝트 설정에 맞춰 조정
    // 여기서는 안전하게 문자열 표기 사용: '[1,2,3]'
    return `[${vec.join(',')}]`;
  }
}
