"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import cn from "classnames";
import { UIComponent } from "./types";

export type PosterProps = UIComponent & {
  uri?: string;
  alt?: string;
};

const Poster = ({ uri, alt, className }: PosterProps) => {
  const [dims, setDims] = useState<{ width: number; height: number }>();
  const contRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contRef.current) {
      const bounding = contRef.current.getBoundingClientRect();
      setDims({ width: bounding.width, height: bounding.height });
    }
  }, []);

  if (uri && alt)
    return (
      <div ref={contRef} className={cn("h-full w-full", className)}>
        {dims && (
          <Image src={uri} height={dims.height} width={dims.width} alt={alt} />
        )}
      </div>
    );
  return <></>
};

export default Poster;
