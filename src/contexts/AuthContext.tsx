import { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase, Usuario } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  user: User | null;
  userData: Usuario | null;
  register: (email: string, password: string, nome: string, tipoUsuario: 'motorista' | 'investidor') => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Verificar sessão atual
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchUserData(session.user.id);
      }
      setLoading(false);
    });

    // Escutar mudanças de autenticação
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null);
      
      if (session?.user) {
        await fetchUserData(session.user.id);
      } else {
        setUserData(null);
      }
      
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserData = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('usuarios')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Erro ao buscar dados do usuário:', error);
        return;
      }

      setUserData(data);
    } catch (error) {
      console.error('Erro ao buscar dados do usuário:', error);
    }
  };

  const register = async (email: string, password: string, nome: string, tipoUsuario: 'motorista' | 'investidor') => {
    setLoading(true);
    try {
      // 1. Criar usuário no Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            nome,
            tipo_usuario: tipoUsuario
          }
        }
      });

      if (authError) {
        throw authError;
      }

      if (!authData.user) {
        throw new Error('Erro ao criar usuário');
      }

      // 2. Criar perfil na tabela usuarios
      const { error: usuarioError } = await supabase
        .from('usuarios')
        .insert({
          id: authData.user.id,
          nome,
          email,
          tipo_usuario: tipoUsuario
        });

      if (usuarioError) {
        console.error('Erro ao criar perfil de usuário:', usuarioError);
        // Não falhar aqui, pois o usuário já foi criado no Auth
      }

      // 3. Criar perfil específico (motorista ou investidor)
      if (tipoUsuario === 'motorista') {
        const { error: motoristaError } = await supabase
          .from('motoristas')
          .insert({
            id: authData.user.id
          });

        if (motoristaError) {
          console.error('Erro ao criar perfil de motorista:', motoristaError);
        }
      } else if (tipoUsuario === 'investidor') {
        const { error: investidorError } = await supabase
          .from('investidores')
          .insert({
            id: authData.user.id
          });

        if (investidorError) {
          console.error('Erro ao criar perfil de investidor:', investidorError);
        }
      }

      toast({
        title: "Conta criada com sucesso!",
        description: "Verifique seu email para confirmar a conta.",
      });

    } catch (error: any) {
      toast({
        title: "Erro no cadastro",
        description: error.message || "Erro ao criar conta. Tente novamente.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      toast({
        title: "Login realizado com sucesso!",
        description: "Bem-vindo ao CliqueAlugue.",
      });
    } catch (error: any) {
      console.error('Erro de login:', error);
      toast({
        title: "Erro no login",
        description: getErrorMessage(error),
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      setUser(null);
      setUserData(null);
      
      toast({
        title: "Logout realizado",
        description: "Até logo!",
      });
    } catch (error: any) {
      toast({
        title: "Erro no logout",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const getErrorMessage = (error: any) => {
    if (error.message?.includes('Invalid login credentials')) {
      return "Email ou senha incorretos. Verifique suas credenciais.";
    }
    if (error.message?.includes('Email not confirmed')) {
      return "Email não confirmado. Verifique sua caixa de entrada.";
    }
    if (error.message?.includes('User already registered')) {
      return "Este email já está cadastrado. Tente fazer login.";
    }
    return error.message || "Erro desconhecido. Tente novamente.";
  };

  const value = {
    user,
    userData,
    register,
    login,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};