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
      contract_submissions: {
        Row: {
          analysis_result: Json | null
          completed_at: string | null
          contract_file_path: string
          created_at: string | null
          id: string
          payment_status: boolean | null
          pdf_url: string | null
          share_token: string | null
          status: Database["public"]["Enums"]["contract_analysis_status"] | null
          updated_at: string | null
          user_email: string
        }
        Insert: {
          analysis_result?: Json | null
          completed_at?: string | null
          contract_file_path: string
          created_at?: string | null
          id?: string
          payment_status?: boolean | null
          pdf_url?: string | null
          share_token?: string | null
          status?:
            | Database["public"]["Enums"]["contract_analysis_status"]
            | null
          updated_at?: string | null
          user_email: string
        }
        Update: {
          analysis_result?: Json | null
          completed_at?: string | null
          contract_file_path?: string
          created_at?: string | null
          id?: string
          payment_status?: boolean | null
          pdf_url?: string | null
          share_token?: string | null
          status?:
            | Database["public"]["Enums"]["contract_analysis_status"]
            | null
          updated_at?: string | null
          user_email?: string
        }
        Relationships: []
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
      post_status: "draft" | "published" | "archived"
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
