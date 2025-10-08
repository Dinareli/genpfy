import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";

export interface Project {
  id: string;
  user_id: string | null;
  nomesaas: string;
  problema: string;
  publicoalvo: string;
  tipo: string | null;
  descricao: string | null;
  recursosescolhidos: string[] | null;
  estilovisual: string | null;
  corprimaria: string | null;
  corsecundaria: string | null;
  fonte: string | null;
  prompt: string | null;
  criadoem: string | null;
}

export interface CreateProjectData {
  nomeSaas: string;
  problema: string;
  publicoAlvo: string;
  tipo?: string;
  descricao?: string;
  recursosEscolhidos: string[];
  estiloVisual?: string;
  corPrimaria?: string;
  corSecundaria?: string;
  fonte?: string;
  prompt: string;
}

export function useProjects() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Buscar projetos do usuário
  const {
    data: projects,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["projects", user?.id],
    queryFn: async () => {
      if (!user?.id) return [];

      const { data, error } = await (supabase as any)
        .from("projects")
        .select("*")
        .eq("user_id", user.id)
        .order("criadoem", { ascending: false });

      if (error) throw error;
      return data as Project[];
    },
    enabled: !!user?.id,
  });

  // Criar novo projeto
  const createProject = useMutation({
    mutationFn: async (projectData: CreateProjectData) => {
      if (!user?.id) {
        throw new Error("Usuário não autenticado");
      }

      const { data, error } = await (supabase as any)
        .from("projects")
        .insert([
          {
            user_id: user.id,
            nomesaas: projectData.nomeSaas,
            problema: projectData.problema,
            publicoalvo: projectData.publicoAlvo,
            tipo: projectData.tipo || null,
            descricao: projectData.descricao || null,
            recursosescolhidos: projectData.recursosEscolhidos,
            estilovisual: projectData.estiloVisual || null,
            corprimaria: projectData.corPrimaria || null,
            corsecundaria: projectData.corSecundaria || null,
            fonte: projectData.fonte || null,
            prompt: projectData.prompt,
          },
        ])
        .select()
        .single();

      if (error) throw error;
      return data as Project;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast({
        title: "Projeto salvo!",
        description: `O projeto "${data?.nomesaas}" foi salvo com sucesso.`,
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Erro ao salvar projeto",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Deletar projeto
  const deleteProject = useMutation({
    mutationFn: async (projectId: string) => {
      if (!user?.id) {
        throw new Error("Usuário não autenticado");
      }

      const { error } = await (supabase as any)
        .from("projects")
        .delete()
        .eq("id", projectId)
        .eq("user_id", user.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast({
        title: "Projeto deletado",
        description: "O projeto foi removido com sucesso.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Erro ao deletar projeto",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return {
    projects: projects || [],
    isLoading,
    error,
    createProject: createProject.mutate,
    isCreating: createProject.isPending,
    deleteProject: deleteProject.mutate,
    isDeleting: deleteProject.isPending,
  };
}
