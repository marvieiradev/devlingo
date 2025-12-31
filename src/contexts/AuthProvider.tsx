import { useEffect, useState, type ReactNode } from "react";
import { AuthContext, type AuthContextType } from "./AuthContext";
import type { User } from "@supabase/supabase-js";
import supabase from "@/services/supabase";
import createOrUpdateUserProfile from "@/services/userProfile";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);

      if (event === "INITIAL_SESSION" || event === "SIGNED_IN") {
        setLoading(false);
      }

      if (event === "SIGNED_OUT") {
        setLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (
    email: string,
    password: string
  ): Promise<{ error: Error | null }> => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password,
    });

    if (error) {
      console.error("Erro ao fazer login:", error);
      return { error };
    }

    if (data.user) {
      setUser(data.user);
      setLoading(false);
    }

    return { error: null };
  };

  const logout = async (): Promise<void> => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const signUp = async (
    name: string,
    email: string,
    password: string
  ): Promise<{ error: Error | null }> => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.error("Erro ao cadastrar usuário:", error);

      return { error };
    }

    if (data.user) {
      await createOrUpdateUserProfile(data.user.id, name, email);
    }

    return { error: null };
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    loading,
    signUp,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
