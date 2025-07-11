import { Button } from "@/components/ui/button";
import { FeatureCard } from "@/components/FeatureCard";
import { 
  Car, 
  TrendingUp, 
  Shield, 
  Clock, 
  DollarSign, 
  Users,
  CheckCircle,
  Star,
  Calendar
} from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-image.jpg";

export const LandingPage = () => {
  const features = [
    {
      icon: TrendingUp,
      title: "Rastreamento em Tempo Real",
      description: "Monitore seus veículos 24/7 com GPS e relatórios detalhados de uso e localização."
    },
    {
      icon: DollarSign,
      title: "Relatórios Financeiros",
      description: "Acompanhe receitas, despesas e rentabilidade com dashboards intuitivos."
    },
    {
      icon: Shield,
      title: "Segurança Garantida",
      description: "Verificação completa de motoristas e cobertura de seguro para todos os veículos."
    },
    {
      icon: Clock,
      title: "Gestão Automatizada",
      description: "Contratos, pagamentos e manutenção gerenciados automaticamente."
    }
  ];

  const testimonials = [
    {
      name: "João Silva",
      role: "Motorista de App",
      content: "Com o CliqueAlugue consegui trabalhar sem me preocupar com financiamento. Excelente plataforma!",
      rating: 5
    },
    {
      name: "Maria Santos",
      role: "Investidora",
      content: "Retorno consistente e transparente. Melhor investimento que já fiz no setor automotivo.",
      rating: 5
    },
    {
      name: "Carlos Oliveira",
      role: "Motorista Uber",
      content: "Processo simples e rápido. Em uma semana já estava trabalhando com meu carro.",
      rating: 5
    }
  ];

  const partners = [
    "Uber", "99", "iFood", "Loggi", "Rappi"
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-gradient-hero overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto animate-fade-in">
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Conectamos <span className="text-primary-glow">Motoristas</span> e{" "}
              <span className="text-primary-glow">Investidores</span>
            </h1>
            <p className="text-xl lg:text-2xl text-white/90 mb-8 leading-relaxed">
              A maior plataforma de aluguel de veículos do Brasil. 
              Seja um motorista ou invista em nossa frota inteligente.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <a href="https://wa.me/5511999999999?text=Gostaria de falar com um especialista sobre CliqueAlugue">
                <Button variant="hero" size="xl" className="w-full sm:w-auto">
                  <Users className="h-5 w-5 mr-2" />
                  Fale com um Especialista
                </Button>
              </a>
              
              <a href="https://wa.me/5511999999999?text=Gostaria de agendar uma demonstração do CliqueAlugue">
                <Button variant="outline" size="xl" className="w-full sm:w-auto bg-white/10 border-white/20 text-white hover:bg-white/20">
                  <Calendar className="h-5 w-5 mr-2" />
                  Agende Demonstração
                </Button>
              </a>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full animate-float"></div>
        <div className="absolute bottom-20 right-10 w-16 h-16 bg-white/10 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Por que escolher o CliqueAlugue?
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Oferecemos a melhor experiência tanto para motoristas quanto para investidores, 
              com tecnologia de ponta e suporte especializado.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <div key={index} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <FeatureCard {...feature} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              O que nossos usuários dizem
            </h2>
            <p className="text-lg text-muted-foreground">
              Mais de 10.000 motoristas e investidores confiam em nossa plataforma
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-card rounded-lg p-6 shadow-soft border border-border">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-warning fill-current" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic">"{testimonial.content}"</p>
                <div className="border-t border-border pt-4">
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-xl font-semibold text-foreground mb-4">
              Nossos motoristas trabalham com as principais plataformas
            </h3>
          </div>
          
          <div className="flex flex-wrap items-center justify-center space-x-8 lg:space-x-12">
            {partners.map((partner, index) => (
              <div key={index} className="text-2xl font-bold text-muted-foreground hover:text-primary transition-colors">
                {partner}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Pronto para começar?
          </h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Junte-se a milhares de motoristas e investidores que já fazem parte da nossa comunidade.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link to="/motorista">
              <Button variant="outline" size="xl" className="bg-white text-primary hover:bg-white/90">
                <Car className="h-5 w-5 mr-2" />
                Sou Motorista
              </Button>
            </Link>
            
            <Link to="/investidor">
              <Button variant="outline" size="xl" className="bg-white text-primary hover:bg-white/90">
                <TrendingUp className="h-5 w-5 mr-2" />
                Quero Investir
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};