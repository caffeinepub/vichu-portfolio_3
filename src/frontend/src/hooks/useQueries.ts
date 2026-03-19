import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Certificate, Contact, Profile, Project, Skill } from "../backend";
import { useActor } from "./useActor";

export function useProfile() {
  const { actor, isFetching } = useActor();
  return useQuery<Profile>({
    queryKey: ["profile"],
    queryFn: async () => {
      if (!actor)
        return { name: "", title: "", bio: "", profileImageId: undefined };
      return actor.getProfile();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useProjects() {
  const { actor, isFetching } = useActor();
  return useQuery<Project[]>({
    queryKey: ["projects"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getProjects();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSkills() {
  const { actor, isFetching } = useActor();
  return useQuery<Skill[]>({
    queryKey: ["skills"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getSkills();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCertificates() {
  const { actor, isFetching } = useActor();
  return useQuery<Certificate[]>({
    queryKey: ["certificates"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getCertificates();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useContact() {
  const { actor, isFetching } = useActor();
  return useQuery<Contact>({
    queryKey: ["contact"],
    queryFn: async () => {
      if (!actor)
        return { linkedin: "", email: "", instagram: "", telegram: "" };
      return actor.getContact();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useUpdateProfile() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation<void, Error, Profile>({
    mutationFn: (p) => {
      if (!actor) throw new Error("No actor");
      return actor.updateProfile(p);
    },
    onMutate: async (p) => {
      await qc.cancelQueries({ queryKey: ["profile"] });
      const prev = qc.getQueryData(["profile"]);
      qc.setQueryData(["profile"], p);
      return { prev };
    },
    onError: (_e, _v, ctx: any) => {
      if (ctx?.prev) qc.setQueryData(["profile"], ctx.prev);
    },
    onSettled: () => qc.invalidateQueries({ queryKey: ["profile"] }),
  });
}

export function useAddProject() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation<void, Error, Project>({
    mutationFn: (p) => {
      if (!actor) throw new Error("No actor");
      return actor.addProject(p);
    },
    onMutate: async (p) => {
      await qc.cancelQueries({ queryKey: ["projects"] });
      const prev = qc.getQueryData<Project[]>(["projects"]) ?? [];
      qc.setQueryData(["projects"], [...prev, p]);
      return { prev };
    },
    onError: (_e, _v, ctx: any) => {
      if (ctx?.prev) qc.setQueryData(["projects"], ctx.prev);
    },
    onSettled: () => qc.invalidateQueries({ queryKey: ["projects"] }),
  });
}

export function useUpdateProject() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation<void, Error, Project>({
    mutationFn: (p) => {
      if (!actor) throw new Error("No actor");
      return actor.updateProject(p);
    },
    onMutate: async (p) => {
      await qc.cancelQueries({ queryKey: ["projects"] });
      const prev = qc.getQueryData<Project[]>(["projects"]) ?? [];
      qc.setQueryData(
        ["projects"],
        prev.map((x) => (x.id === p.id ? p : x)),
      );
      return { prev };
    },
    onError: (_e, _v, ctx: any) => {
      if (ctx?.prev) qc.setQueryData(["projects"], ctx.prev);
    },
    onSettled: () => qc.invalidateQueries({ queryKey: ["projects"] }),
  });
}

export function useDeleteProject() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: (id) => {
      if (!actor) throw new Error("No actor");
      return actor.deleteProject(id);
    },
    onMutate: async (id) => {
      await qc.cancelQueries({ queryKey: ["projects"] });
      const prev = qc.getQueryData<Project[]>(["projects"]) ?? [];
      qc.setQueryData(
        ["projects"],
        prev.filter((x) => x.id !== id),
      );
      return { prev };
    },
    onError: (_e, _v, ctx: any) => {
      if (ctx?.prev) qc.setQueryData(["projects"], ctx.prev);
    },
    onSettled: () => qc.invalidateQueries({ queryKey: ["projects"] }),
  });
}

export function useAddSkill() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation<void, Error, Skill>({
    mutationFn: (s) => {
      if (!actor) throw new Error("No actor");
      return actor.addSkill(s);
    },
    onMutate: async (s) => {
      await qc.cancelQueries({ queryKey: ["skills"] });
      const prev = qc.getQueryData<Skill[]>(["skills"]) ?? [];
      qc.setQueryData(["skills"], [...prev, s]);
      return { prev };
    },
    onError: (_e, _v, ctx: any) => {
      if (ctx?.prev) qc.setQueryData(["skills"], ctx.prev);
    },
    onSettled: () => qc.invalidateQueries({ queryKey: ["skills"] }),
  });
}

export function useUpdateSkill() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation<void, Error, Skill>({
    mutationFn: (s) => {
      if (!actor) throw new Error("No actor");
      return actor.updateSkill(s);
    },
    onMutate: async (s) => {
      await qc.cancelQueries({ queryKey: ["skills"] });
      const prev = qc.getQueryData<Skill[]>(["skills"]) ?? [];
      qc.setQueryData(
        ["skills"],
        prev.map((x) => (x.id === s.id ? s : x)),
      );
      return { prev };
    },
    onError: (_e, _v, ctx: any) => {
      if (ctx?.prev) qc.setQueryData(["skills"], ctx.prev);
    },
    onSettled: () => qc.invalidateQueries({ queryKey: ["skills"] }),
  });
}

export function useDeleteSkill() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: (id) => {
      if (!actor) throw new Error("No actor");
      return actor.deleteSkill(id);
    },
    onMutate: async (id) => {
      await qc.cancelQueries({ queryKey: ["skills"] });
      const prev = qc.getQueryData<Skill[]>(["skills"]) ?? [];
      qc.setQueryData(
        ["skills"],
        prev.filter((x) => x.id !== id),
      );
      return { prev };
    },
    onError: (_e, _v, ctx: any) => {
      if (ctx?.prev) qc.setQueryData(["skills"], ctx.prev);
    },
    onSettled: () => qc.invalidateQueries({ queryKey: ["skills"] }),
  });
}

export function useAddCertificate() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation<void, Error, Certificate>({
    mutationFn: (c) => {
      if (!actor) throw new Error("No actor");
      return actor.addCertificate(c);
    },
    onMutate: async (c) => {
      await qc.cancelQueries({ queryKey: ["certificates"] });
      const prev = qc.getQueryData<Certificate[]>(["certificates"]) ?? [];
      qc.setQueryData(["certificates"], [...prev, c]);
      return { prev };
    },
    onError: (_e, _v, ctx: any) => {
      if (ctx?.prev) qc.setQueryData(["certificates"], ctx.prev);
    },
    onSettled: () => qc.invalidateQueries({ queryKey: ["certificates"] }),
  });
}

export function useUpdateCertificate() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation<void, Error, Certificate>({
    mutationFn: (c) => {
      if (!actor) throw new Error("No actor");
      return actor.updateCertificate(c);
    },
    onMutate: async (c) => {
      await qc.cancelQueries({ queryKey: ["certificates"] });
      const prev = qc.getQueryData<Certificate[]>(["certificates"]) ?? [];
      qc.setQueryData(
        ["certificates"],
        prev.map((x) => (x.id === c.id ? c : x)),
      );
      return { prev };
    },
    onError: (_e, _v, ctx: any) => {
      if (ctx?.prev) qc.setQueryData(["certificates"], ctx.prev);
    },
    onSettled: () => qc.invalidateQueries({ queryKey: ["certificates"] }),
  });
}

export function useDeleteCertificate() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: (id) => {
      if (!actor) throw new Error("No actor");
      return actor.deleteCertificate(id);
    },
    onMutate: async (id) => {
      await qc.cancelQueries({ queryKey: ["certificates"] });
      const prev = qc.getQueryData<Certificate[]>(["certificates"]) ?? [];
      qc.setQueryData(
        ["certificates"],
        prev.filter((x) => x.id !== id),
      );
      return { prev };
    },
    onError: (_e, _v, ctx: any) => {
      if (ctx?.prev) qc.setQueryData(["certificates"], ctx.prev);
    },
    onSettled: () => qc.invalidateQueries({ queryKey: ["certificates"] }),
  });
}

export function useUpdateContact() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation<void, Error, Contact>({
    mutationFn: (c) => {
      if (!actor) throw new Error("No actor");
      return actor.updateContact(c);
    },
    onMutate: async (c) => {
      await qc.cancelQueries({ queryKey: ["contact"] });
      const prev = qc.getQueryData(["contact"]);
      qc.setQueryData(["contact"], c);
      return { prev };
    },
    onError: (_e, _v, ctx: any) => {
      if (ctx?.prev) qc.setQueryData(["contact"], ctx.prev);
    },
    onSettled: () => qc.invalidateQueries({ queryKey: ["contact"] }),
  });
}
