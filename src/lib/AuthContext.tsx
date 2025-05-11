import { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from './supabase';
import { supabase, isDemoMode } from './supabase';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize auth state
    const initializeAuth = async () => {
      try {
        // Always start with no session in demo mode
        setSession(null);
        setUser(null);
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      // No-op in demo mode
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      // In demo mode, simulate a successful login
      const mockUser: User = {
        id: 'demo-user-id',
        email: email,
        user_metadata: { role: 'user' }
      };
      const mockSession: Session = {
        user: mockUser,
        access_token: 'demo-token'
      };
      
      setUser(mockUser);
      setSession(mockSession);
      return { error: null };
    } catch (error) {
      console.error('Error signing in:', error);
      return { error: error as Error };
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      // In demo mode, simulate a successful signup
      const mockUser: User = {
        id: 'demo-user-id',
        email: email,
        user_metadata: { role: 'user' }
      };
      const mockSession: Session = {
        user: mockUser,
        access_token: 'demo-token'
      };
      
      setUser(mockUser);
      setSession(mockSession);
      return { error: null };
    } catch (error) {
      console.error('Error signing up:', error);
      return { error: error as Error };
    }
  };

  const signOut = async () => {
    try {
      setUser(null);
      setSession(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const value = {
    user,
    session,
    loading,
    signIn,
    signUp,
    signOut
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 