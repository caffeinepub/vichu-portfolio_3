import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Check, Loader2, Pencil, Plus, Trash2, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { Project } from "../../backend";
import {
  useAddProject,
  useDeleteProject,
  useProjects,
  useUpdateProject,
} from "../../hooks/useQueries";
import ImageUploader from "./ImageUploader";

type FormData = {
  title: string;
  description: string;
  purpose: string;
  link: string;
  year: string;
  imageId: string | undefined;
};
const EMPTY: FormData = {
  title: "",
  description: "",
  purpose: "",
  link: "",
  year: String(new Date().getFullYear()),
  imageId: undefined,
};

function ProjectForm({
  initial,
  onSave,
  onCancel,
  isSaving,
}: {
  initial?: FormData;
  onSave: (d: FormData) => void;
  onCancel: () => void;
  isSaving: boolean;
}) {
  const [form, setForm] = useState<FormData>(initial ?? EMPTY);
  const set = (k: keyof FormData) => (v: string | undefined) =>
    setForm((f) => ({ ...f, [k]: v ?? "" }));
  return (
    <div className="space-y-3 bg-secondary/50 rounded-xl p-4 border border-border">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label className="text-xs font-semibold">Title *</Label>
          <Input
            value={form.title}
            onChange={(e) => set("title")(e.target.value)}
            placeholder="Project title"
            className="mt-1"
            data-ocid="projects.input"
          />
        </div>
        <div>
          <Label className="text-xs font-semibold">Purpose</Label>
          <Input
            value={form.purpose}
            onChange={(e) => set("purpose")(e.target.value)}
            placeholder="e.g. Social"
            className="mt-1"
            data-ocid="projects.input"
          />
        </div>
      </div>
      <div>
        <Label className="text-xs font-semibold">Description</Label>
        <Textarea
          value={form.description}
          onChange={(e) => set("description")(e.target.value)}
          placeholder="Short description"
          rows={2}
          className="mt-1"
          data-ocid="projects.textarea"
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label className="text-xs font-semibold">Link</Label>
          <Input
            value={form.link}
            onChange={(e) => set("link")(e.target.value)}
            placeholder="https://..."
            className="mt-1"
            data-ocid="projects.input"
          />
        </div>
        <div>
          <Label className="text-xs font-semibold">Year</Label>
          <Input
            value={form.year}
            onChange={(e) => set("year")(e.target.value)}
            placeholder="2024"
            className="mt-1"
            data-ocid="projects.input"
          />
        </div>
      </div>
      <div>
        <Label className="text-xs font-semibold">Image</Label>
        <ImageUploader
          currentImageId={form.imageId}
          onUploaded={(id) => setForm((f) => ({ ...f, imageId: id }))}
          onClear={() => setForm((f) => ({ ...f, imageId: undefined }))}
          className="mt-1"
        />
      </div>
      <div className="flex gap-2 pt-1">
        <Button
          size="sm"
          onClick={() => onSave(form)}
          disabled={isSaving || !form.title}
          className="gap-1.5"
          data-ocid="projects.save_button"
        >
          {isSaving ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Check className="w-3.5 h-3.5" />
          )}{" "}
          Save
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={onCancel}
          data-ocid="projects.cancel_button"
        >
          <X className="w-3.5 h-3.5" /> Cancel
        </Button>
      </div>
    </div>
  );
}

export default function ProjectsTab() {
  const { data: projects = [] } = useProjects();
  const addProject = useAddProject();
  const updateProject = useUpdateProject();
  const deleteProject = useDeleteProject();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);

  const toForm = (p: Project): FormData => ({
    title: p.title,
    description: p.description,
    purpose: p.purpose,
    link: p.link ?? "",
    year: String(p.year),
    imageId: p.imageId,
  });

  const handleAdd = async (d: FormData) => {
    const now = BigInt(Date.now());
    try {
      await addProject.mutateAsync({
        id: crypto.randomUUID(),
        title: d.title,
        description: d.description,
        purpose: d.purpose,
        link: d.link || undefined,
        year: BigInt(Number.parseInt(d.year) || new Date().getFullYear()),
        imageId: d.imageId,
        created: now,
        updated: now,
      });
      setAdding(false);
      toast.success("Project added!");
    } catch {
      toast.error("Failed to add project");
    }
  };

  const handleUpdate = async (p: Project, d: FormData) => {
    try {
      await updateProject.mutateAsync({
        ...p,
        title: d.title,
        description: d.description,
        purpose: d.purpose,
        link: d.link || undefined,
        year: BigInt(Number.parseInt(d.year) || new Date().getFullYear()),
        imageId: d.imageId,
        updated: BigInt(Date.now()),
      });
      setEditingId(null);
      toast.success("Project updated!");
    } catch {
      toast.error("Failed to update project");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteProject.mutateAsync(id);
      toast.success("Project deleted");
    } catch {
      toast.error("Failed to delete");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-muted-foreground">
          {projects.length} project{projects.length !== 1 ? "s" : ""}
        </span>
        <Button
          size="sm"
          onClick={() => {
            setAdding(true);
            setEditingId(null);
          }}
          disabled={adding}
          className="gap-1.5"
          data-ocid="projects.open_modal_button"
        >
          <Plus className="w-3.5 h-3.5" /> Add Project
        </Button>
      </div>
      {adding && (
        <ProjectForm
          onSave={handleAdd}
          onCancel={() => setAdding(false)}
          isSaving={addProject.isPending}
        />
      )}
      <div className="space-y-3">
        {projects.map((p, i) => (
          <div key={p.id} data-ocid={`projects.item.${i + 1}`}>
            {editingId === p.id ? (
              <ProjectForm
                initial={toForm(p)}
                onSave={(d) => handleUpdate(p, d)}
                onCancel={() => setEditingId(null)}
                isSaving={updateProject.isPending}
              />
            ) : (
              <div className="flex items-center justify-between bg-secondary/30 rounded-xl p-3 border border-border">
                <div className="min-w-0">
                  <p className="font-semibold text-sm text-foreground truncate">
                    {p.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {p.purpose} &middot; {String(p.year)}
                  </p>
                </div>
                <div className="flex gap-1 flex-shrink-0">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="w-7 h-7"
                    onClick={() => {
                      setEditingId(p.id);
                      setAdding(false);
                    }}
                    data-ocid={`projects.edit_button.${i + 1}`}
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="w-7 h-7 text-destructive hover:text-destructive"
                    onClick={() => handleDelete(p.id)}
                    data-ocid={`projects.delete_button.${i + 1}`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            )}
            {i < projects.length - 1 && <Separator className="mt-3" />}
          </div>
        ))}
      </div>
      {projects.length === 0 && !adding && (
        <p
          className="text-center text-sm text-muted-foreground py-8"
          data-ocid="projects.empty_state"
        >
          No projects yet.
        </p>
      )}
    </div>
  );
}
