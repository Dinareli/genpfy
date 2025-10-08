-- Adicionar colunas para controle de uso mensal de prompts
ALTER TABLE public.profiles 
ADD COLUMN prompts_used_this_month INTEGER DEFAULT 0 NOT NULL,
ADD COLUMN usage_month TEXT DEFAULT to_char(now(), 'YYYY-MM');

-- Criar função para resetar contador mensalmente
CREATE OR REPLACE FUNCTION public.reset_monthly_prompt_usage()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.profiles
  SET 
    prompts_used_this_month = 0,
    usage_month = to_char(now(), 'YYYY-MM')
  WHERE usage_month != to_char(now(), 'YYYY-MM');
END;
$$;

-- Comentários explicativos
COMMENT ON COLUMN public.profiles.prompts_used_this_month IS 'Quantidade de prompts criados no mês atual';
COMMENT ON COLUMN public.profiles.usage_month IS 'Mês/ano no formato YYYY-MM para controle de reset';