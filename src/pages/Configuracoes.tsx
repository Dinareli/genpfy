import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/hooks/use-toast"
import { ThemeToggle } from "@/components/theme-toggle"
import { useAuth } from "@/hooks/useAuth"
import { supabase } from "@/integrations/supabase/client"
import { 
  Settings, 
  User, 
  Bell, 
  Shield, 
  Palette,
  Save,
  Upload,
  LogOut,
  Crown,
  CreditCard
} from "lucide-react"

export default function Configuracoes() {
  const { user, signOut } = useAuth()
  const [userProfile, setUserProfile] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [configuracoes, setConfiguracoes] = useState({
    // Notificações
    emailNotificacoes: true,
    promptsCriados: true,
    novosRecursos: true,
    newsletters: false,
    
    // Preferências
    linguagem: "pt-BR",
    templatePadrao: "Minimalista",
    salvamentoAutomatico: true,
    
    // Privacidade
    perfilPublico: false,
    compartilharEstatisticas: true,
    analiseUso: true
  })

  useEffect(() => {
    if (user) {
      fetchUserProfile()
    }
  }, [user])

  const fetchUserProfile = async () => {
    if (!user?.id) return
    
    // Por enquanto, definir perfil padrão baseado no usuário
    // Pode ser melhorado quando as tabelas estiverem configuradas corretamente
    setUserProfile({ 
      id: user.id, 
      plan: 'free', 
      created_at: user.created_at || new Date().toISOString() 
    })
  }

  const handleConfigChange = (campo: string, valor: any) => {
    setConfiguracoes(prev => ({ ...prev, [campo]: valor }))
  }

  const salvarConfiguracoes = () => {
    // Simular salvamento
    toast({
      title: "Configurações salvas!",
      description: "Suas preferências foram atualizadas com sucesso.",
    })
  }

  const handleLogout = async () => {
    try {
      await signOut()
      toast({
        title: "Logout realizado!",
        description: "Você foi desconectado com sucesso.",
      })
    } catch (error) {
      toast({
        title: "Erro ao sair",
        description: "Ocorreu um erro ao fazer logout.",
        variant: "destructive",
      })
    }
  }

  const getPlanBadgeVariant = (plan: string) => {
    switch (plan) {
      case 'premium':
        return 'default'
      case 'pro':
        return 'secondary'
      default:
        return 'outline'
    }
  }

  const getPlanName = (plan: string) => {
    switch (plan) {
      case 'premium':
        return 'Premium'
      case 'pro':
        return 'Pro'
      default:
        return 'Free'
    }
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center space-x-2 glass px-4 py-2 rounded-full">
              <Settings className="w-4 h-4 text-secondary" />
              <span className="text-sm font-medium">Personalização</span>
            </div>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="gradient-hero bg-clip-text text-transparent">Configurações</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Personalize sua experiência no GenpFy de acordo com suas preferências.
          </p>
        </div>

        <div className="space-y-6">
          {/* Conta do Usuário */}
          <Card className="card-glass animate-slide-up">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="w-5 h-5 text-primary" />
                <span>Conta do Usuário</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={user?.user_metadata?.avatar_url} />
                    <AvatarFallback className="text-lg bg-gradient-primary text-primary-foreground">
                      {user?.email?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                      <h3 className="text-lg font-semibold">
                        {user?.user_metadata?.full_name || user?.email}
                      </h3>
                      <Badge variant={getPlanBadgeVariant(userProfile?.plan || 'free')}>
                        {userProfile?.plan === 'premium' && <Crown className="w-3 h-3 mr-1" />}
                        {getPlanName(userProfile?.plan || 'free')}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{user?.email}</p>
                    <p className="text-xs text-muted-foreground">
                      Provedor: {user?.app_metadata?.provider || 'email'}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="btn-glass w-full">
                    <CreditCard className="w-4 h-4 mr-2" />
                    Upgrade de Plano
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="btn-glass w-full"
                    onClick={handleLogout}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sair da Conta
                  </Button>
                </div>
              </div>
              
              <Separator />
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="p-4 bg-accent/50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">
                    {userProfile?.plan === 'free' ? '3' : '∞'}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Prompts por mês
                  </div>
                </div>
                <div className="p-4 bg-accent/50 rounded-lg">
                  <div className="text-2xl font-bold text-secondary">
                    {new Date(user?.created_at || '').toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' })}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Membro desde
                  </div>
                </div>
                <div className="p-4 bg-accent/50 rounded-lg">
                  <div className="text-2xl font-bold text-success">
                    Ativo
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Status da conta
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notificações */}
          <Card className="card-glass animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="w-5 h-5 text-secondary" />
                <span>Notificações</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base">Notificações por E-mail</Label>
                  <p className="text-sm text-muted-foreground">
                    Receba atualizações importantes por e-mail
                  </p>
                </div>
                <Switch
                  checked={configuracoes.emailNotificacoes}
                  onCheckedChange={(checked) => handleConfigChange("emailNotificacoes", checked)}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base">Prompts Criados</Label>
                  <p className="text-sm text-muted-foreground">
                    Notificar quando um prompt for gerado com sucesso
                  </p>
                </div>
                <Switch
                  checked={configuracoes.promptsCriados}
                  onCheckedChange={(checked) => handleConfigChange("promptsCriados", checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base">Novos Recursos</Label>
                  <p className="text-sm text-muted-foreground">
                    Fique por dentro das novidades da plataforma
                  </p>
                </div>
                <Switch
                  checked={configuracoes.novosRecursos}
                  onCheckedChange={(checked) => handleConfigChange("novosRecursos", checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base">Newsletter</Label>
                  <p className="text-sm text-muted-foreground">
                    Receba dicas e tendências sobre SaaS
                  </p>
                </div>
                <Switch
                  checked={configuracoes.newsletters}
                  onCheckedChange={(checked) => handleConfigChange("newsletters", checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Aparência */}
          <Card className="card-glass animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Palette className="w-5 h-5 text-accent-foreground" />
                <span>Aparência</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base">Tema</Label>
                  <p className="text-sm text-muted-foreground">
                    Alterne entre tema claro e escuro
                  </p>
                </div>
                <ThemeToggle />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base">Salvamento Automático</Label>
                  <p className="text-sm text-muted-foreground">
                    Salvar automaticamente enquanto você digita
                  </p>
                </div>
                <Switch
                  checked={configuracoes.salvamentoAutomatico}
                  onCheckedChange={(checked) => handleConfigChange("salvamentoAutomatico", checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Privacidade */}
          <Card className="card-glass animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-success" />
                <span>Privacidade e Dados</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base">Perfil Público</Label>
                  <p className="text-sm text-muted-foreground">
                    Permitir que outros usuários vejam seu perfil
                  </p>
                </div>
                <Switch
                  checked={configuracoes.perfilPublico}
                  onCheckedChange={(checked) => handleConfigChange("perfilPublico", checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base">Compartilhar Estatísticas</Label>
                  <p className="text-sm text-muted-foreground">
                    Ajudar a melhorar a plataforma compartilhando dados anônimos
                  </p>
                </div>
                <Switch
                  checked={configuracoes.compartilharEstatisticas}
                  onCheckedChange={(checked) => handleConfigChange("compartilharEstatisticas", checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base">Análise de Uso</Label>
                  <p className="text-sm text-muted-foreground">
                    Permitir análise de como você usa a plataforma
                  </p>
                </div>
                <Switch
                  checked={configuracoes.analiseUso}
                  onCheckedChange={(checked) => handleConfigChange("analiseUso", checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Botão Salvar */}
          <div className="flex justify-end animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <Button onClick={salvarConfiguracoes} className="btn-hero px-8">
              <Save className="w-4 h-4 mr-2" />
              Salvar Configurações
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}