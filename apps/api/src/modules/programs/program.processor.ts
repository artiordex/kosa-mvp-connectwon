/**
 * @description program.processor.ts - 📌 프로그램 관련 비동기 작업 처리 (BullMQ 기반)
 * @author Shiwoo
 * @date 2025-09-26
 */
import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';

@Processor('program-queue')
export class ProgramProcessor extends WorkerHost {
  /**
   * @description 큐의 잡 처리 로직 (Job마다 실행됨)
   */
  async process(job: Job<any>): Promise<any> {
    switch (job.name) {
      case 'update-status':
        return this.handleUpdateStatus(job);

      case 'promote-waitlist':
        return this.handlePromoteWaitlist(job);

      case 'send-notification':
        return this.handleSendNotification(job);

      case 'aggregate-stats':
        return this.handleAggregateStats(job);

      default:
        console.warn(`처리할 수 없는 Job: ${job.name}`);
    }
  }

  private async handleUpdateStatus(job: Job<{ programId: string; newStatus: string }>) {
    // TODO: DB 조회 → 상태 업데이트 → 로그 기록
    console.log('프로그램 상태 업데이트:', job.data);
  }

  private async handlePromoteWaitlist(job: Job<{ programId: string; slots: number }>) {
    // TODO: 대기자 slots 만큼 승급 처리 → 알림 발송
    console.log('대기자 승급 처리:', job.data);
  }

  private async handleSendNotification(job: Job<{ programId: string; message: string }>) {
    // TODO: 참여자 목록 조회 → message 발송
    console.log('참여자 알림 발송:', job.data);
  }

  private async handleAggregateStats(job: Job<{ programId: string; period: 'daily' | 'weekly' | 'monthly' }>) {
    // TODO: 기간별 데이터 집계 → 통계 업데이트
    console.log('프로그램 통계 집계:', job.data);
  }

  /**
   * @description 작업 실패 이벤트 핸들러
   */
  @OnWorkerEvent('failed')
  onFailed(job: Job, err: Error) {
    console.error(`Job 실패: ${job.name}`, err);
  }

  /**
   * @description 작업 완료 이벤트 핸들러
   */
  @OnWorkerEvent('completed')
  onCompleted(job: Job) {
    console.log(`Job 완료: ${job.name}`);
  }
}
