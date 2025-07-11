import { useState, useEffect } from 'react';
import { supabase, Motorista, Veiculo, Multa } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

export const useMotoristaData = () => {
  const { user } = useAuth();
  const [motorista, setMotorista] = useState<Motorista | null>(null);
  const [veiculoAtual, setVeiculoAtual] = useState<Veiculo | null>(null);
  const [pagamentos, setPagamentos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchMotoristaData();
    }
  }, [user]);

  const fetchMotoristaData = async () => {
    if (!user) return;

    try {
      setLoading(true);

      // Buscar dados do motorista
      const { data: motoristaData } = await supabase
        .from('motoristas')
        .select('*')
        .eq('id', user.id)
        .single();

      if (motoristaData) {
        setMotorista(motoristaData);
      }

      // Simular dados de pagamentos (implementar quando houver tabela de contratos/pagamentos)
      const mockPagamentos = [
        {
          id: 1,
          data: "15/12/2024",
          valor: "R$ 850,00",
          status: "Pago",
          tipo: "Diária",
          periodo: "01-15/12/2024"
        },
        {
          id: 2,
          data: "01/12/2024",
          valor: "R$ 850,00",
          status: "Pago",
          tipo: "Diária",
          periodo: "16-30/11/2024"
        },
        {
          id: 3,
          data: "01/01/2025",
          valor: "R$ 850,00",
          status: "Pendente",
          tipo: "Diária",
          periodo: "16-31/12/2024"
        }
      ];

      setPagamentos(mockPagamentos);

      // Simular veículo atual (implementar quando houver tabela de contratos)
      const mockVeiculo = {
        id: '1',
        marca: 'Toyota',
        modelo: 'Corolla 2022',
        placa: 'ABC-1234',
        status: 'alugado',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        ano: 2022,
        renavam: null,
        chassi: null,
        cor: 'Branco',
        localizacao: null,
        id_investidor: null
      };

      setVeiculoAtual(mockVeiculo);

    } catch (error) {
      console.error('Erro ao buscar dados do motorista:', error);
    } finally {
      setLoading(false);
    }
  };

  // KPIs calculados
  const kpiData = [
    {
      title: "Ganhos este mês",
      value: "R$ 4.250",
      trend: "up" as const,
      trendValue: "+12%",
      subtitle: "Comparado ao mês anterior"
    },
    {
      title: "Dias trabalhados",
      value: "22",
      trend: "neutral" as const,
      subtitle: "Neste mês"
    },
    {
      title: "Média diária",
      value: "R$ 193",
      trend: "up" as const,
      trendValue: "+8%",
      subtitle: "Últimos 30 dias"
    },
    {
      title: "Horas rodadas",
      value: "176h",
      trend: "up" as const,
      trendValue: "+5%",
      subtitle: "Este mês"
    }
  ];

  return {
    motorista,
    veiculoAtual,
    pagamentos,
    kpiData,
    loading,
    refetch: fetchMotoristaData
  };
};