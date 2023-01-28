"use client";

import {
  CSSProperties,
  FormEventHandler,
  forwardRef,
  InputHTMLAttributes,
  useCallback,
  useEffect,
  useState,
} from "react";
import cn from "classnames";
import SearchIcon from "./SearchIcon";
import { useDebounce } from "use-debounce";

export type SearchBarProps = InputHTMLAttributes<HTMLInputElement> & {
  onSearch?: (val: string) => void;
  onClear?: () => void;
  containerStyle?: CSSProperties;
};

const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(
  ({ className, onSearch, onClear, containerStyle, ...props }, ref) => {
    const [searchTerm, setSearchTerm] = useState<string>();
    const [debouncedSearchTerm] = useDebounce(searchTerm, 500);

    useEffect(() => {
      if (debouncedSearchTerm && onSearch) onSearch(debouncedSearchTerm);
      if (debouncedSearchTerm === "" && onClear) onClear();
    }, [debouncedSearchTerm, onSearch, onClear]);

    const searchHandle = useCallback<FormEventHandler<HTMLFormElement>>(
      (ev) => {
        ev.preventDefault();
        if (searchTerm && onSearch) onSearch(searchTerm);
      },
      [searchTerm, onSearch]
    );

    return (
      <form
        className={cn(
          "flex flex-row overflow-hidden rounded-md border-2 border-black bg-slate-200 placeholder-slate-600 transition-all focus-within:border-slate-600 focus-within:bg-white hover:shadow-md",
          className
        )}
        onSubmit={searchHandle}
        style={containerStyle}
      >
        <input
          id="term"
          name="term"
          className="flex-grow bg-transparent py-1 px-2 outline-none"
          ref={ref}
          onChange={(ev) => setSearchTerm(ev.target.value)}
          {...props}
        />
        <button
          type="submit"
          className="py-1 px-1 transition-colors hover:bg-slate-300"
        >
          <SearchIcon />
        </button>
      </form>
    );
  }
);

SearchBar.displayName = "SearchBar";
export default SearchBar;
