import { LucideIcon } from "lucide-react";

interface KPICardProps {
  icon: LucideIcon;
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
}

export const KPICard = ({ 
  icon: Icon, 
  title, 
  value, 
  subtitle, 
  trend = "neutral", 
  trendValue 
}: KPICardProps) => {
  const getTrendColor = () => {
    switch (trend) {
      case "up":
        return "text-success";
      case "down":
        return "text-destructive";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <div className="bg-gradient-card rounded-lg border border-border p-6 shadow-soft hover:shadow-medium transition-all duration-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-gradient-primary rounded-lg">
            <Icon className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold text-foreground">{value}</p>
          </div>
        </div>
        {trendValue && (
          <div className={`text-sm font-medium ${getTrendColor()}`}>
            {trendValue}
          </div>
        )}
      </div>
      {subtitle && (
        <p className="text-xs text-muted-foreground mt-2">{subtitle}</p>
      )}
    </div>
  );
};