// Mock implementation for frontend-only version
export const isDemoMode = true;

// Mock types to maintain interface compatibility
export type User = {
  id: string;
  email?: string;
  user_metadata?: any;
};

export type Session = {
  user: User | null;
  access_token?: string;
};

// Mock client that implements the same interface but doesn't actually connect
export const supabase = {
  auth: {
    getSession: async () => ({ data: { session: null }, error: null }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    signInWithPassword: async () => ({ data: { user: null, session: null }, error: null }),
    signUp: async () => ({ data: { user: null, session: null }, error: null }),
    signOut: async () => ({ error: null })
  },
  from: () => ({
    select: () => ({
      eq: () => ({
        single: async () => ({ data: null, error: null }),
        data: async () => ({ data: [], error: null })
      }),
      data: async () => ({ data: [], error: null })
    }),
    insert: async () => ({ data: null, error: null }),
    update: async () => ({ data: null, error: null }),
    delete: async () => ({ data: null, error: null })
  })
}; 