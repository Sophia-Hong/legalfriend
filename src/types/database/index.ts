import { Profile, UserRole } from './user';
import { Contract, ContractStatus, Analysis } from './contract';
import { Payment, PaymentStatus } from './payment';
import { KeyTerm, KeyTermRevision, TermConversation } from './keyterm';

// Database type helpers
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Omit<Profile, 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Profile, 'created_at' | 'updated_at'>>;
      };
      contracts: {
        Row: Contract;
        Insert: Omit<Contract, 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Contract, 'created_at' | 'updated_at'>>;
      };
      payments: {
        Row: Payment;
        Insert: Omit<Payment, 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Payment, 'created_at' | 'updated_at'>>;
      };
      analyses: {
        Row: Analysis;
        Insert: Omit<Analysis, 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Analysis, 'created_at' | 'updated_at'>>;
      };
      keyterms: {
        Row: KeyTerm;
        Insert: Omit<KeyTerm, 'created_at' | 'updated_at'>;
        Update: Partial<Omit<KeyTerm, 'created_at' | 'updated_at'>>;
      };
      keytermrevisions: {
        Row: KeyTermRevision;
        Insert: Omit<KeyTermRevision, 'created_at' | 'updated_at'>;
        Update: Partial<Omit<KeyTermRevision, 'created_at' | 'updated_at'>>;
      };
      termconversations: {
        Row: TermConversation;
        Insert: Omit<TermConversation, 'created_at' | 'updated_at'>;
        Update: Partial<Omit<TermConversation, 'created_at' | 'updated_at'>>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      user_role_enum: UserRole;
      contract_status_enum: ContractStatus;
      payment_status_enum: PaymentStatus;
    };
  };
}

// Re-export all types for convenience
export * from './user';
export * from './contract';
export * from './payment';
export * from './keyterm';