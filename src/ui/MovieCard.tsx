"use client";

import cn from "classnames";
import Link from "next/link";
import { HTMLAttributes, useState } from "react";
import { BsArrowRightShort } from "react-icons/bs";
import Poster from "./Poster";
import StarIcon from "./StarIcon";
import { Movie, UIComponent } from "./types";

export type MovieCardProps = {
  data: Movie;
} & UIComponent &
  HTMLAttributes<HTMLDivElement>;

const MovieCard = ({ className, data, ...props }: MovieCardProps) => {
  const [hovering, setHovering] = useState(false);

  return (
    <div
      className={cn(
        "relative flex aspect-movie cursor-pointer items-center justify-center overflow-hidden rounded-lg shadow-sm transition hover:shadow-md lg:w-48",
        className
      )}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      {...props}
    >
      <div
        className={cn(
          "absolute flex h-full w-full flex-col justify-between overflow-hidden px-2 py-1 backdrop-blur-none transition-all hover:backdrop-blur-[3px] hover:backdrop-brightness-75",
          { "": hovering }
        )}
      >
        <div
          className={cn(
            "-translate-y-10 self-center text-lg font-bold text-white transition-all ",
            { "translate-y-0": hovering }
          )}
        >
          {data.title}
        </div>
        <div
          className={cn(
            "flex flex-row items-center justify-between transition-all",
            { "translate-y-10": !hovering },
            {
              "translate-y-0": hovering,
            }
          )}
        >
          <div className="flex">
            <div className="font-bold text-white">{data.stars / 2}</div>
            <div className="relative ml-1 h-6 py-1">
              <StarIcon fill="gold" height="100%" width="100%" />
            </div>
          </div>
          <Link
            className={cn(
              "relative overflow-hidden text-sm text-white underline-offset-2 hover:cursor-pointer",
              "after:absolute after:left-0 after:bottom-0 after:h-px after:w-full after:-translate-x-full after:bg-white after:transition-all hover:after:translate-x-0"
            )}
            onClick={(e) => e.stopPropagation()}
            href={`/movies/${data._id}`}
          >
            Read Review
            <BsArrowRightShort className="inline" />
          </Link>
        </div>
      </div>
      <Poster
        className={cn("transition-all", { "-z-10 scale-[102%]": hovering })}
        uri={data.poster_path}
        alt={data.title}
      />
    </div>
  );
};

export default MovieCard;
