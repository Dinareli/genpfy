import { DashboardStats } from "@/components/dashboard-stats"
import { HeroSection } from "@/components/hero-section"
import { FeaturesGrid } from "@/components/features-grid"

export default function Dashboard() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Seus Projetos em Números
            </h2>
            <p className="text-xl text-muted-foreground">
              Acompanhe seu progresso e veja o impacto dos seus SaaS criados.
            </p>
          </div>
          
          <DashboardStats />
        </div>
      </section>
      
      <FeaturesGrid />
    </div>
  )
}