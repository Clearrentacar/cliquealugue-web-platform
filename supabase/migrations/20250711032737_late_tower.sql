/*
  # Seed data para CliqueAlugue

  Este arquivo popula o banco com dados de demonstração:
  - Usuários de teste (motorista e investidor)
  - Perfis correspondentes
  - Veículos de exemplo
  - Dados de exemplo para demonstração

  IMPORTANTE: Execute este seed apenas em ambiente de desenvolvimento!
*/

-- Inserir usuários de demonstração na tabela auth.users
-- Nota: Em produção, estes usuários seriam criados via Supabase Auth
INSERT INTO auth.users (
  id,
  instance_id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  role
) VALUES 
(
  '11111111-1111-1111-1111-111111111111',
  '00000000-0000-0000-0000-000000000000',
  'motorista@demo.com',
  crypt('demo123', gen_salt('bf')),
  now(),
  now(),
  now(),
  '{"provider": "email", "providers": ["email"]}',
  '{"name": "João Silva"}',
  false,
  'authenticated'
),
(
  '22222222-2222-2222-2222-222222222222',
  '00000000-0000-0000-0000-000000000000',
  'investidor@demo.com',
  crypt('demo123', gen_salt('bf')),
  now(),
  now(),
  now(),
  '{"provider": "email", "providers": ["email"]}',
  '{"name": "Maria Santos"}',
  false,
  'authenticated'
) ON CONFLICT (id) DO NOTHING;

-- Inserir usuários na tabela usuarios
INSERT INTO usuarios (id, nome, email, tipo_usuario) VALUES
(
  '11111111-1111-1111-1111-111111111111',
  'João Silva',
  'motorista@demo.com',
  'motorista'
),
(
  '22222222-2222-2222-2222-222222222222',
  'Maria Santos',
  'investidor@demo.com',
  'investidor'
) ON CONFLICT (id) DO NOTHING;

-- Inserir perfil do motorista
INSERT INTO motoristas (id, cnh, telefone, data_nascimento, endereco) VALUES
(
  '11111111-1111-1111-1111-111111111111',
  '12345678901',
  '(11) 99999-9999',
  '1990-05-15',
  'Rua das Flores, 123 - São Paulo, SP'
) ON CONFLICT (id) DO NOTHING;

-- Inserir perfil do investidor
INSERT INTO investidores (id, cpf_cnpj, telefone, endereco) VALUES
(
  '22222222-2222-2222-2222-222222222222',
  '123.456.789-00',
  '(11) 88888-8888',
  'Av. Paulista, 1000 - São Paulo, SP'
) ON CONFLICT (id) DO NOTHING;

-- Inserir veículos do investidor
INSERT INTO veiculos (id, marca, modelo, ano, placa, renavam, chassi, cor, status, id_investidor) VALUES
(
  '33333333-3333-3333-3333-333333333333',
  'Toyota',
  'Corolla',
  2022,
  'ABC-1234',
  '12345678901',
  '9BWZZZ377VT004251',
  'Branco',
  'alugado',
  '22222222-2222-2222-2222-222222222222'
),
(
  '44444444-4444-4444-4444-444444444444',
  'Honda',
  'Civic',
  2021,
  'DEF-5678',
  '10987654321',
  '9BWZZZ377VT004252',
  'Prata',
  'disponivel',
  '22222222-2222-2222-2222-222222222222'
),
(
  '55555555-5555-5555-5555-555555555555',
  'Nissan',
  'Sentra',
  2023,
  'GHI-9012',
  '11223344556',
  '9BWZZZ377VT004253',
  'Preto',
  'disponivel',
  '22222222-2222-2222-2222-222222222222'
) ON CONFLICT (id) DO NOTHING;

-- Inserir algumas multas de exemplo
INSERT INTO multas (id, id_veiculo, id_motorista, data_multa, hora_multa, local_multa, descricao, valor, status) VALUES
(
  '66666666-6666-6666-6666-666666666666',
  '33333333-3333-3333-3333-333333333333',
  '11111111-1111-1111-1111-111111111111',
  '2024-11-15',
  '14:30:00',
  'Av. Paulista, 1500',
  'Excesso de velocidade',
  195.23,
  'pendente'
),
(
  '77777777-7777-7777-7777-777777777777',
  '33333333-3333-3333-3333-333333333333',
  '11111111-1111-1111-1111-111111111111',
  '2024-10-20',
  '09:15:00',
  'Rua Augusta, 800',
  'Estacionamento irregular',
  88.38,
  'pago'
) ON CONFLICT (id) DO NOTHING;

-- Inserir vistorias de exemplo
INSERT INTO vistorias (id, id_veiculo, data_vistoria, tipo_vistoria, observacoes, status) VALUES
(
  '88888888-8888-8888-8888-888888888888',
  '33333333-3333-3333-3333-333333333333',
  '2024-01-15',
  'entrada',
  'Veículo em excelente estado. Sem avarias.',
  'realizada'
),
(
  '99999999-9999-9999-9999-999999999999',
  '44444444-4444-4444-4444-444444444444',
  '2024-06-10',
  'periodica',
  'Revisão semestral. Tudo conforme.',
  'realizada'
) ON CONFLICT (id) DO NOTHING;

-- Inserir manutenções de exemplo
INSERT INTO manutencoes (id, id_veiculo, data_inicio, data_fim, tipo_manutencao, descricao, custo, oficina, status) VALUES
(
  'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
  '33333333-3333-3333-3333-333333333333',
  '2024-03-10',
  '2024-03-12',
  'preventiva',
  'Troca de óleo e filtros',
  280.00,
  'Auto Center Silva',
  'concluida'
),
(
  'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
  '44444444-4444-4444-4444-444444444444',
  '2024-08-05',
  '2024-08-07',
  'corretiva',
  'Reparo no sistema de freios',
  450.00,
  'Oficina do João',
  'concluida'
) ON CONFLICT (id) DO NOTHING;