import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Sparkles, 
  Zap, 
  Target, 
  FileText, 
  Settings, 
  TrendingUp,
  Shield,
  Clock,
  Users
} from "lucide-react"

const features = [
  {
    icon: Sparkles,
    title: "Criador de SaaS Inteligente",
    description: "Formulário guiado que coleta informações essenciais para gerar prompts precisos e detalhados."
  },
  {
    icon: Target,
    title: "Prompts Personalizados",
    description: "Cada prompt é único e adaptado ao seu projeto específico, garantindo resultados relevantes."
  },
  {
    icon: FileText,
    title: "Templates Otimizados",
    description: "Biblioteca de templates testados e otimizados para diferentes tipos de SaaS e mercados."
  },
  {
    icon: Zap,
    title: "Geração Instantânea",
    description: "Receba seus prompts completos em segundos, prontos para usar no Lovable.dev."
  },
  {
    icon: Settings,
    title: "Configurações Avançadas",
    description: "Personalize cores, fontes, estilos e funcionalidades específicas para seu projeto."
  },
  {
    icon: Clock,
    title: "Histórico de Projetos",
    description: "Acesse e gerencie todos os seus projetos criados em um dashboard centralizado."
  }
]

export function FeaturesGrid() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center space-x-2 glass px-4 py-2 rounded-full">
              <Zap className="w-4 h-4 text-secondary" />
              <span className="text-sm font-medium">Recursos Poderosos</span>
            </div>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Tudo que você precisa para
            <span className="gradient-hero bg-clip-text text-transparent block">
              criar SaaS incríveis
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Nossa plataforma oferece todas as ferramentas necessárias para transformar suas ideias em aplicações SaaS funcionais e profissionais.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="card-glass card-hover animate-slide-up border-0" 
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <CardTitle className="text-xl font-semibold">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}