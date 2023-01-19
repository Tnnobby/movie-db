import cn from "classnames";
import { forwardRef, InputHTMLAttributes } from "react";

const TextInput = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={cn(
        "flex items-center rounded-md border-2 border-black bg-slate-200 px-2 py-1 placeholder-slate-600 outline-none transition-all focus-within:border-slate-600  focus-within:bg-transparent hover:shadow-md",
        className
      )}
      {...props}
    />
  );
});

TextInput.displayName = "TextInput"
export default TextInput;
