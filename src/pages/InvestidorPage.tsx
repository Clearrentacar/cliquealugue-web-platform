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
} from "recharts";
import { useInvestidorData } from "@/hooks/useInvestidorData";
import { useAuth } from "@/contexts/AuthContext";

export const InvestidorPage = () => {
  const { user } = useAuth();
  const { investidor, veiculos, carrosAlugados, receitaMensal, kpiData, loading } = useInvestidorData();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg font-semibold text-foreground mb-2">
            Carregando dados...
          </div>
          <div className="text-muted-foreground">
            Aguarde enquanto buscamos suas informações
          </div>
        </div>
      </div>
    );
  }

  const kpiDataWithIcons = kpiData.map((kpi, index) => ({
    ...kpi,
    icon: [Car, Users, DollarSign, TrendingUp][index]
  }));

  const carsColumns = [
    {
      key: "veiculo",
      label: "Veículo",
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
          {kpiDataWithIcons.map((kpi, index) => (
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
                <LineChart data={receitaMensal}>
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
                    dataKey="valor" 
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
          data={carrosAlugados}
          searchable={true}
          exportable={true}
        />
      </div>
    </div>
  );
};