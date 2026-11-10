import { useTranslation } from 'react-i18next';
import {
  Area,
  AreaChart,
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { CityWeather, DailyPoint } from '../../features/data/types';
import { formatDate } from '../../lib/utils';

/** US AQI threshold where air becomes unhealthy for everyone. */
const UNHEALTHY_AQI = 150;
const AXIS_TICK = { fill: 'var(--c-muted)', fontSize: 12 };
const TOOLTIP_STYLE = { background: 'var(--c-surface)', border: '1px solid var(--c-line)', borderRadius: 16, color: 'var(--c-ink)' };

function useShortDate() {
  const { i18n } = useTranslation();
  return (d: string) => formatDate(d, i18n.language).replace(/\s\d{4}$/, '');
}

export function AqiTrendChart({ data }: { data: DailyPoint[] }) {
  const { t, i18n } = useTranslation();
  const short = useShortDate();
  return (
    <div className="h-56 w-full" role="img" aria-label={t('crisis.air.trendAria', { values: data.map((d) => d.value).join(', ') })}>
      <ResponsiveContainer>
        <AreaChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: -20 }}>
          <defs>
            <linearGradient id="aqiFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--c-forest)" stopOpacity={0.35} />
              <stop offset="100%" stopColor="var(--c-forest)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} stroke="var(--c-line)" />
          <XAxis dataKey="date" tickFormatter={short} tick={AXIS_TICK} axisLine={false} tickLine={false} />
          <YAxis tick={AXIS_TICK} axisLine={false} tickLine={false} />
          <ReferenceLine y={UNHEALTHY_AQI} stroke="var(--c-danger)" strokeDasharray="4 4" />
          <Tooltip labelFormatter={(d) => formatDate(String(d), i18n.language)} formatter={(v) => [v, 'AQI']} contentStyle={TOOLTIP_STYLE} />
          <Area type="monotone" dataKey="value" stroke="var(--c-forest)" strokeWidth={2.5} fill="url(#aqiFill)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function ForecastChart({ daily }: { daily: CityWeather['daily'] }) {
  const { t, i18n } = useTranslation();
  const short = useShortDate();
  return (
    <div className="h-60 w-full" role="img" aria-label={t('crisis.weather.forecastAria')}>
      <ResponsiveContainer>
        <ComposedChart data={daily} margin={{ top: 8, right: 0, bottom: 0, left: -20 }}>
          <CartesianGrid vertical={false} stroke="var(--c-line)" />
          <XAxis dataKey="date" tickFormatter={short} tick={AXIS_TICK} axisLine={false} tickLine={false} />
          <YAxis yAxisId="t" tick={AXIS_TICK} axisLine={false} tickLine={false} unit="°" domain={['dataMin - 2', 'dataMax + 2']} />
          <YAxis yAxisId="r" orientation="right" tick={AXIS_TICK} axisLine={false} tickLine={false} unit="mm" />
          <Tooltip
            labelFormatter={(d) => formatDate(String(d), i18n.language)}
            formatter={(v, name) => [`${v}${name === 'rain' ? ' mm' : '°C'}`, t(`crisis.weather.series.${String(name)}`)]}
            contentStyle={TOOLTIP_STYLE}
          />
          <Bar yAxisId="r" dataKey="rain" fill="var(--c-sage-strong)" radius={[6, 6, 0, 0]} />
          <Line yAxisId="t" type="monotone" dataKey="max" stroke="var(--c-danger)" strokeWidth={2.5} dot={false} />
          <Line yAxisId="t" type="monotone" dataKey="min" stroke="var(--c-forest)" strokeWidth={2} dot={false} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

export function Sparkline({ data, id }: { data: { year: number; value: number }[]; id: string }) {
  return (
    <div className="h-24 w-full" aria-hidden>
      <ResponsiveContainer>
        <AreaChart data={data} margin={{ top: 4, right: 0, bottom: 0, left: 0 }}>
          <defs>
            <linearGradient id={`spark-${id}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--c-forest)" stopOpacity={0.3} />
              <stop offset="100%" stopColor="var(--c-forest)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <YAxis hide domain={['dataMin', 'dataMax']} />
          <Area type="monotone" dataKey="value" stroke="var(--c-forest)" strokeWidth={2} fill={`url(#spark-${id})`} isAnimationActive={false} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
