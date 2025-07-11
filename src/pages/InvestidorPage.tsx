import { KPICard } from "@/components/KPICard";
import { DataTable } from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  DollarSign, 
  Car, 
  TrendingUp, 
  Users,
  Eye,
  BarChart3
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar
} from "recharts";

export const InvestidorPage = () => {
  // Mock data - substituir por dados reais da API
  const kpiData = [
    {
      icon: Car,
      title: "Carros na Frota",
      value: "12",
      trend: "up" as const,
      trendValue: "+2",
      subtitle: "2 novos este mês"
    },
    {
      icon: DollarSign,
      title: "Receita Mensal",
      value: "R$ 8.750",
      trend: "up" as const,
      trendValue: "+15%",
      subtitle: "Comparado ao mês anterior"
    },
    {
      icon: TrendingUp,
      title: "ROI Médio",
      value: "12.5%",
      trend: "up" as const,
      trendValue: "+1.2%",
      subtitle: "Retorno anual"
    },
    {
      icon: Users,
      title: "Motoristas Ativos",
      value: "10",
      trend: "neutral" as const,
      subtitle: "De 12 carros"
    }
  ];

  const rentedCarsData = [
    {
      id: 1,
      veiculo: "Toyota Corolla 2022",
      placa: "ABC-1234",
      motorista: "João Silva",
      dataInicio: "01/12/2024",
      dataTermino: "31/12/2024",
      valor: "R$ 850,00",
      status: "Ativo"
    },
    {
      id: 2,
      veiculo: "Honda Civic 2023",
      placa: "DEF-5678",
      motorista: "Maria Santos",
      dataInicio: "15/12/2024",
      dataTermino: "15/01/2025",
      valor: "R$ 900,00",
      status: "Ativo"
    },
    {
      id: 3,
      veiculo: "Hyundai HB20 2021",
      placa: "GHI-9012",
      motorista: "Carlos Oliveira",
      dataInicio: "10/12/2024",
      dataTermino: "10/01/2025",
      valor: "R$ 750,00",
      status: "Ativo"
    },
    {
      id: 4,
      veiculo: "Nissan Versa 2022",
      placa: "JKL-3456",
      motorista: "-",
      dataInicio: "-",
      dataTermino: "-",
      valor: "R$ 800,00",
      status: "Disponível"
    }
  ];

  const revenueData = [
    { mes: "Jan", receita: 7200 },
    { mes: "Fev", receita: 7800 },
    { mes: "Mar", receita: 8100 },
    { mes: "Abr", receita: 7500 },
    { mes: "Mai", receita: 8300 },
    { mes: "Jun", receita: 8600 },
    { mes: "Jul", receita: 8200 },
    { mes: "Ago", receita: 8900 },
    { mes: "Set", receita: 9100 },
    { mes: "Out", receita: 8800 },
    { mes: "Nov", receita: 9200 },
    { mes: "Dez", receita: 8750 }
  ];

  const carsColumns = [
    {
      key: "veiculo",
      label: "Veículo",
      sortable: true
    },
    {
      key: "placa",
      label: "Placa",
      sortable: true
    },
    {
      key: "motorista",
      label: "Motorista",
      sortable: true
    },
    {
      key: "dataInicio",
      label: "Início",
      sortable: true
    },
    {
      key: "dataTermino",
      label: "Término",
      sortable: true
    },
    {
      key: "valor",
      label: "Valor/Mês",
      sortable: true
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (value: string) => (
        <Badge 
          variant={value === "Ativo" ? "default" : "secondary"}
          className={value === "Ativo" ? "bg-success" : ""}
        >
          {value}
        </Badge>
      )
    },
    {
      key: "acoes",
      label: "Ações",
      sortable: false,
      render: (_: any, row: any) => (
        <Button size="sm" variant="outline">
          <Eye className="h-4 w-4 mr-1" />
          Detalhes
        </Button>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Dashboard do Investidor
          </h1>
          <p className="text-muted-foreground">
            Acompanhe o desempenho da sua frota e retorno do investimento
          </p>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {kpiData.map((kpi, index) => (
            <KPICard key={index} {...kpi} />
          ))}
        </div>

        {/* Gráfico de Receita */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5" />
              <span>Receita Mensal</span>
            </CardTitle>
            <CardDescription>
              Evolução da receita nos últimos 12 meses
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis 
                    dataKey="mes" 
                    className="fill-muted-foreground"
                  />
                  <YAxis 
                    className="fill-muted-foreground"
                    tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`}
                  />
                  <Tooltip 
                    formatter={(value) => [`R$ ${value}`, "Receita"]}
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px"
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="receita" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={3}
                    dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: "hsl(var(--primary))", strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Tabela de Carros Alugados */}
        <DataTable
          title="Frota de Veículos"
          columns={carsColumns}
          data={rentedCarsData}
          searchable={true}
          exportable={true}
        />
      </div>
    </div>
  );
};