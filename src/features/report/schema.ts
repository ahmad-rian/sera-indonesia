import { z } from 'zod';

export const REPORT_CATEGORIES = [
  'air',
  'water',
  'waste',
  'deforestation',
  'fire',
  'mining',
  'wildlife',
  'other',
] as const;

export type ReportCategory = (typeof REPORT_CATEGORIES)[number];

export const TITLE_MAX = 120;
export const DESCRIPTION_MIN = 30;
export const DESCRIPTION_MAX = 2000;

/** Error messages are i18n keys resolved by the form. */
export const reportSchema = z.object({
  title: z.string().trim().min(8, 'report.errors.titleShort').max(TITLE_MAX, 'report.errors.titleLong'),
  category: z.enum(REPORT_CATEGORIES, { error: 'report.errors.category' }),
  location: z.string().trim().min(3, 'report.errors.location'),
  date: z
    .string()
    .optional()
    .refine((v) => !v || !Number.isNaN(Date.parse(v)), 'report.errors.date')
    .refine((v) => !v || new Date(v) <= new Date(), 'report.errors.dateFuture'),
  description: z
    .string()
    .trim()
    .min(DESCRIPTION_MIN, 'report.errors.descriptionShort')
    .max(DESCRIPTION_MAX, 'report.errors.descriptionLong'),
  email: z.union([z.literal(''), z.email('report.errors.email')]).optional(),
  /** Honeypot: real users never fill this hidden field. */
  website: z.string().max(0).optional(),
});

export type ReportInput = z.infer<typeof reportSchema>;
export type ReportErrors = Partial<Record<keyof ReportInput, string>>;

export function validateReport(input: unknown): { ok: true; data: ReportInput } | { ok: false; errors: ReportErrors } {
  const parsed = reportSchema.safeParse(input);
  if (parsed.success) return { ok: true, data: parsed.data };
  const errors = parsed.error.issues.reduce<ReportErrors>((acc, issue) => {
    const field = issue.path[0] as keyof ReportInput;
    return acc[field] ? acc : { ...acc, [field]: issue.message };
  }, {});
  return { ok: false, errors };
}
