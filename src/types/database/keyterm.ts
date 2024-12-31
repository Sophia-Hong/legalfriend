export interface KeyTerm {
  id: string;
  contract_id: string;
  term_name: string;
  original_text_snippet: string | null;
  analysis_notes: string | null;
  recommended_changes: string | null;
  miscellaneous: string | null;
  created_at: string;
  updated_at: string;
}

export interface KeyTermRevision {
  id: string;
  keyterm_id: string;
  revised_text: string | null;
  reason_for_revision: string | null;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface TermConversation {
  id: string;
  keyterm_id: string | null;
  user_id: string;
  role: string;
  content: string;
  conversation_id: string | null;
  created_at: string;
  updated_at: string;
}