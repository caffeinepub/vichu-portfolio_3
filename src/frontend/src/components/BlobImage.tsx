import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { getBlobUrl } from "../services/blobService";

interface BlobImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  imageId?: string;
  fallback?: React.ReactNode;
}

export default function BlobImage({
  imageId,
  fallback,
  className,
  alt = "",
  ...props
}: BlobImageProps) {
  const [url, setUrl] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);
    setUrl(imageId ? getBlobUrl(imageId) : "");
  }, [imageId]);

  if (!url || error) {
    return (
      <>
        {fallback ?? (
          <div
            className={cn(
              "bg-muted flex items-center justify-center text-muted-foreground text-xs",
              className,
            )}
          >
            No image
          </div>
        )}
      </>
    );
  }

  // biome-ignore lint/a11y/useAltText: alt is required by callers via alt prop default
  return (
    <img
      src={url}
      alt={alt}
      className={className}
      onError={() => setError(true)}
      {...props}
    />
  );
}
