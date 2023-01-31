"use client";

import LoadingContainer from "@/ui/LoadingContainer";
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
    <>
      <MovieOverlay data={preview} onClickOff={() => setPreview(undefined)} />
      <div className="z-10 flex flex-wrap justify-center gap-4">
        {movies ? (
          <>
            {movies.map((val) => (
              <MovieCard
                key={`movie_${val._id}`}
                data={val as any as Movie}
                onClick={() => setPreview(val)}
              />
            ))}
            {new Array(5).fill("").map((_, i) => (
              <div key={`ph_${i}`} className="h-0 lg:w-48" />
            ))}
          </>
        ) : (
          <LoadingContainer />
        )}
      </div>
    </>
  );
};

export default Movies;
