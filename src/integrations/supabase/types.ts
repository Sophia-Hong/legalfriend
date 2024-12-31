export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      analyses: {
        Row: {
          benchmarks: Json | null
          contract_id: string
          created_at: string
          id: string
          insights: Json | null
          summary: string | null
          updated_at: string
        }
        Insert: {
          benchmarks?: Json | null
          contract_id: string
          created_at?: string
          id?: string
          insights?: Json | null
          summary?: string | null
          updated_at?: string
        }
        Update: {
          benchmarks?: Json | null
          contract_id?: string
          created_at?: string
          id?: string
          insights?: Json | null
          summary?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "analyses_contract_id_fkey"
            columns: ["contract_id"]
            isOneToOne: false
            referencedRelation: "contracts"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_posts: {
        Row: {
          category: Database["public"]["Enums"]["blog_category"]
          content: string
          created_at: string
          description: string
          id: string
          image_url: string
          published_at: string | null
          read_time: string
          slug: string | null
          status: Database["public"]["Enums"]["post_status"]
          tags: string[] | null
          title: string
          updated_at: string
          views_count: number
        }
        Insert: {
          category: Database["public"]["Enums"]["blog_category"]
          content: string
          created_at?: string
          description: string
          id?: string
          image_url: string
          published_at?: string | null
          read_time: string
          slug?: string | null
          status?: Database["public"]["Enums"]["post_status"]
          tags?: string[] | null
          title: string
          updated_at?: string
          views_count?: number
        }
        Update: {
          category?: Database["public"]["Enums"]["blog_category"]
          content?: string
          created_at?: string
          description?: string
          id?: string
          image_url?: string
          published_at?: string | null
          read_time?: string
          slug?: string | null
          status?: Database["public"]["Enums"]["post_status"]
          tags?: string[] | null
          title?: string
          updated_at?: string
          views_count?: number
        }
        Relationships: []
      }
      contracts: {
        Row: {
          created_at: string
          file_name: string
          file_type: string | null
          file_url: string
          id: string
          payment_id: string | null
          status: Database["public"]["Enums"]["contract_status_enum"]
          updated_at: string
          uploaded_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          file_name: string
          file_type?: string | null
          file_url: string
          id?: string
          payment_id?: string | null
          status?: Database["public"]["Enums"]["contract_status_enum"]
          updated_at?: string
          uploaded_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          file_name?: string
          file_type?: string | null
          file_url?: string
          id?: string
          payment_id?: string | null
          status?: Database["public"]["Enums"]["contract_status_enum"]
          updated_at?: string
          uploaded_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "contracts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_contracts_payment_id"
            columns: ["payment_id"]
            isOneToOne: false
            referencedRelation: "payments"
            referencedColumns: ["id"]
          },
        ]
      }
      keytermrevisions: {
        Row: {
          created_at: string
          created_by: string
          id: string
          keyterm_id: string
          reason_for_revision: string | null
          revised_text: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by: string
          id?: string
          keyterm_id: string
          reason_for_revision?: string | null
          revised_text?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string
          id?: string
          keyterm_id?: string
          reason_for_revision?: string | null
          revised_text?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "keytermrevisions_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "keytermrevisions_keyterm_id_fkey"
            columns: ["keyterm_id"]
            isOneToOne: false
            referencedRelation: "keyterms"
            referencedColumns: ["id"]
          },
        ]
      }
      keyterms: {
        Row: {
          analysis_notes: string | null
          contract_id: string
          created_at: string
          id: string
          miscellaneous: string | null
          original_text_snippet: string | null
          recommended_changes: string | null
          term_name: string
          updated_at: string
        }
        Insert: {
          analysis_notes?: string | null
          contract_id: string
          created_at?: string
          id?: string
          miscellaneous?: string | null
          original_text_snippet?: string | null
          recommended_changes?: string | null
          term_name: string
          updated_at?: string
        }
        Update: {
          analysis_notes?: string | null
          contract_id?: string
          created_at?: string
          id?: string
          miscellaneous?: string | null
          original_text_snippet?: string | null
          recommended_changes?: string | null
          term_name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "keyterms_contract_id_fkey"
            columns: ["contract_id"]
            isOneToOne: false
            referencedRelation: "contracts"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount: number
          contract_id: string
          created_at: string
          currency: string
          id: string
          status: Database["public"]["Enums"]["payment_status_enum"]
          transaction_id: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          amount: number
          contract_id: string
          created_at?: string
          currency?: string
          id?: string
          status?: Database["public"]["Enums"]["payment_status_enum"]
          transaction_id?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          amount?: number
          contract_id?: string
          created_at?: string
          currency?: string
          id?: string
          status?: Database["public"]["Enums"]["payment_status_enum"]
          transaction_id?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "payments_contract_id_fkey"
            columns: ["contract_id"]
            isOneToOne: false
            referencedRelation: "contracts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          email: string
          id: string
          role: Database["public"]["Enums"]["user_role_enum"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id: string
          role?: Database["public"]["Enums"]["user_role_enum"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          role?: Database["public"]["Enums"]["user_role_enum"]
          updated_at?: string
        }
        Relationships: []
      }
      termconversations: {
        Row: {
          content: string
          conversation_id: string | null
          created_at: string
          id: string
          keyterm_id: string | null
          role: string
          updated_at: string
          user_id: string
        }
        Insert: {
          content: string
          conversation_id?: string | null
          created_at?: string
          id?: string
          keyterm_id?: string | null
          role: string
          updated_at?: string
          user_id: string
        }
        Update: {
          content?: string
          conversation_id?: string | null
          created_at?: string
          id?: string
          keyterm_id?: string | null
          role?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "termconversations_keyterm_id_fkey"
            columns: ["keyterm_id"]
            isOneToOne: false
            referencedRelation: "keyterms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "termconversations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      blog_category:
        | "Lease Basics"
        | "Tenant Rights"
        | "Moving Tips"
        | "Financial Planning"
      contract_analysis_status:
        | "pending"
        | "processing"
        | "completed"
        | "failed"
      contract_status_enum: "pending" | "processing" | "completed" | "failed"
      payment_status_enum: "pending" | "completed" | "failed" | "refunded"
      post_status: "draft" | "published" | "archived"
      user_role_enum: "normal" | "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
