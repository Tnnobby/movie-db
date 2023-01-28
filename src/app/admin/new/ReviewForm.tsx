"use client";

import Button from "@/ui/Button";
import Poster from "@/ui/Poster";
import ReleaseDate from "@/ui/ReleaseDate";
import StarRatingSelect, { StarRatingSelectRef } from "@/ui/StarRatingSelect";
import TextArea from "@/ui/TextArea";
import TextField from "@/ui/TextField";
import Title from "@/ui/Title";
import { Movie } from "@/ui/types";
import VDivider from "@/ui/VDivider";
import { MovieResult } from "moviedb-promise";
import { FormEventHandler, useRef } from "react";

export type ReviewFormProps = {
  data?: MovieResult;
};

const ReviewForm = ({ data }: ReviewFormProps) => {
  const starRef = useRef<StarRatingSelectRef>(null);
  const reviewRef = useRef<HTMLTextAreaElement>(null);
  const watchRef = useRef<HTMLInputElement>(null);

  const submitHandle: FormEventHandler<HTMLFormElement> = (ev) => {
    // TODO : Refactor and clean this mess up
    ev.preventDefault();
    const review = reviewRef.current?.value;
    const stars = starRef.current?.value;
    const watch = watchRef.current?.valueAsNumber;
    console.log("submit");
    if (
      !review ||
      !stars ||
      !watch ||
      !data?.id ||
      !data.poster_path ||
      !data.title
    )
      return;
    const query: Movie = {
      review: review,
      title: data.title,
      stars: stars,
      tmdb_id: data?.id,
      poster_path: data.poster_path,
      watch_date: watch
    };

    fetch("/api/new", { method: "POST", body: JSON.stringify(query) })
      .then((val) => val.json())
      .then((result) => console.log(result));
  };

  return (
    <div className="flex flex-row gap-4">
      <div className="flex flex-col lg:w-60">
        <div className="overflow-hidden rounded-md">
          <Poster
            uri={data?.poster_path as string}
            alt={data?.title as string}
          />
        </div>
        <div className="mt-2 text-sm">
          <b>Release Date:</b> <ReleaseDate date={data?.release_date} />
        </div>
      </div>
      <div className="flex w-full flex-col">
        <Title>{data?.title}</Title>
        <VDivider />
        <form onSubmit={submitHandle} className="contents">
          <div className="flex justify-between">
            <StarRatingSelect ref={starRef} />
            <input
              className="rounded-md border-2 border-black bg-slate-200 px-2 py-1 outline-none transition focus-within:bg-white hover:shadow-md"
              type="date"
              name="watch_day"
              ref={watchRef}
              onClick={({ currentTarget }) => currentTarget.focus()}
            />
          </div>
          <TextArea
            ref={reviewRef}
            className="mt-1 resize-none"
            rows={10}
            placeholder={`Leave review for ${data?.title}...`}
            autoCorrect="true"
            autoComplete="true"
            name="summary"
          />
          <Button type="submit" className="mt-2 self-end">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ReviewForm;
