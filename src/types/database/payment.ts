export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded';

export interface Payment {
  id: string;
  user_id: string;
  contract_id: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  transaction_id: string | null;
  created_at: string;
  updated_at: string;
}