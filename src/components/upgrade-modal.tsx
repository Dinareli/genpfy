import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Sparkles, Zap, Crown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface UpgradeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const plans = [
  {
    name: 'Free',
    icon: Sparkles,
    price: 'R$ 0',
    description: 'Para começar',
    features: ['3 prompts por mês', 'Recursos básicos', 'Suporte da comunidade'],
    popular: false,
    current: true,
  },
  {
    name: 'Pro',
    icon: Zap,
    price: 'R$ 29,90',
    description: 'Para criadores',
    features: ['Prompts ilimitados', 'Todos os recursos', 'Suporte prioritário', 'Atualizações exclusivas'],
    popular: true,
    current: false,
  },
  {
    name: 'Premium',
    icon: Crown,
    price: 'R$ 99,90',
    description: 'Para equipes',
    features: [
      'Tudo do Pro',
      'Múltiplos usuários',
      'API de acesso',
      'Consultoria especializada',
      'Suporte 24/7',
    ],
    popular: false,
    current: false,
  },
];

export function UpgradeModal({ open, onOpenChange }: UpgradeModalProps) {
  const handleViewPlans = () => {
    onOpenChange(false);
    // Scroll suave para a seção de planos
    setTimeout(() => {
      const plansSection = document.getElementById('planos');
      if (plansSection) {
        plansSection.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.location.href = '/#planos';
      }
    }, 100);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Você atingiu o limite do plano Free
          </DialogTitle>
          <DialogDescription className="text-center text-base">
            Faça upgrade para continuar criando prompts ilimitados e desbloquear recursos exclusivos
          </DialogDescription>
        </DialogHeader>

        <div className="grid md:grid-cols-3 gap-4 mt-6">
          {plans.map((plan) => {
            const Icon = plan.icon;
            return (
              <Card
                key={plan.name}
                className={`relative transition-all ${
                  plan.popular
                    ? 'border-primary shadow-lg shadow-primary/20 scale-105'
                    : 'border-border opacity-80'
                } ${plan.current ? 'opacity-60' : ''}`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary">
                    Recomendado
                  </Badge>
                )}
                {plan.current && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-muted text-muted-foreground">
                    Plano Atual
                  </Badge>
                )}
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-2 p-3 bg-primary/10 rounded-full w-fit">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    {plan.price !== 'R$ 0' && <span className="text-muted-foreground">/mês</span>}
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full"
                    variant={plan.popular ? 'default' : 'outline'}
                    disabled={plan.current}
                    onClick={handleViewPlans}
                  >
                    {plan.current ? 'Plano Atual' : 'Escolher Plano'}
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        <div className="flex justify-center gap-4 mt-6">
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Talvez depois
          </Button>
          <Button onClick={handleViewPlans}>Ver Todos os Planos</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
