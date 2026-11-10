import { useTranslation } from 'react-i18next';
import { Area, AreaChart, CartesianGrid, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { formatDate } from '../../lib/utils';

/** US AQI threshold where air becomes unhealthy for everyone. */
const UNHEALTHY_AQI = 150;

export default function AqiTrendChart({ data }: { data: { date: string; aqi: number }[] }) {
  const { t, i18n } = useTranslation();
  const label = (d: string) => formatDate(d, i18n.language).replace(/\s\d{4}$/, '');

  return (
    <div className="h-56 w-full" role="img" aria-label={t('crisis.air.trendAria', { values: data.map((d) => d.aqi).join(', ') })}>
      <ResponsiveContainer>
        <AreaChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: -20 }}>
          <defs>
            <linearGradient id="aqiFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--c-forest)" stopOpacity={0.35} />
              <stop offset="100%" stopColor="var(--c-forest)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} stroke="var(--c-line)" />
          <XAxis dataKey="date" tickFormatter={label} tick={{ fill: 'var(--c-muted)', fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: 'var(--c-muted)', fontSize: 12 }} axisLine={false} tickLine={false} />
          <ReferenceLine y={UNHEALTHY_AQI} stroke="var(--c-danger)" strokeDasharray="4 4" />
          <Tooltip
            labelFormatter={(d) => formatDate(String(d), i18n.language)}
            formatter={(v) => [v, 'AQI']}
            contentStyle={{ background: 'var(--c-surface)', border: '1px solid var(--c-line)', borderRadius: 16, color: 'var(--c-ink)' }}
          />
          <Area type="monotone" dataKey="aqi" stroke="var(--c-forest)" strokeWidth={2.5} fill="url(#aqiFill)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
