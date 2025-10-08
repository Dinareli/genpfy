import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from '@/hooks/use-toast';

interface PlanLimits {
  free: { prompts: number };
  pro: { prompts: number };
  premium: { prompts: number };
}

interface UserPlanData {
  plan: 'free' | 'pro' | 'premium';
  prompts_used_this_month: number;
  usage_month: string;
}

const PLAN_LIMITS: PlanLimits = {
  free: { prompts: 3 },
  pro: { prompts: Infinity },
  premium: { prompts: Infinity },
};

export function useUserPlan() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Buscar dados do plano do usuário
  const { data: userPlan, isLoading, error } = useQuery({
    queryKey: ['userPlan', user?.id],
    queryFn: async () => {
      if (!user?.id) return null;

      const { data, error } = await (supabase as any)
        .from('profiles')
        .select('plan, prompts_used_this_month, usage_month')
        .eq('id', user.id)
        .single();

      if (error) throw error;

      // Verificar se precisa resetar o contador (mudou de mês)
      const currentMonth = new Date().toISOString().slice(0, 7); // YYYY-MM
      if (data.usage_month !== currentMonth) {
        // Resetar contador automaticamente
        const { error: updateError } = await (supabase as any)
          .from('profiles')
          .update({
            prompts_used_this_month: 0,
            usage_month: currentMonth,
          })
          .eq('id', user.id);

        if (updateError) throw updateError;

        return {
          ...data,
          prompts_used_this_month: 0,
          usage_month: currentMonth,
        } as UserPlanData;
      }

      return data as UserPlanData;
    },
    enabled: !!user?.id,
  });

  // Mutation para incrementar uso
  const { mutate: incrementUsage } = useMutation({
    mutationFn: async () => {
      if (!user?.id || !userPlan) return;

      const { error } = await (supabase as any)
        .from('profiles')
        .update({
          prompts_used_this_month: userPlan.prompts_used_this_month + 1,
        })
        .eq('id', user.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userPlan', user?.id] });
    },
    onError: (error) => {
      console.error('Erro ao incrementar uso:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível registrar o uso do prompt.',
        variant: 'destructive',
      });
    },
  });

  // Calcular limites e disponibilidade
  const planLimit = userPlan ? PLAN_LIMITS[userPlan.plan].prompts : 0;
  const promptsUsed = userPlan?.prompts_used_this_month || 0;
  const canCreatePrompt = userPlan ? promptsUsed < planLimit : false;
  const promptsRemaining = Math.max(0, planLimit - promptsUsed);

  return {
    userPlan,
    isLoading,
    error,
    canCreatePrompt,
    promptsRemaining,
    promptsUsed,
    planLimit,
    incrementUsage,
  };
}
