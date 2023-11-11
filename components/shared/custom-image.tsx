"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";

interface Props {
  image: string;
  alt: string;
  className?: string;
  onClick?: () => void;
}
const CustomImage = ({ image, alt, className, onClick }: Props) => {
  const [isLoading, setIsloading] = useState(true);
  return (
    <Image
      src={image}
      alt={alt}
      fill
      className={cn(
        "object-cover duration-700 ease-in-out",
        isLoading ? "scale-110 blur-2xl grayscale" : "scale-100 blur-0 grayscale-0",
        className
      )}
      onLoadingComplete={() => setIsloading(false)}
      onClick={onClick}
    />
  );
};

export default CustomImage;
