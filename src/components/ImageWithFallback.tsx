import { useState } from 'react';
import { ShieldAlert, Zap } from 'lucide-react';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  fallbackText?: string;
}

export function ImageWithFallback({ src, alt, className = '', fallbackText }: ImageWithFallbackProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div className={`flex flex-col items-center justify-center bg-stone-900 border border-stone-800 text-stone-400 p-3 text-center select-none ${className}`}>
        <div className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center mb-1 text-amber-400">
          <Zap className="w-5 h-5" />
        </div>
        <span className="text-xs font-bold text-stone-300 line-clamp-1">{alt}</span>
        {fallbackText && <span className="text-[10px] text-amber-500 font-mono mt-0.5">{fallbackText}</span>}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      referrerPolicy="no-referrer"
      crossOrigin="anonymous"
      onError={() => setHasError(true)}
    />
  );
}
