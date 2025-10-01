import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Free",
    description: "Perfeito para começar",
    price: "R$ 0",
    period: "/mês",
    features: [
      "3 prompts por mês",
      "Templates básicos",
      "Suporte por email",
      "Exportação em texto",
    ],
    buttonText: "Começar Agora",
    popular: false,
  },
  {
    name: "Pro",
    description: "Para usuários frequentes",
    price: "R$ 29",
    period: "/mês",
    features: [
      "Prompts ilimitados",
      "Templates premium",
      "Suporte prioritário",
      "Exportação múltiplos formatos",
      "Histórico completo",
      "Analytics avançado",
    ],
    buttonText: "Começar Agora",
    popular: true,
  },
  {
    name: "Premium",
    description: "Para profissionais e equipes",
    price: "R$ 79",
    period: "/mês",
    features: [
      "Tudo do Pro",
      "API de acesso",
      "White label",
      "Suporte 24/7",
      "Integrações personalizadas",
      "Consultoria mensal",
    ],
    buttonText: "Começar Agora",
    popular: false,
  },
];

export function PricingSection() {
  return (
    <section id="planos" className="py-24 px-4 md:px-6">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Planos e Preços</h2>
          <p className="text-xl text-muted-foreground">
            Escolha o plano ideal para suas necessidades
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative p-8 ${
                plan.popular ? "border-primary shadow-lg" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                    Mais Popular
                  </span>
                </div>
              )}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-muted-foreground mb-4">{plan.description}</p>
                <div className="flex justify-center items-baseline mb-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <Check className="text-primary mr-2 h-5 w-5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                className="w-full"
                variant={plan.popular ? "default" : "outline"}
              >
                {plan.buttonText}
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
