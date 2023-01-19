"use client";

import {
  forwardRef,
  HTMLAttributes,
  useImperativeHandle,
  useState,
} from "react";

const RATING_LIST: { [key: string]: Rating[] } = {
  movie: ["G", "PG", "PG-13", "R"],
  tv: ["TV-Y", "TV-Y7", "TV-G", "TV-PG", "TV-14", "TV-MA"],
};

type Rating =
  | "G"
  | "PG"
  | "PG-13"
  | "R"
  | "TV-Y"
  | "TV-Y7"
  | "TV-G"
  | "TV-PG"
  | "TV-14"
  | "TV-MA";

export type SelectRef = {
  value?: string;
};

export type SelectProps = HTMLAttributes<HTMLDivElement> & {
  values: string[];
};

const Select = forwardRef<SelectRef, SelectProps>(
  ({ values, ...props }, ref) => {
    const [selected, setSelected] = useState<string>();
    useImperativeHandle(
      ref,
      () => ({
        value: selected,
      }),
      [selected]
    );

    const changeHandle = (value: string) => setSelected(value);

    return (
      <div className="flex flex-row" {...props}>
        {values.map((val, index, array) => {
          let classAddon = "";
          if (index === 0)
            classAddon = "rounded-tl-md rounded-bl-md border-l-2";
          if (index === array.length - 1)
            classAddon = "rounded-br-md rounded-tr-md";

          if (val === selected) classAddon += " bg-black text-white";

          return (
            <div
              key={`rating_option_${val}`}
              className={`flex cursor-pointer select-none items-center justify-center border-t-2 border-b-2 border-r-2 border-black bg-slate-200 px-2 py-1 font-sans font-bold transition hover:shadow-md ${classAddon}`}
              onClick={() => changeHandle(val)}
            >
              {val}
            </div>
          );
        })}
      </div>
    );
  }
);

export default Select;
