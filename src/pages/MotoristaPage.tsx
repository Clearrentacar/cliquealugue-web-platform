import { KPICard } from "@/components/KPICard";
import { DataTable } from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  DollarSign, 
  Calendar, 
  TrendingUp, 
  Clock,
  Download,
  Eye,
  FileText
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useMotoristaData } from "@/hooks/useMotoristaData";
import { useAuth } from "@/contexts/AuthContext";

export const MotoristaPage = () => {
  const { user } = useAuth();
  const { motorista, veiculoAtual, pagamentos, kpiData, loading } = useMotoristaData();

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
    icon: [DollarSign, Calendar, TrendingUp, Clock][index]
  }));

  const paymentColumns = [
    {
      key: "data",
      label: "Data",
      sortable: true
    },
    {
      key: "periodo",
      label: "Período",
      sortable: false
    },
    {
      key: "tipo",
      label: "Tipo",
      sortable: true
    },
    {
      key: "valor",
      label: "Valor",
      sortable: true
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (value: string) => (
        <Badge 
          variant={value === "Pago" ? "default" : "secondary"}
          className={value === "Pago" ? "bg-success" : ""}
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
        <div className="flex space-x-2">
          <Button size="sm" variant="outline">
            <Eye className="h-4 w-4 mr-1" />
            Ver
          </Button>
          {row.status === "Pago" && (
            <Button size="sm" variant="ghost">
              <Download className="h-4 w-4 mr-1" />
              PDF
            </Button>
          )}
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Dashboard do Motorista
          </h1>
          <p className="text-muted-foreground">
            Acompanhe seus ganhos, pagamentos e estatísticas de trabalho
          </p>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {kpiDataWithIcons.map((kpi, index) => (
            <KPICard key={index} {...kpi} />
          ))}
        </div>

        {/* Veículo Atual */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5" />
              <span>Veículo Atual</span>
            </CardTitle>
            <CardDescription>
              Informações do veículo que você está utilizando
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Modelo</p>
                <p className="text-foreground font-semibold">
                  {veiculoAtual ? `${veiculoAtual.marca} ${veiculoAtual.modelo}` : 'Nenhum veículo ativo'}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Placa</p>
                <p className="text-foreground font-semibold">
                  {veiculoAtual?.placa || 'N/A'}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Status</p>
                <Badge className="bg-success">Ativo</Badge>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Valor da Diária</p>
                <p className="text-foreground font-semibold">R$ 85,00</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Quilometragem</p>
                <p className="text-foreground font-semibold">45.231 km</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Próxima Revisão</p>
                <p className="text-foreground font-semibold">15/01/2025</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Histórico de Pagamentos */}
        <DataTable
          title="Histórico de Pagamentos"
          columns={paymentColumns}
          data={pagamentos}
          searchable={true}
          exportable={true}
        />
      </div>
    </div>
  );
};