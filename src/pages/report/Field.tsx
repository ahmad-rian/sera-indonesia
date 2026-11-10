import type { ReactNode } from 'react';

interface ControlProps {
  id: string;
  name: string;
  required?: boolean;
  'aria-invalid'?: true;
  'aria-describedby'?: string;
}

export function Field({
  name,
  label,
  required,
  hint,
  error,
  children,
}: {
  name: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: (props: ControlProps) => ReactNode;
}) {
  const id = `field-${name}`;
  const describedBy = [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(' ') || undefined;
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-semibold">
        {label}
        {required && <span className="text-danger"> *</span>}
      </label>
      {children({
        id,
        name,
        required,
        ...(error ? { 'aria-invalid': true as const } : {}),
        'aria-describedby': describedBy,
      })}
      {hint && (
        <p id={`${id}-hint`} className="text-xs text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="text-xs font-medium text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
