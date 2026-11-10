import { Activity, HandHeart, Home, Info, Recycle, type LucideIcon } from 'lucide-react';
import { ROUTES } from '../../lib/constants';

export interface NavItem {
  to: string;
  labelKey: string;
  icon: LucideIcon;
}

export const NAV_ITEMS: NavItem[] = [
  { to: ROUTES.home, labelKey: 'nav.home', icon: Home },
  { to: ROUTES.wasteBank, labelKey: 'nav.wasteBank', icon: Recycle },
  { to: ROUTES.crisis, labelKey: 'nav.crisis', icon: Activity },
  { to: ROUTES.action, labelKey: 'nav.action', icon: HandHeart },
  { to: ROUTES.about, labelKey: 'nav.about', icon: Info },
];
