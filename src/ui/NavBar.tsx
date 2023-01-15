'use client';

import cn from "classnames";
import React, { ReactNode } from "react";
import { UIComponent } from "./types";
import { usePathname } from 'next/navigation'

const NavBar = ({
  children,
  className,
}: { children?: ReactNode } & UIComponent) => {
  const route = usePathname()?.split('/');

  return (
    <div className="w-full flex justify-center">
      <div
        className={cn(
          "p-1 rounded-full absolute bg-slate-500 shadow-md flex flex-row gap-3 content-center w-fit mx-auto",
          className
        )}
      >
        {React.Children.map(children, (child) =>
          React.cloneElement(child as React.ReactElement, {
            activeRoute: route ? route[1] : ''
          })
        )}
      </div>
    </div>
  );
};

export default NavBar;
