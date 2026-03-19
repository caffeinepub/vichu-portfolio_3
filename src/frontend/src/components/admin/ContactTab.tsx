import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Instagram, Linkedin, Loader2, Mail, Send } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useContact, useUpdateContact } from "../../hooks/useQueries";

export default function ContactTab() {
  const { data: contact } = useContact();
  const updateContact = useUpdateContact();
  const [linkedin, setLinkedin] = useState("");
  const [email, setEmail] = useState("");
  const [instagram, setInstagram] = useState("");
  const [telegram, setTelegram] = useState("");

  useEffect(() => {
    if (contact) {
      setLinkedin(contact.linkedin || "");
      setEmail(contact.email || "");
      setInstagram(contact.instagram || "");
      setTelegram(contact.telegram || "");
    }
  }, [contact]);

  const handleSave = async () => {
    try {
      await updateContact.mutateAsync({ linkedin, email, instagram, telegram });
      toast.success("Contact info saved!");
    } catch {
      toast.error("Failed to save");
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <Label
          htmlFor="c-linkedin"
          className="text-sm font-semibold flex items-center gap-1.5"
        >
          <Linkedin className="w-3.5 h-3.5" /> LinkedIn
        </Label>
        <Input
          id="c-linkedin"
          value={linkedin}
          onChange={(e) => setLinkedin(e.target.value)}
          placeholder="https://www.linkedin.com/in/..."
          className="mt-1.5"
          data-ocid="contact.input"
        />
      </div>
      <div>
        <Label
          htmlFor="c-email"
          className="text-sm font-semibold flex items-center gap-1.5"
        >
          <Mail className="w-3.5 h-3.5" /> Email
        </Label>
        <Input
          id="c-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="mt-1.5"
          data-ocid="contact.input"
        />
      </div>
      <div>
        <Label
          htmlFor="c-instagram"
          className="text-sm font-semibold flex items-center gap-1.5"
        >
          <Instagram className="w-3.5 h-3.5" /> Instagram
        </Label>
        <Input
          id="c-instagram"
          value={instagram}
          onChange={(e) => setInstagram(e.target.value)}
          placeholder="@username"
          className="mt-1.5"
          data-ocid="contact.input"
        />
      </div>
      <div>
        <Label
          htmlFor="c-telegram"
          className="text-sm font-semibold flex items-center gap-1.5"
        >
          <Send className="w-3.5 h-3.5" /> Telegram
        </Label>
        <Input
          id="c-telegram"
          value={telegram}
          onChange={(e) => setTelegram(e.target.value)}
          placeholder="@username"
          className="mt-1.5"
          data-ocid="contact.input"
        />
      </div>
      <Button
        onClick={handleSave}
        disabled={updateContact.isPending}
        className="w-full mt-2"
        data-ocid="contact.save_button"
      >
        {updateContact.isPending && (
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
        )}
        Save Contact Info
      </Button>
    </div>
  );
}
