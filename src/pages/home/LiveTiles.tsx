import { useTranslation } from 'react-i18next';
import { BentoCard } from '../../components/ui/BentoCard';
import { Skeleton } from '../../components/ui/Skeleton';
import { aqiLevel } from '../../features/data/aqi';
import { useAirQuality, useEarthquakes } from '../../features/data/hooks';
import { formatRelative } from '../../lib/utils';

function TileSkeleton() {
  return (
    <div className="flex flex-col items-center gap-2" aria-busy="true">
      <Skeleton className="h-7 w-20" />
      <Skeleton className="h-3 w-28" />
    </div>
  );
}

export function AirQualityTile() {
  const { t } = useTranslation();
  const { data: result } = useAirQuality();
  const jakarta = result?.data.cities.find((c) => c.city === 'Jakarta');

  return (
    <BentoCard className="flex min-h-36 flex-col items-center justify-center gap-1 text-center">
      {!jakarta || !result ? (
        <TileSkeleton />
      ) : (
        <>
          <p className="text-2xl font-semibold tabular-nums">
            AQI {jakarta.aqi} <span className="text-base font-medium text-muted">Jakarta</span>
          </p>
          <p className="text-sm font-semibold text-forest">{t(`aqi.${aqiLevel(jakarta.aqi)}`)}</p>
          <p className="text-xs text-muted">
            {result.isFallback ? t('data.snapshot') : t('data.liveShort')} · Open-Meteo
          </p>
        </>
      )}
    </BentoCard>
  );
}

export function QuakeTile() {
  const { t, i18n } = useTranslation();
  const { data: result } = useEarthquakes();
  const quake = result?.data.latest;

  return (
    <BentoCard tone="sage" className="flex min-h-36 flex-col items-center justify-center gap-1 text-center">
      {!quake || !result ? (
        <TileSkeleton />
      ) : (
        <>
          <p className="text-2xl font-semibold tabular-nums">M {quake.magnitude.toFixed(1)}</p>
          <p className="line-clamp-2 text-sm font-medium">{quake.region}</p>
          <p className="text-xs text-ink/60">
            {t('home.bento.quake')} · {formatRelative(quake.datetime, i18n.language)} · BMKG
          </p>
        </>
      )}
    </BentoCard>
  );
}
