"use client";

import { useState } from "react";
import Image from "next/image";

interface ImagePopoverProps {
  mainImage: string;
  mainImageAlt: string;
  popoverImage: string;
  popoverImageAlt: string;
  className?: string;
}

export function ImagePopover({
  mainImage,
  mainImageAlt,
  popoverImage,
  popoverImageAlt,
  className = "",
}: ImagePopoverProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main Image */}
      <div className="relative h-42 w-full rounded-lg overflow-hidden border border-border bg-background/50 group transition-all duration-300">
        <Image
          src={mainImage}
          alt={mainImageAlt}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0" />
      </div>

      {/* Popover */}
      {isHovered && (
        <div className="absolute z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[90vw] pointer-events-none">
          <div className="relative animate-in fade-in zoom-in-95 duration-200">
            {/* Popover Card */}
            <div className="rounded-lg border-2 border-primary/50 bg-background/95 backdrop-blur-md shadow-2xl overflow-hidden">
              <div className="relative w-auto h-auto">
                <Image
                  src={popoverImage}
                  alt={popoverImageAlt}
                  width={600}
                  height={600}
                  className="w-auto h-auto max-w-[600px] max-h-[600px]"
                  style={{ objectFit: 'contain' }}
                />
              </div>
            </div>
            
            {/* Glow Effect */}
            <div className="absolute inset-0 -z-10 bg-primary/20 blur-xl rounded-lg" />
          </div>
        </div>
      )}
    </div>
  );
}
