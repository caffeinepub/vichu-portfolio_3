import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Edit3, Plus, Save, Trash2, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface CustomSection {
  id: string;
  title: string;
  body: string;
}

function loadSections(): CustomSection[] {
  try {
    return JSON.parse(
      localStorage.getItem("portfolio-custom-sections") || "[]",
    );
  } catch {
    return [];
  }
}

function saveSections(sections: CustomSection[]) {
  localStorage.setItem("portfolio-custom-sections", JSON.stringify(sections));
  // Dispatch event so CustomSections component can re-render
  window.dispatchEvent(new Event("custom-sections-updated"));
}

export default function CustomSectionsTab() {
  const [sections, setSections] = useState<CustomSection[]>(loadSections);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState("");
  const [newBody, setNewBody] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");
  const [showAdd, setShowAdd] = useState(false);

  useEffect(() => {
    saveSections(sections);
  }, [sections]);

  function addSection() {
    if (!newTitle.trim()) {
      toast.error("Section title is required");
      return;
    }
    const section: CustomSection = {
      id: `cs-${Date.now()}`,
      title: newTitle.trim(),
      body: newBody.trim(),
    };
    setSections((prev) => [...prev, section]);
    setNewTitle("");
    setNewBody("");
    setShowAdd(false);
    toast.success("Section added");
  }

  function startEdit(section: CustomSection) {
    setEditingId(section.id);
    setEditTitle(section.title);
    setEditBody(section.body);
  }

  function saveEdit(id: string) {
    if (!editTitle.trim()) {
      toast.error("Title required");
      return;
    }
    setSections((prev) =>
      prev.map((s) =>
        s.id === id
          ? { ...s, title: editTitle.trim(), body: editBody.trim() }
          : s,
      ),
    );
    setEditingId(null);
    toast.success("Section updated");
  }

  function deleteSection(id: string) {
    setSections((prev) => prev.filter((s) => s.id !== id));
    toast.success("Section removed");
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">
          Add custom sections to your portfolio
        </p>
        <Button
          size="sm"
          className="text-xs gap-1 h-7"
          onClick={() => setShowAdd((v) => !v)}
          data-ocid="sections.open_modal_button"
        >
          {showAdd ? <X className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
          {showAdd ? "Cancel" : "Add Section"}
        </Button>
      </div>

      <AnimatePresence>
        {showAdd && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="border border-primary/30 rounded-lg p-4 space-y-3 bg-primary/5">
              <h4 className="text-sm font-semibold text-foreground">
                New Section
              </h4>
              <div className="space-y-1">
                <Label className="text-xs">Title *</Label>
                <Input
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Achievements, Hobbies..."
                  className="h-8 text-sm"
                  data-ocid="sections.input"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Content</Label>
                <Textarea
                  value={newBody}
                  onChange={(e) => setNewBody(e.target.value)}
                  placeholder="Write your content here..."
                  className="text-sm min-h-[80px] resize-none"
                  data-ocid="sections.textarea"
                />
              </div>
              <Button
                size="sm"
                className="w-full text-xs h-8"
                onClick={addSection}
                data-ocid="sections.submit_button"
              >
                <Save className="w-3 h-3 mr-1" /> Save Section
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {sections.length === 0 && !showAdd && (
        <div
          className="text-center py-8 text-muted-foreground text-sm"
          data-ocid="sections.empty_state"
        >
          No custom sections yet. Add one to get started.
        </div>
      )}

      <div className="space-y-3">
        <AnimatePresence>
          {sections.map((section, idx) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ delay: idx * 0.05 }}
              className="border border-border rounded-lg p-3"
              data-ocid={`sections.item.${idx + 1}`}
            >
              {editingId === section.id ? (
                <div className="space-y-2">
                  <Input
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="h-8 text-sm font-medium"
                    data-ocid="sections.input"
                  />
                  <Textarea
                    value={editBody}
                    onChange={(e) => setEditBody(e.target.value)}
                    className="text-sm min-h-[60px] resize-none"
                    data-ocid="sections.textarea"
                  />
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="text-xs h-7 flex-1"
                      onClick={() => saveEdit(section.id)}
                      data-ocid="sections.save_button"
                    >
                      <Save className="w-3 h-3 mr-1" /> Save
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs h-7"
                      onClick={() => setEditingId(null)}
                      data-ocid="sections.cancel_button"
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">
                      {section.title}
                    </p>
                    {section.body && (
                      <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                        {section.body}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="w-6 h-6"
                      onClick={() => startEdit(section)}
                      data-ocid="sections.edit_button"
                    >
                      <Edit3 className="w-3 h-3" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="w-6 h-6 text-destructive hover:text-destructive"
                      onClick={() => deleteSection(section.id)}
                      data-ocid="sections.delete_button"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
