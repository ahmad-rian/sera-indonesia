import { SITE_CONFIG } from '../../lib/constants';
import type { ReportInput } from './schema';

export type SubmitResult = { channel: 'endpoint' } | { channel: 'mailto'; href: string };

const SUBMIT_TIMEOUT_MS = 15_000;

export function buildMailto(report: ReportInput, to: string = SITE_CONFIG.email): string {
  const body = [
    `Kategori / Category: ${report.category}`,
    `Lokasi / Location: ${report.location}`,
    report.date ? `Tanggal / Date: ${report.date}` : null,
    report.email ? `Kontak / Contact: ${report.email}` : null,
    '',
    report.description,
  ]
    .filter((line) => line !== null)
    .join('\n');
  return `mailto:${to}?subject=${encodeURIComponent(`[Laporan SERA] ${report.title}`)}&body=${encodeURIComponent(body)}`;
}

/**
 * Sends the report to VITE_REPORT_ENDPOINT (Formspree-compatible JSON POST) when configured;
 * otherwise returns a prefilled mailto link for the user's mail client.
 */
export async function submitReport(
  report: ReportInput,
  endpoint: string | undefined = import.meta.env.VITE_REPORT_ENDPOINT,
): Promise<SubmitResult> {
  if (report.website) throw new Error('report.errors.spam');
  if (!endpoint) return { channel: 'mailto', href: buildMailto(report) };

  const { website: _honeypot, ...payload } = report;
  void _honeypot;
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'content-type': 'application/json', accept: 'application/json' },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(SUBMIT_TIMEOUT_MS),
  });
  if (!res.ok) throw new Error(`report.errors.server`);
  return { channel: 'endpoint' };
}
