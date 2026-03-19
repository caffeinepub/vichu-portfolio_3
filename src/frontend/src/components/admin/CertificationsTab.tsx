import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Award, Check, Loader2, Pencil, Plus, Trash2, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { Certificate } from "../../backend";
import {
  useAddCertificate,
  useCertificates,
  useDeleteCertificate,
  useUpdateCertificate,
} from "../../hooks/useQueries";
import BlobImage from "../BlobImage";
import ImageUploader from "./ImageUploader";

type FormData = { title: string; year: string; imageId: string | undefined };
const EMPTY: FormData = { title: "", year: "", imageId: undefined };

function CertForm({
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
    <div className="space-y-3 bg-secondary/50 rounded-xl p-3 border border-border">
      <div>
        <Label className="text-xs font-semibold">Certificate Image</Label>
        <ImageUploader
          currentImageId={form.imageId}
          onUploaded={(id) => setForm((f) => ({ ...f, imageId: id }))}
          onClear={() => setForm((f) => ({ ...f, imageId: undefined }))}
          label="Upload Certificate"
          className="mt-1"
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label className="text-xs font-semibold">Title (optional)</Label>
          <Input
            value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            placeholder="Certificate title"
            className="mt-1"
            data-ocid="certifications.input"
          />
        </div>
        <div>
          <Label className="text-xs font-semibold">Year (optional)</Label>
          <Input
            value={form.year}
            onChange={(e) => setForm((f) => ({ ...f, year: e.target.value }))}
            placeholder="2024"
            className="mt-1"
            data-ocid="certifications.input"
          />
        </div>
      </div>
      <div className="flex gap-2">
        <Button
          size="sm"
          onClick={() => onSave(form)}
          disabled={isSaving}
          className="gap-1.5"
          data-ocid="certifications.save_button"
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
          data-ocid="certifications.cancel_button"
        >
          <X className="w-3.5 h-3.5" /> Cancel
        </Button>
      </div>
    </div>
  );
}

export default function CertificationsTab() {
  const { data: certs = [] } = useCertificates();
  const addCert = useAddCertificate();
  const updateCert = useUpdateCertificate();
  const deleteCert = useDeleteCertificate();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const toForm = (c: Certificate): FormData => ({
    title: c.title || "",
    year: c.year ? String(c.year) : "",
    imageId: c.imageId,
  });

  const handleAdd = async (d: FormData) => {
    const now = BigInt(Date.now());
    try {
      await addCert.mutateAsync({
        id: crypto.randomUUID(),
        title: d.title || "Certificate",
        year: d.year ? BigInt(Number.parseInt(d.year)) : undefined,
        imageId: d.imageId,
        created: now,
        updated: now,
      });
      setAdding(false);
      toast.success("Certificate added!");
    } catch {
      toast.error("Failed to add certificate");
    }
  };
  const handleUpdate = async (c: Certificate, d: FormData) => {
    try {
      await updateCert.mutateAsync({
        ...c,
        title: d.title || "Certificate",
        year: d.year ? BigInt(Number.parseInt(d.year)) : undefined,
        imageId: d.imageId,
        updated: BigInt(Date.now()),
      });
      setEditingId(null);
      toast.success("Updated!");
    } catch {
      toast.error("Failed to update");
    }
  };
  const handleDelete = async (id: string) => {
    try {
      await deleteCert.mutateAsync(id);
      toast.success("Deleted");
    } catch {
      toast.error("Failed to delete");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-muted-foreground">
          {certs.length} certificate{certs.length !== 1 ? "s" : ""}
        </span>
        <Button
          size="sm"
          onClick={() => {
            setAdding(true);
            setEditingId(null);
          }}
          disabled={adding}
          className="gap-1.5"
          data-ocid="certifications.open_modal_button"
        >
          <Plus className="w-3.5 h-3.5" /> Add Certificate
        </Button>
      </div>
      {adding && (
        <CertForm
          onSave={handleAdd}
          onCancel={() => setAdding(false)}
          isSaving={addCert.isPending}
        />
      )}
      <div className="grid grid-cols-2 gap-3">
        {certs.map((c, i) => (
          <div key={c.id} data-ocid={`certifications.item.${i + 1}`}>
            {editingId === c.id ? (
              <CertForm
                initial={toForm(c)}
                onSave={(d) => handleUpdate(c, d)}
                onCancel={() => setEditingId(null)}
                isSaving={updateCert.isPending}
              />
            ) : (
              <div className="bg-card rounded-xl border border-border overflow-hidden shadow-xs">
                <div className="relative aspect-video bg-secondary overflow-hidden">
                  {c.imageId ? (
                    <BlobImage
                      imageId={c.imageId}
                      alt={c.title || "Certificate"}
                      className="absolute inset-0 w-full h-full object-cover"
                      fallback={
                        <div className="absolute inset-0 w-full h-full flex items-center justify-center">
                          <Award className="w-8 h-8 text-muted-foreground/40" />
                        </div>
                      }
                    />
                  ) : (
                    <div className="absolute inset-0 w-full h-full flex items-center justify-center">
                      <Award className="w-8 h-8 text-muted-foreground/40" />
                    </div>
                  )}
                </div>
                <div className="p-2">
                  <p className="text-xs font-semibold text-foreground truncate">
                    {c.title || "Certificate"}
                  </p>
                  {c.year && (
                    <p className="text-xs text-muted-foreground">
                      {String(c.year)}
                    </p>
                  )}
                  <div className="flex gap-1 mt-1.5">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="w-6 h-6"
                      onClick={() => {
                        setEditingId(c.id);
                        setAdding(false);
                      }}
                      data-ocid={`certifications.edit_button.${i + 1}`}
                    >
                      <Pencil className="w-3 h-3" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="w-6 h-6 text-destructive"
                      onClick={() => handleDelete(c.id)}
                      data-ocid={`certifications.delete_button.${i + 1}`}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      {certs.length === 0 && !adding && (
        <p
          className="text-center text-sm text-muted-foreground py-8"
          data-ocid="certifications.empty_state"
        >
          No certificates yet.
        </p>
      )}
    </div>
  );
}
