// lib/types.ts
export type UserRole = "ROLE_ADMIN" | "ROLE_MODERATOR" | "ROLE_USER" | string;

export interface MenuItem {
  icon: React.ReactNode;
  label: string;
  href: string;
  visible: boolean;
  onClick?: () => void;
}

export interface MenuSection {
  title: string;
  items: MenuItem[];
}

// Add other interfaces as needed for your application
export interface User {
  id: string;
  username: string;
  email: string;
  roles: UserRole[];
}

export interface Department {
  id: string;
  name: string;
  description?: string;
}

export interface Attendance {
  id: string;
  userId: string;
  checkIn: string;
  checkOut?: string;
  date: string;
}