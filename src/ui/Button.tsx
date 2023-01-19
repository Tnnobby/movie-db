import cn from "classnames";
import { ButtonHTMLAttributes } from "react";

export type ButtonProps = {} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ children, className, ...props }: ButtonProps) => (
  <button
    className={cn(
      "px-2 py-0 rounded-full flex justify-center items-center font-sans font-semibold shadow-md select-none text-white text-lg transition-all bg-slate-700 hover:bg-slate-800",
      className
    )}
    {...props}
  >
    {children}
  </button>
);

export default Button;
