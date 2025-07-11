import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const FeatureCard = ({ icon: Icon, title, description }: FeatureCardProps) => {
  return (
    <div className="group relative p-6 bg-gradient-card rounded-lg border border-border shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-center space-x-4">
        <div className="flex items-center justify-center w-12 h-12 bg-gradient-primary rounded-lg shadow-soft group-hover:animate-pulse-glow">
          <Icon className="h-6 w-6 text-primary-foreground" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
};