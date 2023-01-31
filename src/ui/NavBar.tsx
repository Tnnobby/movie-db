"use client";

import cn from "classnames";
import React, { ReactNode } from "react";
import { UIComponent } from "./types";
import { usePathname } from "next/navigation";

const NavBar = ({
  children,
  className,
}: { children?: ReactNode } & UIComponent) => {
  const route = usePathname()?.split("/");

  return (
    <div className="fixed flex w-full justify-center">
      <div
        className={cn(
          "mx-auto flex w-fit flex-row content-center gap-3 rounded-full bg-slate-500 p-1 shadow-md",
          className
        )}
      >
        {React.Children.map(children, (child) =>
          React.cloneElement(child as React.ReactElement, {
            activeRoute: route ? route[1] : "",
          })
        )}
      </div>
    </div>
  );
};

export default NavBar;
