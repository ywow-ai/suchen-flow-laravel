import { LucideIcon } from 'lucide-react';

export interface Auth {
  user: User;
}

export interface BreadcrumbItem {
  title: string;
  href: string;
}

export interface NavGroup {
  title: string;
  items: NavItem[];
}

export interface NavItem {
  path: string;
  name: string;
  regex: RegExp;
  Icon: LucideIcon;
}

export interface Toast {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  title?: string;
}

export interface Flash {
  toast?: Toast;
}

export interface SharedData {
  name: string;
  auth: Auth;
  sidebarOpen: boolean;
  flash: Flash;
  [key: string]: unknown;
}

export interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  email_verified_at: string | null;
  two_factor_enabled?: boolean;
  created_at: string;
  updated_at: string;
  [key: string]: unknown; // This allows for additional properties...
}
