import { useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { 
  Home, 
  Sparkles, 
  FolderOpen, 
  Settings, 
  Menu,
  X,
  LogIn,
  LogOut
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { useAuth } from "@/hooks/useAuth"
import { cn } from "@/lib/utils"

const publicNavigation = [
  { name: 'Início', href: '/', icon: Home },
]

const privateNavigation = [
  { name: 'Criar SaaS', href: '/criar-saas', icon: Sparkles },
  { name: 'Meus Projetos', href: '/projetos', icon: FolderOpen },
  { name: 'Configurações', href: '/configuracoes', icon: Settings },
]

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  
  const navigation = user ? privateNavigation : publicNavigation

  const handleAuthAction = async () => {
    if (user) {
      await signOut()
      navigate('/')
    } else {
      navigate('/auth')
    }
  }

  return (
    <nav className="sticky top-0 z-50 glass border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold gradient-hero bg-clip-text text-transparent">
                GenpFy
              </h1>
            </div>
            <div className="hidden md:ml-10 md:flex md:space-x-8">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }) =>
                    cn(
                      "inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors duration-200",
                      isActive
                        ? "text-primary border-b-2 border-primary"
                        : "text-muted-foreground hover:text-foreground hover:border-b-2 hover:border-muted-foreground/50"
                    )
                  }
                >
                  <item.icon className="w-4 h-4 mr-2" />
                  {item.name}
                </NavLink>
              ))}
            </div>
          </div>
          
          <div className="hidden md:flex md:items-center md:space-x-4">
            <ThemeToggle />
            <Button 
              variant="default" 
              className="btn-hero"
              onClick={handleAuthAction}
            >
              {user ? (
                <>
                  <LogOut className="w-4 h-4 mr-2" />
                  Sair
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4 mr-2" />
                  Entrar
                </>
              )}
            </Button>
          </div>

          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="glass"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden glass border-t border-border/50 animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    "flex items-center px-3 py-2 rounded-md text-base font-medium transition-colors duration-200",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  )
                }
                onClick={() => setMobileMenuOpen(false)}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.name}
              </NavLink>
            ))}
            <div className="pt-4 pb-3 border-t border-border/50">
              <Button 
                variant="default" 
                className="btn-hero w-full"
                onClick={handleAuthAction}
              >
                {user ? (
                  <>
                    <LogOut className="w-4 h-4 mr-2" />
                    Sair
                  </>
                ) : (
                  <>
                    <LogIn className="w-4 h-4 mr-2" />
                    Entrar
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}