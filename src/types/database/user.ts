export type UserRole = 'normal' | 'admin';

export interface Profile {
  id: string;
  email: string;
  role: UserRole;
  created_at: string;
  updated_at: string;
}