import { HTMLAttributes } from "react";
import cn from "classnames";

export type TextFieldProps = HTMLAttributes<HTMLDivElement>;

const TextField = ({ children, className, ...props }: TextFieldProps) => (
  <div
    className={cn("rounded-md border-2 border-black px-2 py-1", className)}
    {...props}
  >
    {children}
  </div>
);

export default TextField;
