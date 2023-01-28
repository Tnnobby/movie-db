"use client";

import { HTMLAttributes, useState } from "react";
import { Movie } from "./types";
import cn from "classnames";

export type OverlayProps = HTMLAttributes<HTMLDivElement> & {
  open?: boolean;
  onClickOff?: () => void;
};

const Overlay = ({ open, onClickOff, children, ...props }: OverlayProps) => (
  <div
    className={cn(
      "absolute top-0 left-0 z-10 h-full w-full overflow-hidden transition-all duration-300",
      {
        "pointer-events-none backdrop-blur-0": !open,
        "pointer-events-auto backdrop-blur-sm": open,
      }
    )}
    onClick={onClickOff}
    {...props}
  >
    <div
      className={cn(
        "z-20 m-auto mt-[50px] h-[calc(100%-50px)] w-11/12 rounded-t-2xl bg-slate-300 bg-opacity-80 px-8 pt-8 transition-all duration-300",
        { "translate-y-full": !open, "translate-y-0": open }
      )}
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </div>
  </div>
);

export default Overlay;
