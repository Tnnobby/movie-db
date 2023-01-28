import { forwardRef,  TextareaHTMLAttributes } from "react";
import cn from "classnames";

const TextArea = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={cn(
        "flex items-center rounded-md border-2 hover:shadow-md border-black bg-slate-200 px-2 py-1 placeholder-slate-800 outline-none transition-all focus-within:border-slate-600  focus-within:bg-transparent",
        className
      )}
      {...props}
    />
  );
});

TextArea.displayName = "TextArea"
export default TextArea;
