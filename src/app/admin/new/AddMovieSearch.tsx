"use client";

import Search, { SearchRef } from "@/ui/Search";
import SearchResult from "@/ui/SearchResult";
import { MovieResult } from "moviedb-promise";
import Image from "next/image";
import { ReactNode, useRef } from "react";

export type AddMovieSearchProps = {
  onSelect: (movie: MovieResult) => void;
};

const AddMovieSearch = ({ onSelect }: AddMovieSearchProps) => {
  const searchRef = useRef<SearchRef>(null);

  const searchHandle = async (searchTerm: string) => {
    const searchParams = new URLSearchParams();
    searchParams.append("term", searchTerm);
    searchParams.append("type", "movie")
    return fetch(`/api/search?${searchParams.toString()}`)
      .then((res) => res.json())
      .then((final) => final.results);
  };

  const renderSearchContainer: (children: ReactNode) => ReactNode = (
    children
  ) => {
    return (
      <div className="flex flex-col">
        <div className="flex flex-row flex-wrap justify-between gap-y-2">
          {children}
          {new Array(5).fill("").map((_, i) => (
            <div className="h-0 w-32" key={`ph_${i}`}/>
          ))}
        </div>
        <div className="flex flex-row justify-end font-sans text-xs ">
          <Image
            src={{ src: "/TMDB-long.svg", height: 11.682, width: 139.6032 }}
            alt="Data from TMDB"
          />
        </div>
      </div>
    );
  };

  const renderSearchItems: (item: MovieResult) => ReactNode = (item) => {
    return (
      <SearchResult
        data={item}
        onClick={(data) => {
          onSelect(data);
          searchRef.current?.close();
        }}
      />
    );
  };

  return (
    <Search
      ref={searchRef}
      placeholder="Search TMDB"
      onSearch={searchHandle}
      renderContainer={renderSearchContainer}
      renderItems={renderSearchItems}
    />
  );
};

export default AddMovieSearch;
