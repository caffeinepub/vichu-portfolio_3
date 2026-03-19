import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useProfile, useUpdateProfile } from "../../hooks/useQueries";
import ImageUploader from "./ImageUploader";

export default function ProfileTab() {
  const { data: profile } = useProfile();
  const updateProfile = useUpdateProfile();
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [bio, setBio] = useState("");
  const [profileImageId, setProfileImageId] = useState<string | undefined>();

  useEffect(() => {
    if (profile) {
      setName(profile.name || "");
      setTitle(profile.title || "");
      setBio(profile.bio || "");
      setProfileImageId(profile.profileImageId);
    }
  }, [profile]);

  const handleSave = async () => {
    try {
      await updateProfile.mutateAsync({ name, title, bio, profileImageId });
      toast.success("Profile saved!");
    } catch {
      toast.error("Failed to save profile");
    }
  };

  return (
    <div className="space-y-5">
      <div>
        <Label htmlFor="pname" className="text-sm font-semibold">
          Name
        </Label>
        <Input
          id="pname"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className="mt-1.5"
          data-ocid="profile.input"
        />
      </div>
      <div>
        <Label htmlFor="ptitle" className="text-sm font-semibold">
          Title
        </Label>
        <Input
          id="ptitle"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Your title"
          className="mt-1.5"
          data-ocid="profile.input"
        />
      </div>
      <div>
        <Label htmlFor="pbio" className="text-sm font-semibold">
          Bio
        </Label>
        <Textarea
          id="pbio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="A short bio"
          rows={3}
          className="mt-1.5"
          data-ocid="profile.textarea"
        />
      </div>
      <div>
        <Label className="text-sm font-semibold">Profile Photo</Label>
        <div className="mt-1.5">
          <ImageUploader
            currentImageId={profileImageId}
            onUploaded={setProfileImageId}
            onClear={() => setProfileImageId(undefined)}
            label="Upload Photo"
          />
        </div>
      </div>
      <Button
        onClick={handleSave}
        disabled={updateProfile.isPending}
        className="w-full"
        data-ocid="profile.save_button"
      >
        {updateProfile.isPending && (
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
        )}
        Save Profile
      </Button>
    </div>
  );
}
