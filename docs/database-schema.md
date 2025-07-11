# Schema do Banco de Dados - CliqueAlugue

## Visão Geral

O CliqueAlugue utiliza PostgreSQL com Supabase, implementando Row Level Security (RLS) para garantir que cada usuário acesse apenas os dados apropriados ao seu perfil.

## Estrutura das Tabelas

### 1. usuarios
Tabela principal que estende `auth.users` do Supabase.

```sql
CREATE TABLE usuarios (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  nome text,
  email text UNIQUE,
  tipo_usuario text CHECK (tipo_usuario IN ('motorista', 'investidor')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
```

### 2. motoristas
Perfil específico para motoristas.

```sql
CREATE TABLE motoristas (
  id uuid PRIMARY KEY REFERENCES usuarios(id),
  cnh text,
  telefone text,
  data_nascimento date,
  endereco text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
```

### 3. investidores
Perfil específico para investidores.

```sql
CREATE TABLE investidores (
  id uuid PRIMARY KEY REFERENCES usuarios(id),
  cpf_cnpj text,
  telefone text,
  endereco text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
```

### 4. veiculos
Frota de veículos dos investidores.

```sql
CREATE TABLE veiculos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  marca text,
  modelo text,
  ano integer,
  placa text UNIQUE,
  renavam text,
  chassi text,
  cor text,
  status text DEFAULT 'disponivel',
  localizacao text,
  id_investidor uuid REFERENCES investidores(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
```

### 5. multas
Registro de multas dos veículos.

```sql
CREATE TABLE multas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  id_veiculo uuid REFERENCES veiculos(id),
  id_motorista uuid REFERENCES motoristas(id),
  data_multa date,
  hora_multa time,
  local_multa text,
  descricao text,
  valor decimal(10,2),
  status text DEFAULT 'pendente',
  created_at timestamptz DEFAULT now()
);
```

### 6. vistorias
Histórico de vistorias dos veículos.

```sql
CREATE TABLE vistorias (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  id_veiculo uuid REFERENCES veiculos(id),
  data_vistoria date DEFAULT CURRENT_DATE,
  tipo_vistoria text,
  observacoes text,
  status text DEFAULT 'realizada',
  created_at timestamptz DEFAULT now()
);
```

### 7. manutencoes
Histórico de manutenções dos veículos.

```sql
CREATE TABLE manutencoes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  id_veiculo uuid REFERENCES veiculos(id),
  data_inicio date DEFAULT CURRENT_DATE,
  data_fim date,
  tipo_manutencao text,
  descricao text,
  custo decimal(10,2),
  oficina text,
  status text DEFAULT 'agendada',
  created_at timestamptz DEFAULT now()
);
```

## Políticas de Segurança (RLS)

### Usuários
- ✅ Podem ler/atualizar apenas seu próprio perfil
- ✅ Autenticação obrigatória

### Motoristas
- ✅ Apenas motoristas autenticados podem acessar seu perfil
- ✅ Verificação de `tipo_usuario = 'motorista'`

### Investidores
- ✅ Apenas investidores autenticados podem acessar seu perfil
- ✅ Verificação de `tipo_usuario = 'investidor'`

### Veículos
- ✅ Investidores: CRUD completo em seus veículos
- ✅ Todos: Leitura apenas de veículos disponíveis

### Multas
- ✅ Administradores: CRUD completo
- ✅ Motoristas: Leitura apenas de suas multas

### Vistorias e Manutenções
- ✅ Administradores: CRUD completo
- ✅ Investidores: Leitura de histórico de seus veículos
- ✅ Motoristas: Leitura de histórico de veículos que utilizaram

## Comandos para Deploy

```bash
# Aplicar migração
supabase migration up

# Aplicar seed (apenas desenvolvimento)
supabase db reset --linked

# Verificar status
supabase status
```

## Contas de Teste

### Motorista
- **Email:** motorista@demo.com
- **Senha:** demo123
- **Tipo:** motorista

### Investidor
- **Email:** investidor@demo.com
- **Senha:** demo123
- **Tipo:** investidor

## Relacionamentos

```
auth.users (Supabase Auth)
    ↓
usuarios (perfil base)
    ↓
motoristas / investidores (perfis específicos)
    ↓
veiculos (frota do investidor)
    ↓
multas, vistorias, manutencoes (histórico do veículo)
```