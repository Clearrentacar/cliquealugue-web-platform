import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ofvriblhpzbhdfyzwttw.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9mdnJpYmxocHpiaGRmeXp3dHR3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEyMTY4MDEsImV4cCI6MjA2Njc5MjgwMX0.noql5R-CksAJjRrKpduIum7F7nkw7-nIyq2ZnSrx2Ss';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types baseados no schema SQL fornecido
export interface Usuario {
  id: string;
  nome: string | null;
  email: string | null;
  tipo_usuario: 'motorista' | 'investidor' | null;
  created_at: string;
  updated_at: string;
}

export interface Motorista {
  id: string;
  cnh: string | null;
  telefone: string | null;
  data_nascimento: string | null;
  endereco: string | null;
  created_at: string;
  updated_at: string;
}

export interface Investidor {
  id: string;
  cpf_cnpj: string | null;
  telefone: string | null;
  endereco: string | null;
  created_at: string;
  updated_at: string;
}

export interface Veiculo {
  id: string;
  marca: string | null;
  modelo: string | null;
  ano: number | null;
  placa: string | null;
  renavam: string | null;
  chassi: string | null;
  cor: string | null;
  status: string | null;
  localizacao: string | null;
  id_investidor: string | null;
  created_at: string;
  updated_at: string;
}

export interface Multa {
  id: string;
  id_veiculo: string | null;
  id_motorista: string | null;
  data_multa: string | null;
  hora_multa: string | null;
  local_multa: string | null;
  descricao: string | null;
  valor: number | null;
  status: string | null;
  created_at: string;
}

export interface Manutencao {
  id: string;
  id_veiculo: string | null;
  data_inicio: string | null;
  data_fim: string | null;
  tipo_manutencao: string | null;
  descricao: string | null;
  custo: number | null;
  oficina: string | null;
  status: string | null;
  created_at: string;
}