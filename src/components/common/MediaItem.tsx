"use client";

import Image from "next/image";
import { useState } from "react";

interface MediaItemProps {
  readonly type: "image" | "video";
  readonly src: string;
  readonly alt?: string;
  readonly title?: string;
}

const MediaItem = ({
  type,
  src,
  alt = "Media",
  title = "Media",
}: MediaItemProps) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="w-full rounded-lg overflow-hidden border border-gray-200 shadow-sm">
      {type === "video" ? (
        <iframe
          src={src}
          title={title}
          className="w-full aspect-video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      ) : (
        <div className="relative w-full h-48">
          <Image
            src={imageError ? "/placeholder.jpg" : src}
            alt={alt}
            fill
            className="object-cover hover:scale-105 transition-transform duration-200"
            loading="lazy"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={() => setImageError(true)}
          />
        </div>
      )}
    </div>
  );
};
export default MediaItem;
