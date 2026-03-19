import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CheckCircle2, Loader2, Upload, X } from "lucide-react";
import { useRef, useState } from "react";
import { useInternetIdentity } from "../../hooks/useInternetIdentity";
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
  const [uploadProgress, setUploadProgress] = useState("");
  const [error, setError] = useState("");
  const { uploadFile, isReady } = useStorageService();
  const { identity } = useInternetIdentity();

  const isAuthenticated = !!identity;
  const isDisabled = uploading || !isReady || !isAuthenticated;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError("");
    setUploadProgress("Preparing...");
    setUploading(true);
    try {
      setUploadProgress("Uploading...");
      const hash = await uploadFile(file);
      setUploadProgress("Done!");
      onUploaded(hash);
      setTimeout(() => setUploadProgress(""), 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
      setUploadProgress("");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const getStatusBadge = () => {
    if (!isAuthenticated) return null;
    if (!isReady) {
      return (
        <span className="inline-flex items-center gap-1.5 text-xs text-amber-600 bg-amber-50 border border-amber-200 px-2 py-1 rounded-full">
          <Loader2 className="w-3 h-3 animate-spin" />
          Initializing storage...
        </span>
      );
    }
    if (uploading) {
      return (
        <span className="inline-flex items-center gap-1.5 text-xs text-blue-600 bg-blue-50 border border-blue-200 px-2 py-1 rounded-full">
          <Loader2 className="w-3 h-3 animate-spin" />
          {uploadProgress || "Uploading..."}
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 text-xs text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-1 rounded-full">
        <CheckCircle2 className="w-3 h-3" />
        Ready to upload
      </span>
    );
  };

  return (
    <div className={cn("space-y-2.5", className)}>
      {currentImageId && (
        <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-border bg-muted">
          <BlobImage
            imageId={currentImageId}
            alt="Preview"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {onClear && (
            <button
              type="button"
              onClick={onClear}
              className="absolute top-2 right-2 w-6 h-6 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center hover:bg-destructive/80 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      )}

      {isAuthenticated && (
        <div className="min-h-[26px] flex items-center">{getStatusBadge()}</div>
      )}

      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => fileInputRef.current?.click()}
          disabled={isDisabled}
          className="gap-2 h-8 text-xs"
          data-ocid="admin.upload_button"
        >
          {uploading ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Upload className="w-3.5 h-3.5" />
          )}
          {uploading ? uploadProgress || "Uploading..." : label}
        </Button>
        {!isAuthenticated && (
          <span className="text-xs text-muted-foreground">
            Sign in to upload images
          </span>
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
