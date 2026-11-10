import { useState, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { REPORT_CATEGORIES, validateReport, type ReportErrors } from '../../features/report/schema';
import { submitReport } from '../../features/report/submitReport';
import { Field } from './Field';
import { inputClass } from './inputClass';

type Status = { kind: 'idle' } | { kind: 'sending' } | { kind: 'sent'; mailto?: string } | { kind: 'error'; message: string };

export function ReportForm() {
  const { t } = useTranslation();
  const [errors, setErrors] = useState<ReportErrors>({});
  const [status, setStatus] = useState<Status>({ kind: 'idle' });

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const result = validateReport(Object.fromEntries(new FormData(form)));
    if (!result.ok) {
      setErrors(result.errors);
      const first = Object.keys(result.errors)[0];
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setErrors({});
    setStatus({ kind: 'sending' });
    try {
      const sent = await submitReport(result.data);
      if (sent.channel === 'mailto') window.location.href = sent.href;
      setStatus({ kind: 'sent', mailto: sent.channel === 'mailto' ? sent.href : undefined });
      form.reset();
    } catch (err) {
      console.error('[report] submit failed', err);
      const key = err instanceof Error && err.message.startsWith('report.') ? err.message : 'report.errors.server';
      setStatus({ kind: 'error', message: t(key) });
    }
  }

  if (status.kind === 'sent') {
    return (
      <div role="status" className="flex flex-col items-start gap-4 rounded-panel bg-surface p-8 sm:p-10">
        <CheckCircle2 aria-hidden className="size-10 text-forest" />
        <h2 className="text-2xl font-semibold">{t('report.sent.title')}</h2>
        <p className="text-muted">{t(status.mailto ? 'report.sent.mailto' : 'report.sent.body')}</p>
        {status.mailto && (
          <a href={status.mailto} className="font-semibold text-forest underline underline-offset-4">
            {t('report.sent.openMail')}
          </a>
        )}
        <Button variant="sage" onClick={() => setStatus({ kind: 'idle' })}>
          {t('report.sent.again')}
        </Button>
      </div>
    );
  }

  const err = (field: keyof ReportErrors) => (errors[field] ? t(errors[field]) : undefined);

  return (
    <form noValidate onSubmit={onSubmit} className="flex flex-col gap-5 rounded-panel bg-surface p-6 sm:p-10" aria-describedby="report-required">
      <p id="report-required" className="text-xs text-muted">
        {t('report.required')}
      </p>
      <Field name="title" label={t('report.fields.title')} required error={err('title')}>
        {(p) => <input {...p} type="text" maxLength={120} placeholder={t('report.placeholders.title')} className={inputClass(!!p['aria-invalid'])} />}
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field name="category" label={t('report.fields.category')} required error={err('category')}>
          {(p) => (
            <select {...p} defaultValue="" className={inputClass(!!p['aria-invalid'])}>
              <option value="" disabled>
                {t('report.placeholders.category')}
              </option>
              {REPORT_CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {t(`report.categories.${c}`)}
                </option>
              ))}
            </select>
          )}
        </Field>
        <Field name="date" label={t('report.fields.date')} error={err('date')}>
          {(p) => <input {...p} type="date" max={new Date().toISOString().slice(0, 10)} className={inputClass(!!p['aria-invalid'])} />}
        </Field>
      </div>

      <Field name="location" label={t('report.fields.location')} required error={err('location')}>
        {(p) => <input {...p} type="text" placeholder={t('report.placeholders.location')} className={inputClass(!!p['aria-invalid'])} />}
      </Field>

      <Field name="description" label={t('report.fields.description')} required error={err('description')}>
        {(p) => <textarea {...p} rows={6} maxLength={2000} placeholder={t('report.placeholders.description')} className={inputClass(!!p['aria-invalid'], 'h-auto py-3')} />}
      </Field>

      <Field name="email" label={t('report.fields.email')} hint={t('report.hints.email')} error={err('email')}>
        {(p) => <input {...p} type="email" autoComplete="email" className={inputClass(!!p['aria-invalid'])} />}
      </Field>

      {/* Honeypot */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />

      {status.kind === 'error' && (
        <p role="alert" className="rounded-card bg-danger/10 p-4 text-sm font-medium text-danger">
          {status.message}
        </p>
      )}

      <Button type="submit" size="lg" className="self-start" disabled={status.kind === 'sending'} arrow>
        {t(status.kind === 'sending' ? 'report.sending' : 'report.submit')}
      </Button>
    </form>
  );
}
