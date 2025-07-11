import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Car, Eye, EyeOff, Mail, Lock, User, UserPlus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { useToast } from "@/components/ui/use-toast";
export const LoginPage = () => {
  // Login state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  // Register state
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [registerUserType, setRegisterUserType] = useState<'motorista' | 'investidor'>('motorista');
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  
  const navigate = useNavigate();
  const { login, register, loading: isLoading, userData } = useAuth();
  const { toast } = useToast();

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
      console.error("Login error:", error); // Log para depuração
      toast({
        title: "Erro no login",
        description: "Verifique suas credenciais.",
        variant: "destructive",
      });

    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail(registerEmail)) {
      return;
    }

    if (!validatePassword(registerPassword)) {
      return;
    }

    if (!registerName.trim()) {
      return;
    }

    try {
      await register(registerEmail, registerPassword, registerName, registerUserType);
      // Após registro bem-sucedido, redirecionar para a área apropriada
      setTimeout(() => {
        if (registerUserType === "investidor") {
          navigate("/investidor");
        } else {
          navigate("/motorista");
        }
      }, 100);
    } catch (error) {
      // Erro já tratado no contexto
    }
  };

  const fillDemoCredentials = (type: 'motorista' | 'investidor') => {
    if (type === 'motorista') {
      setEmail('motorista@demo.com');
      setPassword('demo123');
    } else {
      setEmail('investidor@demo.com');
      setPassword('demo123');
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
          <CardContent className="p-0">
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login" className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>Entrar</span>
                </TabsTrigger>
                <TabsTrigger value="register" className="flex items-center space-x-2">
                  <UserPlus className="h-4 w-4" />
                  <span>Cadastrar</span>
                </TabsTrigger>
              </TabsList>
              
              {/* Login Tab */}
              <TabsContent value="login" className="p-6">
                <div className="space-y-1 mb-6">
                  <h2 className="text-2xl font-bold text-center">
                    Entrar na sua conta
                  </h2>
                  <p className="text-center text-muted-foreground">
                    Digite seu email e senha para acessar sua conta
                  </p>
                </div>
                
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

                {/* Demo accounts */}
                <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm font-medium text-center mb-3">
                    Contas de demonstração:
                  </p>
                  <div className="space-y-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => fillDemoCredentials('motorista')}
                    >
                      🚗 Testar como Motorista
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => fillDemoCredentials('investidor')}
                    >
                      💰 Testar como Investidor
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              {/* Register Tab */}
              <TabsContent value="register" className="p-6">
                <div className="space-y-1 mb-6">
                  <h2 className="text-2xl font-bold text-center">
                    Criar nova conta
                  </h2>
                  <p className="text-center text-muted-foreground">
                    Preencha os dados para se cadastrar
                  </p>
                </div>
                
                <form onSubmit={handleRegister} className="space-y-4">
                  {/* Nome */}
                  <div className="space-y-2">
                    <Label htmlFor="register-name">Nome completo</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="register-name"
                        type="text"
                        placeholder="Seu nome completo"
                        value={registerName}
                        onChange={(e) => setRegisterName(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="register-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="register-email"
                        type="email"
                        placeholder="seu@email.com"
                        value={registerEmail}
                        onChange={(e) => setRegisterEmail(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div className="space-y-2">
                    <Label htmlFor="register-password">Senha</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="register-password"
                        type={showRegisterPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={registerPassword}
                        onChange={(e) => setRegisterPassword(e.target.value)}
                        className="pl-10 pr-10"
                        required
                        minLength={6}
                      />
                      <button
                        type="button"
                        onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showRegisterPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* User Type */}
                  <div className="space-y-2">
                    <Label htmlFor="user-type">Tipo de usuário</Label>
                    <Select value={registerUserType} onValueChange={(value: 'motorista' | 'investidor') => setRegisterUserType(value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo de usuário" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="motorista">🚗 Motorista</SelectItem>
                        <SelectItem value="investidor">💰 Investidor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full"
                    size="lg"
                    disabled={isLoading}
                  >
                    {isLoading ? "Criando conta..." : "Criar conta"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};