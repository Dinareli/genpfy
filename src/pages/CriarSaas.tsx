import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/hooks/use-toast"
import { 
  Sparkles, 
  Target, 
  Palette, 
  Zap, 
  Copy,
  Download,
  RefreshCw
} from "lucide-react"

const tiposSaas = [
  "E-commerce",
  "CRM",
  "Gestão de Projetos",
  "Marketing Digital",
  "Educacional",
  "Saúde",
  "Financeiro",
  "RH",
  "Imobiliário",
  "Outro"
]

const estilosVisuais = [
  "Minimalista",
  "Corporativo",
  "Moderno",
  "Criativo", 
  "Elegante",
  "Tech"
]

const coresPrimarias = [
  "#000000", "#1f2937", "#3b82f6", "#ef4444", 
  "#10b981", "#f59e0b", "#8b5cf6", "#ec4899"
]

const recursos = [
  "Autenticação de usuários",
  "Dashboard administrativo", 
  "Sistema de pagamentos",
  "Notificações em tempo real",
  "API REST",
  "Relatórios e analytics",
  "Chat/Suporte",
  "Integração com terceiros",
  "Modo escuro/claro",
  "PWA (Progressive Web App)"
]

export default function CriarSaas() {
  const [formData, setFormData] = useState({
    nomeSaas: "",
    problema: "",
    publicoAlvo: "",
    tipo: "",
    descricao: "",
    recursosEscolhidos: [] as string[],
    estiloVisual: "",
    corPrimaria: "#000000",
    corSecundaria: "#3b82f6",
    fonte: "Poppins"
  })

  const [promptGerado, setPromptGerado] = useState("")
  const [gerandoPrompt, setGerandoPrompt] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleRecursoToggle = (recurso: string) => {
    setFormData(prev => ({
      ...prev,
      recursosEscolhidos: prev.recursosEscolhidos.includes(recurso)
        ? prev.recursosEscolhidos.filter(r => r !== recurso)
        : [...prev.recursosEscolhidos, recurso]
    }))
  }

  const gerarPrompt = async () => {
    if (!formData.nomeSaas || !formData.problema || !formData.publicoAlvo) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha nome, problema e público-alvo para continuar.",
        variant: "destructive"
      })
      return
    }

    setGerandoPrompt(true)
    
    // Simular geração de prompt
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const prompt = `🚀 STRATEGIC BUILDIFY MENTOR AI PROMPT V2.0

Você é um especialista em criar SaaS funcionais usando React, TypeScript e Tailwind CSS na plataforma Lovable.

📌 INFORMAÇÕES DO PROJETO:
Nome: ${formData.nomeSaas}
Problema Resolvido: ${formData.problema}
Público-Alvo: ${formData.publicoAlvo}
Tipo: ${formData.tipo || "Não especificado"}

⚙️ RECURSOS PRINCIPAIS:
${formData.recursosEscolhidos.length > 0 
  ? formData.recursosEscolhidos.map(r => `• ${r}`).join('\n')
  : '• Dashboard principal\n• Sistema de usuários\n• Interface responsiva'}

📝 DESCRIÇÃO DETALHADA:
${formData.descricao || "Criar uma aplicação SaaS moderna e funcional que resolva o problema especificado."}

🎨 DESIGN PERSONALIZADO:
• Estilo Visual: ${formData.estiloVisual || "Moderno"}
• Cor Primária: ${formData.corPrimaria}
• Cor Secundária: ${formData.corSecundaria}
• Fonte: ${formData.fonte}

📱 ESPECIFICAÇÕES TÉCNICAS:
• Design 100% responsivo (mobile-first)
• Componentes com glassmorphism sutil
• Animações micro-interativas
• Estados de carregamento e feedback visual
• Validação em tempo real
• Tratamento de erros amigável

🎯 ARQUITETURA SUGERIDA:
• Página principal com hero section clara
• Área centralizada de formulários/entrada
• Seção de resultados visualmente destacada
• Navegação intuitiva e acessível
• CTAs estrategicamente posicionados

🔧 INSTRUÇÕES ESPECÍFICAS:
1. Implementar TODOS os recursos listados
2. Usar componentes shadcn/ui quando possível
3. Manter código limpo, comentado e estruturado
4. Focar na experiência do usuário (UX)
5. Aplicar estilo visual "${formData.estiloVisual || "Moderno"}" consistentemente
6. Usar cores personalizadas harmoniosamente
7. Testar responsividade em diferentes tamanhos
8. Adicionar micro-animações para melhorar interação

💡 DICA FINAL: Este prompt foi gerado pelo GenpFy considerando personalização visual completa, análise de público-alvo e melhores práticas de UX/UI para maximizar conversão e engajamento do seu SaaS.

Crie um MVP completo, funcional e estrategicamente otimizado seguindo estas especificações detalhadas.`

    setPromptGerado(prompt)
    setGerandoPrompt(false)
    
    toast({
      title: "Prompt gerado com sucesso!",
      description: "Seu prompt personalizado está pronto para uso.",
    })
  }

  const copiarPrompt = () => {
    navigator.clipboard.writeText(promptGerado)
    toast({
      title: "Copiado!",
      description: "Prompt copiado para a área de transferência.",
    })
  }

  const baixarPrompt = () => {
    const blob = new Blob([promptGerado], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `prompt-${formData.nomeSaas.toLowerCase().replace(/\s+/g, '-')}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    
    toast({
      title: "Download iniciado!",
      description: "Arquivo de prompt baixado com sucesso.",
    })
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center space-x-2 glass px-4 py-2 rounded-full">
              <Sparkles className="w-4 h-4 text-secondary" />
              <span className="text-sm font-medium">Criador Inteligente</span>
            </div>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-bold mb-6">
            Crie seu
            <span className="gradient-hero bg-clip-text text-transparent"> SaaS Perfeito</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Responda algumas perguntas e receba um prompt completo e otimizado para criar seu SaaS no Lovable.dev.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulário */}
          <div className="lg:col-span-2 space-y-6">
            {/* Informações Básicas */}
            <Card className="card-glass animate-slide-up">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="w-5 h-5 text-primary" />
                  <span>Informações Básicas</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="nome">Nome do SaaS *</Label>
                  <Input
                    id="nome"
                    placeholder="Ex: TaskMaster Pro"
                    value={formData.nomeSaas}
                    onChange={(e) => handleInputChange("nomeSaas", e.target.value)}
                    className="input-focus"
                  />
                </div>
                
                <div>
                  <Label htmlFor="problema">Problema que resolve *</Label>
                  <Textarea
                    id="problema"
                    placeholder="Descreva o problema principal que seu SaaS irá resolver..."
                    value={formData.problema}
                    onChange={(e) => handleInputChange("problema", e.target.value)}
                    className="input-focus min-h-[100px]"
                  />
                </div>
                
                <div>
                  <Label htmlFor="publico">Público-alvo *</Label>
                  <Input
                    id="publico"
                    placeholder="Ex: freelancers, pequenas empresas, desenvolvedores"
                    value={formData.publicoAlvo}
                    onChange={(e) => handleInputChange("publicoAlvo", e.target.value)}
                    className="input-focus"
                  />
                </div>
                
                <div>
                  <Label htmlFor="tipo">Tipo de SaaS</Label>
                  <Select onValueChange={(value) => handleInputChange("tipo", value)}>
                    <SelectTrigger className="input-focus">
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      {tiposSaas.map(tipo => (
                        <SelectItem key={tipo} value={tipo}>{tipo}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="descricao">Descrição detalhada (opcional)</Label>
                  <Textarea
                    id="descricao"
                    placeholder="Descreva funcionalidades específicas, fluxos de usuário, ou requisitos especiais..."
                    value={formData.descricao}
                    onChange={(e) => handleInputChange("descricao", e.target.value)}
                    className="input-focus min-h-[120px]"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Recursos e Funcionalidades */}
            <Card className="card-glass animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="w-5 h-5 text-secondary" />
                  <span>Recursos e Funcionalidades</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {recursos.map(recurso => (
                    <div key={recurso} className="flex items-center space-x-2">
                      <Checkbox
                        id={recurso}
                        checked={formData.recursosEscolhidos.includes(recurso)}
                        onCheckedChange={() => handleRecursoToggle(recurso)}
                      />
                      <Label htmlFor={recurso} className="text-sm cursor-pointer">
                        {recurso}
                      </Label>
                    </div>
                  ))}
                </div>
                
                {formData.recursosEscolhidos.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-border/50">
                    <Label className="text-sm font-medium">Recursos selecionados:</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {formData.recursosEscolhidos.map(recurso => (
                        <Badge key={recurso} variant="secondary" className="text-xs">
                          {recurso}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Design e Estilo */}
            <Card className="card-glass animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Palette className="w-5 h-5 text-accent-foreground" />
                  <span>Design e Personalização</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Estilo Visual</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                    {estilosVisuais.map(estilo => (
                      <Button
                        key={estilo}
                        variant={formData.estiloVisual === estilo ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleInputChange("estiloVisual", estilo)}
                        className="text-sm"
                      >
                        {estilo}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <Separator />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Cor Primária</Label>
                    <div className="flex space-x-2 mt-2">
                      {coresPrimarias.map(cor => (
                        <button
                          key={cor}
                          className={`w-8 h-8 rounded-md border-2 transition-all ${
                            formData.corPrimaria === cor ? 'border-foreground scale-110' : 'border-border'
                          }`}
                          style={{ backgroundColor: cor }}
                          onClick={() => handleInputChange("corPrimaria", cor)}
                        />
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <Label>Cor Secundária</Label>
                    <div className="flex space-x-2 mt-2">
                      {coresPrimarias.map(cor => (
                        <button
                          key={cor}
                          className={`w-8 h-8 rounded-md border-2 transition-all ${
                            formData.corSecundaria === cor ? 'border-foreground scale-110' : 'border-border'
                          }`}
                          style={{ backgroundColor: cor }}
                          onClick={() => handleInputChange("corSecundaria", cor)}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Painel de Geração */}
          <div className="space-y-6">
            <Card className="card-glass animate-slide-up sticky top-24" style={{ animationDelay: '0.3s' }}>
              <CardHeader>
                <CardTitle>Gerar Prompt</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  onClick={gerarPrompt}
                  disabled={gerandoPrompt || !formData.nomeSaas || !formData.problema || !formData.publicoAlvo}
                  className="btn-hero w-full"
                >
                  {gerandoPrompt ? (
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Sparkles className="w-4 h-4 mr-2" />
                  )}
                  {gerandoPrompt ? "Gerando..." : "Gerar Prompt"}
                </Button>
                
                {promptGerado && (
                  <div className="space-y-3">
                    <Separator />
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={copiarPrompt} className="flex-1">
                        <Copy className="w-4 h-4 mr-2" />
                        Copiar
                      </Button>
                      <Button variant="outline" size="sm" onClick={baixarPrompt} className="flex-1">
                        <Download className="w-4 h-4 mr-2" />
                        Baixar
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
            
            {promptGerado && (
              <Card className="card-glass animate-fade-in">
                <CardHeader>
                  <CardTitle className="text-lg">Prompt Gerado</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted/50 rounded-lg p-4 max-h-96 overflow-y-auto">
                    <pre className="text-sm whitespace-pre-wrap text-muted-foreground">
                      {promptGerado}
                    </pre>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}