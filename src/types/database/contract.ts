export type ContractStatus = 'pending' | 'processing' | 'completed' | 'failed';

export interface Contract {
  id: string;
  user_id: string;
  file_name: string;
  file_type: string | null;
  file_url: string;
  uploaded_at: string;
  status: ContractStatus;
  payment_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface Analysis {
  id: string;
  contract_id: string;
  summary: string | null;
  insights: Record<string, unknown> | null;
  benchmarks: Record<string, unknown> | null;
  status: ContractStatus;
  created_at: string;
  updated_at: string;
}
