/*
  # Schema inicial do CliqueAlugue

  1. Novas Tabelas
    - `usuarios` - Tabela principal de usuários vinculada ao auth.users
    - `motoristas` - Perfil específico para motoristas
    - `investidores` - Perfil específico para investidores  
    - `veiculos` - Frota de veículos dos investidores
    - `multas` - Registro de multas dos veículos
    - `vistorias` - Histórico de vistorias dos veículos
    - `manutencoes` - Histórico de manutenções dos veículos

  2. Segurança
    - Habilita RLS em todas as tabelas
    - Cria políticas específicas para cada tipo de usuário
    - Garante isolamento de dados por perfil

  3. Relacionamentos
    - usuarios.id -> auth.users.id
    - motoristas.id -> usuarios.id
    - investidores.id -> usuarios.id
    - veiculos.id_investidor -> investidores.id
    - multas.id_veiculo -> veiculos.id
    - multas.id_motorista -> motoristas.id
    - vistorias.id_veiculo -> veiculos.id
    - manutencoes.id_veiculo -> veiculos.id
*/

-- Tabela principal de usuários
CREATE TABLE IF NOT EXISTS usuarios (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  nome text,
  email text UNIQUE,
  tipo_usuario text CHECK (tipo_usuario IN ('motorista', 'investidor')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Perfil específico para motoristas
CREATE TABLE IF NOT EXISTS motoristas (
  id uuid PRIMARY KEY REFERENCES usuarios(id) ON DELETE CASCADE,
  cnh text,
  telefone text,
  data_nascimento date,
  endereco text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Perfil específico para investidores
CREATE TABLE IF NOT EXISTS investidores (
  id uuid PRIMARY KEY REFERENCES usuarios(id) ON DELETE CASCADE,
  cpf_cnpj text,
  telefone text,
  endereco text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Frota de veículos
CREATE TABLE IF NOT EXISTS veiculos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  marca text,
  modelo text,
  ano integer,
  placa text UNIQUE,
  renavam text,
  chassi text,
  cor text,
  status text DEFAULT 'disponivel' CHECK (status IN ('disponivel', 'alugado', 'manutencao', 'inativo')),
  localizacao text,
  id_investidor uuid REFERENCES investidores(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Registro de multas
CREATE TABLE IF NOT EXISTS multas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  id_veiculo uuid REFERENCES veiculos(id) ON DELETE CASCADE,
  id_motorista uuid REFERENCES motoristas(id) ON DELETE SET NULL,
  data_multa date,
  hora_multa time,
  local_multa text,
  descricao text,
  valor decimal(10,2),
  status text DEFAULT 'pendente' CHECK (status IN ('pendente', 'pago', 'contestado')),
  created_at timestamptz DEFAULT now()
);

-- Histórico de vistorias
CREATE TABLE IF NOT EXISTS vistorias (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  id_veiculo uuid REFERENCES veiculos(id) ON DELETE CASCADE,
  data_vistoria date DEFAULT CURRENT_DATE,
  tipo_vistoria text CHECK (tipo_vistoria IN ('entrada', 'saida', 'periodica', 'sinistro')),
  observacoes text,
  status text DEFAULT 'realizada' CHECK (status IN ('agendada', 'realizada', 'cancelada')),
  created_at timestamptz DEFAULT now()
);

-- Histórico de manutenções
CREATE TABLE IF NOT EXISTS manutencoes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  id_veiculo uuid REFERENCES veiculos(id) ON DELETE CASCADE,
  data_inicio date DEFAULT CURRENT_DATE,
  data_fim date,
  tipo_manutencao text CHECK (tipo_manutencao IN ('preventiva', 'corretiva', 'revisao')),
  descricao text,
  custo decimal(10,2),
  oficina text,
  status text DEFAULT 'agendada' CHECK (status IN ('agendada', 'em_andamento', 'concluida', 'cancelada')),
  created_at timestamptz DEFAULT now()
);

-- Habilitar RLS em todas as tabelas
ALTER TABLE usuarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE motoristas ENABLE ROW LEVEL SECURITY;
ALTER TABLE investidores ENABLE ROW LEVEL SECURITY;
ALTER TABLE veiculos ENABLE ROW LEVEL SECURITY;
ALTER TABLE multas ENABLE ROW LEVEL SECURITY;
ALTER TABLE vistorias ENABLE ROW LEVEL SECURITY;
ALTER TABLE manutencoes ENABLE ROW LEVEL SECURITY;

-- Políticas para tabela usuarios
CREATE POLICY "Usuários podem ler próprio perfil"
  ON usuarios
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Usuários podem atualizar próprio perfil"
  ON usuarios
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Usuários podem inserir próprio perfil"
  ON usuarios
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Políticas para tabela motoristas
CREATE POLICY "Motoristas podem ler próprio perfil"
  ON motoristas
  FOR SELECT
  TO authenticated
  USING (
    auth.uid() = id AND 
    EXISTS (
      SELECT 1 FROM usuarios 
      WHERE usuarios.id = auth.uid() 
      AND usuarios.tipo_usuario = 'motorista'
    )
  );

CREATE POLICY "Motoristas podem atualizar próprio perfil"
  ON motoristas
  FOR UPDATE
  TO authenticated
  USING (
    auth.uid() = id AND 
    EXISTS (
      SELECT 1 FROM usuarios 
      WHERE usuarios.id = auth.uid() 
      AND usuarios.tipo_usuario = 'motorista'
    )
  );

CREATE POLICY "Motoristas podem inserir próprio perfil"
  ON motoristas
  FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = id AND 
    EXISTS (
      SELECT 1 FROM usuarios 
      WHERE usuarios.id = auth.uid() 
      AND usuarios.tipo_usuario = 'motorista'
    )
  );

-- Políticas para tabela investidores
CREATE POLICY "Investidores podem ler próprio perfil"
  ON investidores
  FOR SELECT
  TO authenticated
  USING (
    auth.uid() = id AND 
    EXISTS (
      SELECT 1 FROM usuarios 
      WHERE usuarios.id = auth.uid() 
      AND usuarios.tipo_usuario = 'investidor'
    )
  );

CREATE POLICY "Investidores podem atualizar próprio perfil"
  ON investidores
  FOR UPDATE
  TO authenticated
  USING (
    auth.uid() = id AND 
    EXISTS (
      SELECT 1 FROM usuarios 
      WHERE usuarios.id = auth.uid() 
      AND usuarios.tipo_usuario = 'investidor'
    )
  );

CREATE POLICY "Investidores podem inserir próprio perfil"
  ON investidores
  FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = id AND 
    EXISTS (
      SELECT 1 FROM usuarios 
      WHERE usuarios.id = auth.uid() 
      AND usuarios.tipo_usuario = 'investidor'
    )
  );

-- Políticas para tabela veiculos
CREATE POLICY "Investidores podem gerenciar próprios veículos"
  ON veiculos
  FOR ALL
  TO authenticated
  USING (
    id_investidor = auth.uid() AND
    EXISTS (
      SELECT 1 FROM usuarios 
      WHERE usuarios.id = auth.uid() 
      AND usuarios.tipo_usuario = 'investidor'
    )
  )
  WITH CHECK (
    id_investidor = auth.uid() AND
    EXISTS (
      SELECT 1 FROM usuarios 
      WHERE usuarios.id = auth.uid() 
      AND usuarios.tipo_usuario = 'investidor'
    )
  );

CREATE POLICY "Usuários podem ver veículos disponíveis"
  ON veiculos
  FOR SELECT
  TO authenticated
  USING (status = 'disponivel');

-- Políticas para tabela multas
CREATE POLICY "Administradores podem gerenciar multas"
  ON multas
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Motoristas podem ver próprias multas"
  ON multas
  FOR SELECT
  TO authenticated
  USING (
    id_motorista = auth.uid() AND
    EXISTS (
      SELECT 1 FROM usuarios 
      WHERE usuarios.id = auth.uid() 
      AND usuarios.tipo_usuario = 'motorista'
    )
  );

-- Políticas para tabela vistorias
CREATE POLICY "Administradores podem gerenciar vistorias"
  ON vistorias
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Investidores podem ver vistorias de seus veículos"
  ON vistorias
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM veiculos v
      JOIN usuarios u ON u.id = auth.uid()
      WHERE v.id = vistorias.id_veiculo 
      AND v.id_investidor = auth.uid()
      AND u.tipo_usuario = 'investidor'
    )
  );

CREATE POLICY "Motoristas podem ver vistorias de veículos que usaram"
  ON vistorias
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM usuarios u
      WHERE u.id = auth.uid()
      AND u.tipo_usuario = 'motorista'
    )
  );

-- Políticas para tabela manutencoes
CREATE POLICY "Administradores podem gerenciar manutenções"
  ON manutencoes
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Investidores podem ver manutenções de seus veículos"
  ON manutencoes
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM veiculos v
      JOIN usuarios u ON u.id = auth.uid()
      WHERE v.id = manutencoes.id_veiculo 
      AND v.id_investidor = auth.uid()
      AND u.tipo_usuario = 'investidor'
    )
  );

CREATE POLICY "Motoristas podem ver manutenções de veículos que usaram"
  ON manutencoes
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM usuarios u
      WHERE u.id = auth.uid()
      AND u.tipo_usuario = 'motorista'
    )
  );

-- Função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para atualizar updated_at
CREATE TRIGGER update_usuarios_updated_at 
  BEFORE UPDATE ON usuarios 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_motoristas_updated_at 
  BEFORE UPDATE ON motoristas 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_investidores_updated_at 
  BEFORE UPDATE ON investidores 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_veiculos_updated_at 
  BEFORE UPDATE ON veiculos 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();