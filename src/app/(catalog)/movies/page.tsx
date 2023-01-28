"use client";

import MovieCard from "@/ui/MovieCard";
import { Movie } from "@/ui/types";
import { useEffect, useState } from "react";
import MovieOverlay from "./MovieOverlay";

const Movies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [preview, setPreview] = useState<Movie>();

  useEffect(() => {
    fetch("/api/catalog/movies")
      .then((res) => res.json())
      .then((final) => {
        if (final.results) {
          setMovies(final.results);
        }
      });
  }, []);

  return (
    <div>
      <MovieOverlay
        data={preview}
        onClickOff={() => setPreview(undefined)}
      />
      <div className="z-10 flex flex-wrap gap-4 justify-center">
        {movies &&
          movies.map((val) => (
            <MovieCard
              key={`movie_${val._id}`}
              data={val as any as Movie}
              onClick={() => setPreview(val)}
            />
          ))}
          {new Array(5).fill('').map(() => <div className="lg:w-48 h-0"/>)}
      </div>
    </div>
  );
};

export default Movies;
