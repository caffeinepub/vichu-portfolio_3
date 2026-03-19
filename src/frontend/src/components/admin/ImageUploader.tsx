import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2, Upload, X } from "lucide-react";
import { useRef, useState } from "react";
import { useStorageService } from "../../hooks/useStorageService";
import BlobImage from "../BlobImage";

interface ImageUploaderProps {
  currentImageId?: string;
  onUploaded: (imageId: string) => void;
  onClear?: () => void;
  label?: string;
  className?: string;
}

export default function ImageUploader({
  currentImageId,
  onUploaded,
  onClear,
  label = "Upload Image",
  className,
}: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const { uploadFile, isReady } = useStorageService();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError("");
    setUploading(true);
    try {
      const hash = await uploadFile(file);
      onUploaded(hash);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      {currentImageId && (
        <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-border bg-muted">
          <BlobImage
            imageId={currentImageId}
            alt="Preview"
            className="w-full h-full object-cover"
          />
          {onClear && (
            <button
              type="button"
              onClick={onClear}
              className="absolute top-2 right-2 w-6 h-6 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center hover:bg-destructive/80"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      )}
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading || !isReady}
          className="gap-2"
          data-ocid="admin.upload_button"
        >
          {uploading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Upload className="w-4 h-4" />
          )}
          {uploading ? "Uploading..." : label}
        </Button>
        {!isReady && (
          <span className="text-xs text-muted-foreground">Initializing...</span>
        )}
      </div>
      {error && (
        <p className="text-xs text-destructive" data-ocid="admin.error_state">
          {error}
        </p>
      )}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
}
