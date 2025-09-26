import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Zap, FolderOpen, TrendingUp } from "lucide-react"

const stats = [
  {
    title: "Prompts Criados",
    value: "12",
    change: "+20% este mês",
    icon: FileText,
    color: "text-primary"
  },
  {
    title: "SaaS Gerados",
    value: "8",
    change: "+5 esta semana",
    icon: Zap,
    color: "text-secondary"
  },
  {
    title: "Projetos Ativos",
    value: "4",
    change: "2 em desenvolvimento",
    icon: FolderOpen,
    color: "text-success"
  },
  {
    title: "Taxa de Sucesso",
    value: "95%",
    change: "+5% melhoria",
    icon: TrendingUp,
    color: "text-warning"
  }
]

export function DashboardStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="card-glass card-hover animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-2">{stat.value}</div>
            <p className="text-xs text-muted-foreground">
              {stat.change}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}