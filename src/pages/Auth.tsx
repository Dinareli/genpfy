import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { supabase } from '@/integrations/supabase/client'
import { useAuth } from '@/hooks/useAuth'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function AuthPage() {
  const navigate = useNavigate()
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      navigate('/criar-saas')
    }
  }, [user, navigate])

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold gradient-hero bg-clip-text text-transparent mb-2">
            GenpFy
          </h1>
          <h2 className="text-2xl font-semibold text-foreground mb-2">
            Entre na sua conta
          </h2>
          <p className="text-muted-foreground">
            Acesse o gerador inteligente de prompts para SaaS
          </p>
        </div>

        <Card className="card-glass">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-lg">Login / Cadastro</CardTitle>
          </CardHeader>
          <CardContent>
            <Auth
              supabaseClient={supabase}
              appearance={{
                theme: ThemeSupa,
                variables: {
                  default: {
                    colors: {
                      brand: 'hsl(207 90% 49%)',
                      brandAccent: 'hsl(207 90% 42%)',
                      brandButtonText: 'white',
                      inputBackground: 'hsl(var(--background))',
                      inputText: 'hsl(var(--foreground))',
                      inputPlaceholder: 'hsl(var(--muted-foreground))',
                      messageText: 'hsl(var(--foreground))',
                      messageTextDanger: 'hsl(var(--destructive))',
                      anchorTextColor: 'hsl(207 90% 49%)',
                      dividerBackground: 'hsl(var(--border))',
                    },
                    space: {
                      inputPadding: '12px',
                      buttonPadding: '12px 16px',
                    },
                    borderWidths: {
                      buttonBorderWidth: '1px',
                      inputBorderWidth: '1px',
                    },
                    radii: {
                      borderRadiusButton: '8px',
                      buttonBorderRadius: '8px',
                      inputBorderRadius: '8px',
                    },
                  },
                },
                className: {
                  container: 'w-full',
                  button: 'btn-secondary transition-all duration-300',
                  input: 'input-focus',
                },
              }}
              redirectTo={`${window.location.origin}/criar-saas`}
              showLinks={true}
              view="sign_in"
              providers={["email"]}
              localization={{
                variables: {
                  sign_in: {
                    email_label: 'Email',
                    password_label: 'Senha',
                    email_input_placeholder: 'Seu email',
                    password_input_placeholder: 'Sua senha',
                    button_label: 'Entrar',
                    loading_button_label: 'Entrando...',
                    social_provider_text: 'Entrar com {{provider}}',
                    link_text: 'Já tem uma conta? Entre aqui',
                  },
                  sign_up: {
                    email_label: 'Email',
                    password_label: 'Senha',
                    email_input_placeholder: 'Seu email',
                    password_input_placeholder: 'Sua senha',
                    button_label: 'Cadastrar',
                    loading_button_label: 'Cadastrando...',
                    social_provider_text: 'Cadastrar com {{provider}}',
                    link_text: 'Não tem conta? Cadastre-se aqui',
                  },
                },
              }}
            />
          </CardContent>
        </Card>

        <div className="text-center text-sm text-muted-foreground">
          <p>
            Ao continuar, você concorda com nossos{' '}
            <a href="/terms" className="text-secondary hover:underline">
              Termos de Uso
            </a>{' '}
            e{' '}
            <a href="/privacy" className="text-secondary hover:underline">
              Política de Privacidade
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}