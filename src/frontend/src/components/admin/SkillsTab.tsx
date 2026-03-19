import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, Loader2, Pencil, Plus, Trash2, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { Skill } from "../../backend";
import {
  useAddSkill,
  useDeleteSkill,
  useSkills,
  useUpdateSkill,
} from "../../hooks/useQueries";
import ImageUploader from "./ImageUploader";

type FormData = { name: string; imageId: string | undefined };
const EMPTY: FormData = { name: "", imageId: undefined };

function SkillForm({
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
  return (
    <div className="flex flex-col gap-3 bg-secondary/50 rounded-xl p-3 border border-border">
      <div>
        <Label className="text-xs font-semibold">Skill Name *</Label>
        <Input
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          placeholder="e.g. TypeScript"
          className="mt-1"
          data-ocid="skills.input"
        />
      </div>
      <div>
        <Label className="text-xs font-semibold">Icon (optional)</Label>
        <ImageUploader
          currentImageId={form.imageId}
          onUploaded={(id) => setForm((f) => ({ ...f, imageId: id }))}
          onClear={() => setForm((f) => ({ ...f, imageId: undefined }))}
          label="Upload Icon"
          className="mt-1"
        />
      </div>
      <div className="flex gap-2">
        <Button
          size="sm"
          onClick={() => onSave(form)}
          disabled={isSaving || !form.name}
          className="gap-1.5"
          data-ocid="skills.save_button"
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
          data-ocid="skills.cancel_button"
        >
          <X className="w-3.5 h-3.5" /> Cancel
        </Button>
      </div>
    </div>
  );
}

export default function SkillsTab() {
  const { data: skills = [] } = useSkills();
  const addSkill = useAddSkill();
  const updateSkill = useUpdateSkill();
  const deleteSkill = useDeleteSkill();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const toForm = (s: Skill): FormData => ({ name: s.name, imageId: s.imageId });

  const handleAdd = async (d: FormData) => {
    const now = BigInt(Date.now());
    try {
      await addSkill.mutateAsync({
        id: crypto.randomUUID(),
        name: d.name,
        imageId: d.imageId,
        created: now,
        updated: now,
        level: undefined,
      });
      setAdding(false);
      toast.success("Skill added!");
    } catch {
      toast.error("Failed to add skill");
    }
  };
  const handleUpdate = async (s: Skill, d: FormData) => {
    try {
      await updateSkill.mutateAsync({
        ...s,
        name: d.name,
        imageId: d.imageId,
        updated: BigInt(Date.now()),
      });
      setEditingId(null);
      toast.success("Skill updated!");
    } catch {
      toast.error("Failed to update skill");
    }
  };
  const handleDelete = async (id: string) => {
    try {
      await deleteSkill.mutateAsync(id);
      toast.success("Skill deleted");
    } catch {
      toast.error("Failed to delete");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-muted-foreground">
          {skills.length} skill{skills.length !== 1 ? "s" : ""}
        </span>
        <Button
          size="sm"
          onClick={() => {
            setAdding(true);
            setEditingId(null);
          }}
          disabled={adding}
          className="gap-1.5"
          data-ocid="skills.open_modal_button"
        >
          <Plus className="w-3.5 h-3.5" /> Add Skill
        </Button>
      </div>
      {adding && (
        <SkillForm
          onSave={handleAdd}
          onCancel={() => setAdding(false)}
          isSaving={addSkill.isPending}
        />
      )}
      <div className="flex flex-wrap gap-2">
        {skills.map((s, i) => (
          <div key={s.id} data-ocid={`skills.item.${i + 1}`}>
            {editingId === s.id ? (
              <SkillForm
                initial={toForm(s)}
                onSave={(d) => handleUpdate(s, d)}
                onCancel={() => setEditingId(null)}
                isSaving={updateSkill.isPending}
              />
            ) : (
              <div className="flex items-center gap-1.5 bg-secondary rounded-full px-3 py-1.5 border border-border">
                <span className="text-sm font-medium">{s.name}</span>
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(s.id);
                    setAdding(false);
                  }}
                  className="text-muted-foreground hover:text-foreground"
                  data-ocid={`skills.edit_button.${i + 1}`}
                >
                  <Pencil className="w-3 h-3" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(s.id)}
                  className="text-destructive hover:text-destructive/70"
                  data-ocid={`skills.delete_button.${i + 1}`}
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
      {skills.length === 0 && !adding && (
        <p
          className="text-center text-sm text-muted-foreground py-8"
          data-ocid="skills.empty_state"
        >
          No skills yet.
        </p>
      )}
    </div>
  );
}
