/**
 * Description : ResultHandler.ts - 테스트 결과 저장 및 오류 처리 유틸 클래스
 * Author : Shiwoo Min
 * Date : 2025-09-07
 */
import * as fs from 'fs/promises';
import path from 'path';

// 상태 타입
export type TestStatus = 'PASS' | 'FAIL';

// 아티팩트 타입
export type ArtifactKind = 'screenshot' | 'trace' | 'video' | 'custom';

// 아티팩트 데이터
export interface Artifact {
  kind: ArtifactKind;
  name: string;           // 파일명(확장자 포함 권장)
  buffer?: Buffer;        // 메모리 상의 데이터 (있으면 파일로 씀)
  contentType?: string;   // 선택
  path?: string;          // 외부에서 이미 저장한 경로 (buffer 미사용 시)
}

// 로거 인터페이스 (선택 주입)
export interface LoggerLike {
  info: (msg: any, ...rest: any[]) => void;
  warn: (msg: any, ...rest: any[]) => void;
  error: (msg: any, ...rest: any[]) => void;
  debug?: (msg: any, ...rest: any[]) => void;
}

// 어댑터 인터페이스
export interface TestAdapter<C = unknown> {
  name: string;                           // 어댑터 이름 (예: 'playwright')
  isAvailable: (ctx?: C) => boolean;      // 해당 러너 컨텍스트가 준비됐는지
  captureOnFail?: (ctx: C) => Promise<Artifact[] | void>; // 실패 시 일괄 캡처
  captureScreenshot?: (ctx: C) => Promise<Artifact | void>;
  captureTrace?: (ctx: C) => Promise<Artifact | void>;
  captureVideo?: (ctx: C) => Promise<Artifact | void>;
}

// 옵션
export interface ResultHandlerOptions<C = unknown> {
  outputDir?: string;           // 기본: ./e2e-artifacts
  serviceName?: string;         // 기본: 'test'
  saveTraceOnFail?: boolean;    // 기본: true
  logVideoOnFail?: boolean;     // 기본: true (경로 로그만, 보관은 러너 설정 의존)
  logger?: LoggerLike;          // 기본: console
  adapter?: TestAdapter<C>;     // 러너별 어댑터 (선택)
}

// 유틸 함수
function nowTs() {
  return new Date().toISOString().replace(/[:.]/g, '-');
}
async function ensureDir(dir: string) {
  await fs.mkdir(dir, { recursive: true });
}

// 메인 클래스
export class ResultHandler<C = unknown> {
  private readonly root: string;
  private readonly dirResults: string;
  private readonly dirLogs: string;
  private readonly dirScreenshots: string;
  private readonly dirTraces: string;
  private readonly dirVideos: string;
  private readonly logger: LoggerLike;
  private readonly adapter?: TestAdapter<C>;
  private readonly opts: Required<Omit<ResultHandlerOptions<C>, 'logger' | 'adapter' | 'outputDir' | 'serviceName'>>;

  constructor(options?: ResultHandlerOptions<C>) {
    const outputDir = options?.outputDir || process.env.E2E_ARTIFACTS_DIR || path.resolve(process.cwd(), 'e2e-artifacts');
    const serviceName = options?.serviceName || process.env.SERVICE_NAME || 'test';

    this.root = outputDir;
    this.dirResults = path.join(this.root, 'results');
    this.dirLogs = path.join(this.root, 'logs');
    this.dirScreenshots = path.join(this.root, 'screenshots');
    this.dirTraces = path.join(this.root, 'traces');
    this.dirVideos = path.join(this.root, 'videos');

    this.logger = options?.logger || console;
    this.adapter = options?.adapter;

    this.opts = {
      saveTraceOnFail: options?.saveTraceOnFail ?? (process.env.SAVE_TRACE_ON_FAIL !== 'false'),
      logVideoOnFail: options?.logVideoOnFail ?? (process.env.LOG_VIDEO_ON_FAIL !== 'false'),
    };

    this.logger.info?.(`[ResultHandler] initialized for service='${serviceName}', dir='${this.root}'`);
  }

  // 초기 폴더 생성
  public async init(): Promise<void> {
    await Promise.all([
      ensureDir(this.root),
      ensureDir(this.dirResults),
      ensureDir(this.dirLogs),
      ensureDir(this.dirScreenshots),
      ensureDir(this.dirTraces),
      ensureDir(this.dirVideos),
    ]);
  }

  // 테스트 결과 저장
  public async saveTestResult(
    status: TestStatus,
    details?: string,
    ctx?: C
  ): Promise<void> {
    const ts = nowTs();
    const resultPath = path.join(this.dirResults, `test-result-${ts}.json`);
    const logPath = path.join(this.dirLogs, 'run.log');

    const payload = {
      timestamp: new Date().toISOString(),
      status,
      details: details || 'No additional details',
    };

    await fs.writeFile(resultPath, JSON.stringify(payload, null, 2));
    this.logger.info?.(`결과 저장: ${resultPath}`);

    const line = `[${payload.timestamp}] [${status}] ${details || ''}\n`;
    await fs.appendFile(logPath, line);
    this.logger.info?.(`로그 저장: ${logPath}`);

    if (status === 'FAIL') {
      await this.captureFailureArtifacts(ts, ctx);
    }
  }

  // 실패 시 아티팩트 캡처
  private async captureFailureArtifacts(ts: string, ctx?: C): Promise<void> {
    // 어댑터가 있으면 일괄 캡처부터 시도
    if (this.adapter?.isAvailable(ctx)) {
      try {
        const batched = await this.adapter.captureOnFail?.(ctx as C);
        if (batched?.length) {
          await this.persistArtifacts(ts, batched);
        }
      } catch (err) {
        this.logger.warn?.('[ResultHandler] captureOnFail 실패, 개별 캡처로 전환');
      }

      // 스크린샷
      try {
        const scr = await this.adapter.captureScreenshot?.(ctx as C);
        if (scr) await this.persistArtifacts(ts, [scr]);
      } catch (err) {
        this.logger.error?.('[ResultHandler] 스크린샷 캡처 실패', err);
      }

      // 트레이스
      if (this.opts.saveTraceOnFail) {
        try {
          const tr = await this.adapter.captureTrace?.(ctx as C);
          if (tr) await this.persistArtifacts(ts, [tr]);
        } catch {
          this.logger.warn?.('[ResultHandler] 트레이스 저장 생략(활성화 안됨 또는 실패)');
        }
      }

      // 비디오
      if (this.opts.logVideoOnFail) {
        try {
          const vd = await this.adapter.captureVideo?.(ctx as C);
          if (vd) await this.persistArtifacts(ts, [vd]);
          else this.logger.info?.('비디오는 러너 설정에 따라 자동 보관됩니다.');
        } catch {
          this.logger.warn?.('[ResultHandler] 비디오 캡처 스킵');
        }
      }
    } else {
      // 어댑터 없음: 기본 안내만
      this.logger.warn?.('[ResultHandler] 어댑터가 없어 실패 아티팩트 캡처를 생략합니다.');
    }
  }

  // 아티팩트 저장
  private async persistArtifacts(ts: string, artifacts: Artifact[]): Promise<void> {
    for (const art of artifacts) {
      if (art.buffer && !art.path) {
        const outPath = this.resolveArtifactPath(ts, art.kind, art.name);
        await fs.writeFile(outPath, art.buffer);
        this.logger.warn?.(`아티팩트 저장: ${outPath}`);
      } else if (art.path) {
        this.logger.warn?.(`아티팩트 경로 기록: ${art.kind} -> ${art.path}`);
      } else {
        this.logger.warn?.(`아티팩트 무시(데이터 없음): ${art.kind}/${art.name}`);
      }
    }
  }

  // 아티팩트 경로 생성
  private resolveArtifactPath(ts: string, kind: ArtifactKind, name: string): string {
    const base =
      kind === 'screenshot' ? this.dirScreenshots :
      kind === 'trace'      ? this.dirTraces :
      kind === 'video'      ? this.dirVideos : this.dirResults;
    return path.join(base, `${ts}-${name}`);
  }
}

// ==========================
// 어댑터 예시: Playwright
// ==========================
// 컨텍스트 형태: { page?: Page; context?: BrowserContext }
// 사용 중인 프로젝트에서 타입 임포트가 가능하면 타입 선언 추가해도 됨
export interface PlaywrightCtx {
  page?: any;       // Page
  context?: any;    // BrowserContext
}

export const PlaywrightAdapter: TestAdapter<PlaywrightCtx> = {
  name: 'playwright',
  isAvailable: (ctx) => !!ctx && (!!ctx.page || !!ctx.context),

  // 일괄 캡처는 생략 가능
  captureOnFail: async () => undefined,

  captureScreenshot: async (ctx) => {
    if (!ctx.page) return;
    const buffer = await ctx.page.screenshot({ fullPage: true });
    return { kind: 'screenshot', name: 'fail.png', buffer };
  },

  captureTrace: async (ctx) => {
    if (!ctx.context) return;
    try {
      const pathBuf = await ctx.context.tracing?.stopChunk?.({ path: undefined });
      // stopChunk 사용 환경이 아닐 수 있어 stop만 가능한 경우가 많음
    } catch {}
    // Playwright는 보통 config에서 trace: 'on'/'on-first-retry' 설정해 zip 자동생성
    // 여기서는 직접 zip 버퍼를 얻기 어렵기 때문에 경로 기록 형태를 권장
    return { kind: 'trace', name: 'trace.zip', path: '[playwright-managed]' };
  },

  captureVideo: async () => {
    // 비디오는 프로젝트 설정(use.video)에서 자동 저장되는 경우가 일반적
    return { kind: 'video', name: 'video.mp4', path: '[playwright-managed]' };
  },
};

// ==========================
// 어댑터 예시: WebdriverIO
// ==========================
// 컨텍스트 형태: { browser?: WebdriverIO.Browser }
export interface WdioCtx {
  browser?: any;
}

export const WebdriverIOAdapter: TestAdapter<WdioCtx> = {
  name: 'webdriverio',
  isAvailable: (ctx) => !!ctx?.browser,

  captureScreenshot: async (ctx) => {
    const base64 = await ctx.browser.saveScreenshot(); // 일부 WDIO 설정에선 경로 지정해야 함
    const buffer = Buffer.isBuffer(base64) ? base64 : Buffer.from(base64, 'base64');
    return { kind: 'screenshot', name: 'fail.png', buffer };
  },

  captureTrace: async () => undefined, // WDIO에선 별도 플러그인 사용 권장
  captureVideo: async () => undefined,
};
