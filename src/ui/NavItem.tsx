"use client";

import classNames from "classnames";
import Link, { LinkProps } from "next/link";
import { ReactNode } from "react";
import { UIComponent } from "./types";

export type NavItemProps = {
  label: ReactNode;
  activeRoute?: string;
} & LinkProps &
  UIComponent;

export default ({
  label,
  className,
  activeRoute,
  href,
  ...props
}: NavItemProps) => (
  <Link
    className={classNames(
      "px-2 py-0 rounded-full flex justify-center items-center font-sans font-semibold text-white text-lg transition-all hover:bg-slate-700",
      { "bg-slate-800": `/${activeRoute}` === href },
      className
    )}
    href={href}
    {...props}
  >
    {label}
  </Link>
);
