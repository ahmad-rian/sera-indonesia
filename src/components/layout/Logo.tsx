import { Link } from 'react-router-dom';
import { ROUTES } from '../../lib/constants';

export function Logo() {
  return (
    <Link to={ROUTES.home} className="flex items-center gap-2.5 font-bold tracking-tight" aria-label="SERA Indonesia">
      <img src="/icons/sera-mark.svg" alt="" width={32} height={32} className="size-8" />
      <span className="text-lg">SERA</span>
    </Link>
  );
}
