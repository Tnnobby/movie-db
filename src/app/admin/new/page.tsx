"use client";

import { Movie } from "@/ui/types";
import { MovieResult } from "moviedb-promise";
import { useReducer } from "react";
import AddMovieSearch from "./AddMovieSearch";
import ReviewForm from "./ReviewForm";

type ActionTypes = "SET_TMDB_DATA";
type MovieState = {
  tmdbData?: MovieResult;
  dbData?: Movie;
};
type MovieAction = {
  type: ActionTypes;
  data?: any;
};

const movieReducer: (state: MovieState, action: MovieAction) => MovieState = (
  state: MovieState,
  action: MovieAction
) => {
  console.log("action:", action);
  switch (action.type) {
    case "SET_TMDB_DATA":
      return {
        ...state,
        tmdbData: action.data,
      };

    default:
      return state;
  }
};
const initialState: MovieState = {
  dbData: undefined,
  tmdbData: undefined,
};

const Page = () => {
  const [movie, dispatchMovie] = useReducer(movieReducer, initialState);

  return (
    <div className="flex flex-col gap-4">
      <div className="mx-28">
        <AddMovieSearch
        onSelect={(movie) =>
          dispatchMovie({ type: "SET_TMDB_DATA", data: movie })
        }
      />
      </div>
      
      {movie.tmdbData && <ReviewForm data={movie.tmdbData} />}
    </div>
  );
};

export default Page;
