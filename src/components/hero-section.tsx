import { ArrowRight, Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-bg.jpg";
import { Link } from "react-router-dom";

export function HeroSection() {
  return (
    <div className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
        style={{ backgroundImage: `url(${heroImage})` }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 gradient-hero opacity-5" />

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="animate-fade-in">
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center space-x-2 glass px-4 py-2 rounded-full">
              <Sparkles className="w-4 h-4 text-secondary" />
              <span className="text-sm font-medium">
                Revolucione sua criação de SaaS
              </span>
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
            Transforme suas
            <span className="gradient-hero bg-clip-text text-transparent block">
              ideias em SaaS
            </span>
            completos
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            Gere prompts detalhados e completos para criar aplicações SaaS
            incríveis no Lovable.dev. Simplifique o processo e acelere seu
            desenvolvimento.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/auth">
              <Button
                size="lg"
                className="btn-hero group px-8 py-4 text-lg"
                asChild
              >
                <span>
                  Começar Gratuitamente
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
            </Link>
            <a href="#planos" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="btn-glass px-8 py-4 text-lg w-full sm:w-auto"
                asChild
              >
                <span>
                  <Zap className="mr-2 h-5 w-5" />
                  Ver Planos
                </span>
              </Button>
            </a>
          </div>

          <div className="mt-16 flex items-center justify-center space-x-8 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
              <span>Gratuito para começar</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
              <span>Sem cartão de crédito</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-warning rounded-full animate-pulse" />
              <span>Resultados em minutos</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div
        className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl animate-bounce-in"
        style={{ animationDelay: "0.5s" }}
      />
      <div
        className="absolute bottom-20 right-10 w-32 h-32 bg-secondary/10 rounded-full blur-xl animate-bounce-in"
        style={{ animationDelay: "1s" }}
      />
      <div
        className="absolute top-1/2 left-1/4 w-16 h-16 bg-accent/20 rounded-full blur-lg animate-bounce-in"
        style={{ animationDelay: "1.5s" }}
      />
    </div>
  );
}
