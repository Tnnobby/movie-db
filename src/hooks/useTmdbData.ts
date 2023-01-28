import { MovieResponse } from "moviedb-promise";
import { useRef, useState } from "react";

const useTmdbData: () => [
  MovieResponse | undefined,
  (id: number) => Promise<any>
] = () => {
  const cache = useRef<{ [key: number]: any }>({});
  const [data, setData] = useState<MovieResponse>();

  const fetchMovieData = async (id: number) => {
    if (cache.current[id]) {
      setData(cache.current[id]);
      return;
    } else {
      setData(undefined);
    }
    return fetch(`/api/movie/${id}`)
      .then((res) => res.json())
      .then((final) => {
        setData(final.results);
        cache.current[id] = final.results;
        return final.results;
      });
  };

  return [data, fetchMovieData];
};

export default useTmdbData;
