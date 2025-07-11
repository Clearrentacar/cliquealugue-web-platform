import { useState, useEffect } from 'react';
import { supabase, Investidor, Veiculo } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

export const useInvestidorData = () => {
  const { user } = useAuth();
  const [investidor, setInvestidor] = useState<Investidor | null>(null);
  const [veiculos, setVeiculos] = useState<Veiculo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchInvestidorData();
    }
  }, [user]);

  const fetchInvestidorData = async () => {
    if (!user) return;

    try {
      setLoading(true);

      // Buscar dados do investidor
      const { data: investidorData } = await supabase
        .from('investidores')
        .select('*')
        .eq('id', user.id)
        .single();

      if (investidorData) {
        setInvestidor(investidorData);

        // Buscar veículos do investidor
        const { data: veiculosData } = await supabase
          .from('veiculos')
          .select('*')
          .eq('id_investidor', user.id);

        if (veiculosData) {
          setVeiculos(veiculosData);
        }
      }

    } catch (error) {
      console.error('Erro ao buscar dados do investidor:', error);
    } finally {
      setLoading(false);
    }
  };

  // Dados mockados para a tabela de carros alugados
  const carrosAlugados = [
    {
      id: 1,
      veiculo: "Toyota Corolla 2022",
      motorista: "João Silva",
      dataInicio: "01/12/2024",
      dataTermino: "31/12/2024",
      valor: "R$ 2.550,00",
      status: "Ativo"
    },
    {
      id: 2,
      veiculo: "Honda Civic 2021",
      motorista: "Maria Santos",
      dataInicio: "15/11/2024",
      dataTermino: "15/01/2025",
      valor: "R$ 2.400,00",
      status: "Ativo"
    },
    {
      id: 3,
      veiculo: "Nissan Sentra 2023",
      motorista: "Pedro Oliveira",
      dataInicio: "01/11/2024",
      dataTermino: "30/11/2024",
      valor: "R$ 2.700,00",
      status: "Finalizado"
    }
  ];

  // Dados mockados para receita mensal
  const receitaMensal = [
    { mes: "Jan", valor: 4500 },
    { mes: "Fev", valor: 5200 },
    { mes: "Mar", valor: 4800 },
    { mes: "Abr", valor: 5500 },
    { mes: "Mai", valor: 6200 },
    { mes: "Jun", valor: 5800 },
    { mes: "Jul", valor: 6500 },
    { mes: "Ago", valor: 7200 },
    { mes: "Set", valor: 6800 },
    { mes: "Out", valor: 7500 },
    { mes: "Nov", valor: 8200 },
    { mes: "Dez", valor: 7800 }
  ];

  // KPIs calculados
  const kpiData = [
    {
      title: "Total de Carros",
      value: veiculos.length.toString(),
      trend: "neutral" as const,
      subtitle: "Frota total"
    },
    {
      title: "Carros Alugados",
      value: carrosAlugados.filter(c => c.status === "Ativo").length.toString(),
      trend: "up" as const,
      trendValue: "+2",
      subtitle: "Ativos este mês"
    },
    {
      title: "Receita Mensal",
      value: "R$ 15.650",
      trend: "up" as const,
      trendValue: "+8%",
      subtitle: "Dezembro 2024"
    },
    {
      title: "Receita Anual",
      value: "R$ 168.750",
      trend: "up" as const,
      trendValue: "+15%",
      subtitle: "2024"
    }
  ];

  return {
    investidor,
    veiculos,
    carrosAlugados,
    receitaMensal,
    kpiData,
    loading,
    refetch: fetchInvestidorData
  };
};