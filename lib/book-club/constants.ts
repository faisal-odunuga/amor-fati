import {
  BarChart3,
  BookOpenCheck,
  ClipboardCheck,
  LayoutDashboard,
  type LucideIcon,
  Settings2,
  Users,
  ScrollText,
  FolderKanban,
} from 'lucide-react';
import type { ScheduleItemType } from '@/lib/book-club/types';

export const WEIGHTS_BY_TYPE: Record<ScheduleItemType, number> = {
  reading: 1,
  catchup: 0.5,
  implementation: 1.5,
  event: 0.75,
};

export const GOLD = '#d9a517';

export const iconMap = {
  dashboard: LayoutDashboard,
  schedule: BookOpenCheck,
  log: ClipboardCheck,
  progress: BarChart3,
  plans: FolderKanban,
  members: Users,
  logs: ScrollText,
  resources: Settings2,
} as const;

export type IconKey = keyof typeof iconMap;

export type PlatformNavItem = {
  href: string;
  label: string;
  icon: IconKey;
};


export const BOOKCLUB_SIDENAV: PlatformNavItem[] = [
  { href: '/dashboard', label: 'Dashboard', icon: 'dashboard' },
  { href: '/schedule', label: 'Schedule', icon: 'schedule' },
  { href: '/log', label: 'Proof of Work', icon: 'log' },
  { href: '/progress', label: 'Progress', icon: 'progress' },
];

export const ADMIN_SIDENAV: PlatformNavItem[] = [
  { href: '/dashboard', label: 'Dashboard', icon: 'dashboard' },
  { href: '/plans', label: 'Plans', icon: 'plans' },
  { href: '/members', label: 'Members', icon: 'members' },
  { href: '/logs', label: 'Logs', icon: 'logs' },
  { href: '/resources', label: 'Resources', icon: 'resources' },
];
