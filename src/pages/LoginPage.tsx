import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Car, Eye, EyeOff, Mail, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login, loading: isLoading, userData } = useAuth();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 6;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail(email)) {
      return;
    }

    if (!validatePassword(password)) {
      return;
    }

    try {
      await login(email, password);
      
      // Aguardar userData ser carregado para redirecionar corretamente
      setTimeout(() => {
        if (userData?.tipo_usuario === "investidor") {
          navigate("/investidor");
        } else {
          navigate("/motorista");
        }
      }, 100);
    } catch (error) {
      // Erro já tratado no contexto
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-hero p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="flex items-center justify-center space-x-2 hover:scale-105 transition-transform">
            <Car className="h-10 w-10 text-white" />
            <span className="text-2xl font-bold text-white">
              CliqueAlugue
            </span>
          </Link>
        </div>

        <Card className="shadow-elevated border-0">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Entrar na sua conta
            </CardTitle>
            <CardDescription className="text-center">
              Digite seu email e senha para acessar sua conta
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Forgot Password */}
              <div className="text-right">
                <a
                  href="#forgot-password"
                  className="text-sm text-primary hover:underline"
                >
                  Esqueci minha senha
                </a>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? "Entrando..." : "Entrar"}
              </Button>
            </form>

            {/* Demo accounts info */}
            <div className="mt-6 p-4 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground text-center mb-2">
                <strong>Contas de demonstração:</strong>
              </p>
              <div className="text-xs text-muted-foreground space-y-1">
                <p>📧 motorista@demo.com - Área do Motorista</p>
                <p>📧 investidor@demo.com - Área do Investidor</p>
                <p>🔒 Senha: demo123</p>
              </div>
            </div>

            {/* Sign up link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Não tem uma conta?{" "}
                <a href="#signup" className="text-primary hover:underline font-medium">
                  Cadastre-se
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};