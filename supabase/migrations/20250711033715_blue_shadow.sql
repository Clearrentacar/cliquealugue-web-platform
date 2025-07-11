/*
  # Create Demo Accounts for CliqueAlugue

  1. Demo Users
    - Creates motorista@demo.com (motorista)
    - Creates investidor@demo.com (investidor)
    - Both with password: demo123

  2. Security
    - Uses Supabase Auth system
    - Creates corresponding profiles in usuarios table
    - Creates specific profiles in motoristas/investidores tables

  3. Sample Data
    - Adds sample vehicle for investor
    - Adds sample maintenance and inspection records
*/

-- Insert demo users into auth.users (this simulates the signup process)
-- Note: In production, these would be created through the Supabase Auth API

-- Demo Motorista
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  recovery_sent_at,
  last_sign_in_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  '11111111-1111-1111-1111-111111111111',
  'authenticated',
  'authenticated',
  'motorista@demo.com',
  crypt('demo123', gen_salt('bf')),
  NOW(),
  NOW(),
  NOW(),
  '{"provider": "email", "providers": ["email"]}',
  '{"nome": "João Silva", "tipo_usuario": "motorista"}',
  NOW(),
  NOW(),
  '',
  '',
  '',
  ''
) ON CONFLICT (id) DO NOTHING;

-- Demo Investidor
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  recovery_sent_at,
  last_sign_in_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  '22222222-2222-2222-2222-222222222222',
  'authenticated',
  'authenticated',
  'investidor@demo.com',
  crypt('demo123', gen_salt('bf')),
  NOW(),
  NOW(),
  NOW(),
  '{"provider": "email", "providers": ["email"]}',
  '{"nome": "Maria Santos", "tipo_usuario": "investidor"}',
  NOW(),
  NOW(),
  '',
  '',
  '',
  ''
) ON CONFLICT (id) DO NOTHING;

-- Create profiles in usuarios table
INSERT INTO usuarios (id, nome, email, tipo_usuario, created_at, updated_at) VALUES
  ('11111111-1111-1111-1111-111111111111', 'João Silva', 'motorista@demo.com', 'motorista', NOW(), NOW()),
  ('22222222-2222-2222-2222-222222222222', 'Maria Santos', 'investidor@demo.com', 'investidor', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Create motorista profile
INSERT INTO motoristas (id, cnh, telefone, data_nascimento, endereco, created_at, updated_at) VALUES
  ('11111111-1111-1111-1111-111111111111', '12345678901', '(11) 99999-9999', '1990-05-15', 'Rua das Flores, 123 - São Paulo, SP', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Create investidor profile
INSERT INTO investidores (id, cpf_cnpj, telefone, endereco, created_at, updated_at) VALUES
  ('22222222-2222-2222-2222-222222222222', '123.456.789-00', '(11) 88888-8888', 'Av. Paulista, 1000 - São Paulo, SP', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Create sample vehicles for the investor
INSERT INTO veiculos (id, marca, modelo, ano, placa, renavam, chassi, cor, status, localizacao, id_investidor, created_at, updated_at) VALUES
  ('33333333-3333-3333-3333-333333333333', 'Toyota', 'Corolla', 2022, 'ABC-1234', '12345678901', '9BWZZZ377VT004251', 'Branco', 'alugado', 'São Paulo, SP', '22222222-2222-2222-2222-222222222222', NOW(), NOW()),
  ('44444444-4444-4444-4444-444444444444', 'Honda', 'Civic', 2021, 'DEF-5678', '10987654321', '1HGBH41JXMN109186', 'Prata', 'disponivel', 'São Paulo, SP', '22222222-2222-2222-2222-222222222222', NOW(), NOW()),
  ('55555555-5555-5555-5555-555555555555', 'Nissan', 'Sentra', 2023, 'GHI-9012', '11223344556', '3N1AB7AP5EY123456', 'Preto', 'manutencao', 'São Paulo, SP', '22222222-2222-2222-2222-222222222222', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Create sample maintenance records
INSERT INTO manutencoes (id, id_veiculo, data_inicio, data_fim, tipo_manutencao, descricao, custo, oficina, status, created_at) VALUES
  ('66666666-6666-6666-6666-666666666666', '33333333-3333-3333-3333-333333333333', '2024-12-01', '2024-12-02', 'Preventiva', 'Troca de óleo e filtros', 250.00, 'Auto Center Silva', 'concluida', NOW()),
  ('77777777-7777-7777-7777-777777777777', '55555555-5555-5555-5555-555555555555', '2024-12-15', NULL, 'Corretiva', 'Reparo no sistema de freios', 800.00, 'Oficina do João', 'em_andamento', NOW())
ON CONFLICT (id) DO NOTHING;

-- Create sample inspection records
INSERT INTO vistorias (id, id_veiculo, data_vistoria, tipo_vistoria, observacoes, status, created_at) VALUES
  ('88888888-8888-8888-8888-888888888888', '33333333-3333-3333-3333-333333333333', '2024-11-15', 'Entrada', 'Veículo em excelente estado', 'aprovada', NOW()),
  ('99999999-9999-9999-9999-999999999999', '44444444-4444-4444-4444-444444444444', '2024-12-01', 'Periódica', 'Pequenos riscos na lataria', 'aprovada', NOW())
ON CONFLICT (id) DO NOTHING;

-- Create sample traffic violations
INSERT INTO multas (id, id_veiculo, id_motorista, data_multa, hora_multa, local_multa, descricao, valor, status, created_at) VALUES
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '33333333-3333-3333-3333-333333333333', '11111111-1111-1111-1111-111111111111', '2024-11-20', '14:30:00', 'Av. Paulista, 1500', 'Excesso de velocidade', 195.23, 'pendente', NOW())
ON CONFLICT (id) DO NOTHING;