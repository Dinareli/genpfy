import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  FolderOpen, 
  Search, 
  Calendar, 
  Eye, 
  Edit, 
  Trash2,
  Plus,
  Filter
} from "lucide-react"

interface Projeto {
  id: number
  nomeSaas: string
  tipo: string
  problema: string
  publicoAlvo: string
  descricao: string
  recursosEscolhidos: string[]
  estiloVisual: string
  corPrimaria: string
  corSecundaria: string
  fonte: string
  prompt: string
  criadoEm: string
}

export default function Projetos() {
  const [busca, setBusca] = useState("")
  const [filtroStatus, setFiltroStatus] = useState("todos")
  const [projetos, setProjetos] = useState<Projeto[]>([])

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("projetos") || "[]")
    setProjetos(data)
  }, [])

  const deletarProjeto = (id: number) => {
    const novos = projetos.filter(p => p.id !== id)
    setProjetos(novos)
    localStorage.setItem("projetos", JSON.stringify(novos))
  }

  const projetosFiltrados = projetos.filter(projeto => {
    const matchBusca = 
      projeto.nomeSaas.toLowerCase().includes(busca.toLowerCase()) ||
      (projeto.tipo || "").toLowerCase().includes(busca.toLowerCase())
    const matchStatus = filtroStatus === "todos" // futuramente pode usar status
    return matchBusca && matchStatus
  })

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center space-x-2 glass px-4 py-2 rounded-full">
              <FolderOpen className="w-4 h-4 text-secondary" />
              <span className="text-sm font-medium">Seus Projetos</span>
            </div>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-bold mb-6">
            Gerenciar
            <span className="gradient-hero bg-clip-text text-transparent"> Projetos</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Visualize, edite e gerencie todos os seus projetos SaaS criados com o GenpFy.
          </p>
        </div>

        {/* Barra de Ações */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 animate-slide-up">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar projetos..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="pl-10 input-focus"
            />
          </div>
          
          <div className="flex space-x-2">
            <Button variant="outline" className="btn-glass">
              <Filter className="w-4 h-4 mr-2" />
              Filtros
            </Button>
            
            <Button className="btn-hero" onClick={() => window.location.href="/CriarSaas"}>
              <Plus className="w-4 h-4 mr-2" />
              Novo Projeto
            </Button>
          </div>
        </div>

        {/* Estatísticas Rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="card-glass animate-fade-in">
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{projetos.length}</div>
              <div className="text-sm text-muted-foreground">Total de Projetos</div>
            </CardContent>
          </Card>
        </div>

        {/* Lista de Projetos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projetosFiltrados.map((projeto, index) => (
            <Card 
              key={projeto.id} 
              className="card-glass card-hover animate-slide-up" 
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: projeto.corPrimaria }}
                    />
                    <div>
                      <CardTitle className="text-lg">{projeto.nomeSaas}</CardTitle>
                      <p className="text-sm text-muted-foreground">{projeto.tipo}</p>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {projeto.problema}
                </p>
                
                <div className="flex flex-wrap gap-1">
                  {projeto.recursosEscolhidos?.map(recurso => (
                    <Badge key={recurso} variant="outline" className="text-xs">
                      {recurso}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex items-center justify-between pt-2 border-t border-border/50">
                  <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    <span>{new Date(projeto.criadoEm).toLocaleDateString('pt-BR')}</span>
                  </div>
                  
                  <div className="flex space-x-1">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-destructive hover:text-destructive"
                      onClick={() => deletarProjeto(projeto.id)}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {projetosFiltrados.length === 0 && (
          <div className="text-center py-12 animate-fade-in">
            <FolderOpen className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">Nenhum projeto encontrado</h3>
            <p className="text-muted-foreground mb-6">
              {busca ? "Tente ajustar os filtros de busca." : "Comece criando seu primeiro SaaS!"}
            </p>
            <Button className="btn-hero" onClick={() => window.location.href="/CriarSaas"}>
              <Plus className="w-4 h-4 mr-2" />
              Criar Primeiro Projeto
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
