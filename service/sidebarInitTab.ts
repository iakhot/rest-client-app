import { TabNames, TabNameValues } from '@/types/sidebar';

export default function sidebarInitTab(pathname: string) {
  const index = pathname.indexOf('/');
  const page = index > 0 ? pathname.slice(0, index) : pathname;
  const initialTab = page ? TabNameValues.indexOf(page as TabNames) : 0;
  return initialTab;
}
