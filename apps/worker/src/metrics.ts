/**
 * Description : metrics.ts - 📌Prometheus 메트릭 노출
 * Author : Shiwoo Min
 * Date : 2025-09-22
 */
import { collectDefaultMetrics, Gauge, Registry } from 'prom-client';

const register = new Registry();
collectDefaultMetrics({ register });

export const jobFailureGauge = new Gauge({
  name: 'worker_job_failures_total',
  help: 'Total number of failed jobs',
  registers: [register],
});

export async function getMetrics() {
  return await register.metrics();
}
