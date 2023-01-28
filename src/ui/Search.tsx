"use client";

import {
  forwardRef,
  ReactNode,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import cn from "classnames";
import SearchBar, { SearchBarProps } from "./SearchBar";
import { MovieResult } from "moviedb-promise";

type SearchProps<Type> = {
  data?: Type[];
  renderContainer: (children: ReactNode) => ReactNode;
  renderItems: (item: Type) => ReactNode;
  placeholder?: string;
  onSearch?: (val: string) => Promise<Type[]>;
  searchBarProps?: Omit<SearchBarProps, "placeholder" | "onSearch">;
};

export type SearchRef = {
  close: () => void;
};

const Search = forwardRef<SearchRef, SearchProps<MovieResult>>(
  (
    {
      searchBarProps,
      data,
      renderContainer,
      renderItems,
      placeholder,
      onSearch,
      ...props
    },
    ref
  ) => {
    const [searching, setSearching] = useState<boolean>(false);
    const [results, setResults] = useState<MovieResult[]>();

    const close = () => setSearching(false);

    useImperativeHandle(
      ref,
      () => ({
        close,
      }),
      []
    );

    const searchHandle = async (searchTerm: string) => {
      if (onSearch) setResults(await onSearch(searchTerm));
    };

    useEffect(() => {
      console.log(results);
    }, [results]);

    return (
      <>
        <div
          className="z-20 bg-white transition-all relative"
        >
          <SearchBar
            onFocus={() => setSearching(true)}
            className={cn(
              "transition",
              { "rounded-br-none rounded-bl-none": searching && results },
              searchBarProps?.className
            )}
            placeholder={placeholder}
            onSearch={searchHandle}
            onClear={() => setResults(undefined)}
            {...props}
          />
          {searching && results && (
            <div className="absolute scrollbar-hide bg-white max-h-96 w-full overflow-scroll rounded-b-md border-l-2 border-r-2 border-b-2 border-slate-600 p-4 shadow-lg">
              {renderContainer(
                <>{results.map((movie) => renderItems(movie))}</>
              )}
            </div>
          )}
        </div>
        <div
          className="absolute top-0 left-0 z-10 h-full w-full bg-slate-300 backdrop-blur-md transition-all"
          onClick={() => setSearching(false)}
          style={{
            opacity: searching ? 0.25 : 0,
            pointerEvents: searching ? "initial" : "none",
          }}
        />
      </>
    );
  }
);

Search.displayName = "Search";
export default Search;
