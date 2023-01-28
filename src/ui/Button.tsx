import cn from "classnames";
import { ButtonHTMLAttributes } from "react";

export type ButtonProps = {} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ children, className, ...props }: ButtonProps) => (
  <button
    className={cn(
      "flex select-none items-center justify-center rounded-full bg-slate-600 px-2 py-0 font-sans text-lg font-semibold text-white shadow-md transition-all hover:bg-slate-800",
      className
    )}
    {...props}
  >
    {children}
  </button>
);

export default Button;
