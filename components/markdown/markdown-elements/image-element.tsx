import Image from "next/image";

interface ImageElementProps {
  url?: string;
  alt?: string;
  onChange: (updates: { url?: string; alt?: string }) => void;
}

function ImageElement({ url = '', alt = '', onChange }: ImageElementProps) {
  return (
    <div className="space-y-2">
      <input
        type="text"
        value={url}
        onChange={(e) => onChange({ url: e.target.value })}
        placeholder="Image URL..."
        className="w-full px-2 py-1 rounded border border-border bg-accent"
      />
      <input
        type="text"
        value={alt}
        onChange={(e) => onChange({ alt: e.target.value })}
        placeholder="Alt text..."
        className="w-full px-2 py-1 rounded border border-border bg-accent"
      />
      {url && (
        <div className="relative w-full h-[200px]">
          <Image 
            src={url} 
            alt={alt} 
            fill
            className="object-contain rounded"
            onError={(e) => {
              const img = e.target as HTMLImageElement;
              if (img) {
                img.style.display = 'none';
              }
            }}
          />
        </div>
      )}
    </div>
  );
}

export default ImageElement;