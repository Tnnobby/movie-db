import { AppendedReponse } from "@/pages/api/movie/[movieId]";
import Image from "next/image";
import Poster from "./Poster";
import StarRatingSelect from "./StarRatingSelect";
import Tag from "./Tag";
import Title from "./Title";

export type MovieSummaryProps = {
  data: AppendedReponse;
};

const MovieSummary = ({ data }: MovieSummaryProps) => {
  return (
    <div className="flex h-full w-full flex-row gap-4">
      <div className="h-fit">
        <Poster
          uri={data.poster_path}
          alt={data.title}
          className="w-48 overflow-hidden rounded-md"
        />
      </div>
      <div className="flex flex-grow flex-col gap-2">
        <div className="flex flex-row justify-between">
          <Title className="text-3xl">{data.title}</Title>
          <div className="flex flex-row gap-1 font-bold text-2xl">
            <Image
              src={"/TMDB-full.svg"}
              alt="TMDB Rating: "
              width={185.04 / 5}
              height={133.4 / 5}
            />
            {data.vote_average}
          </div>
        </div>
        <div className="flex flex-row gap-2">
          {data.genres?.map((genre) => (
            <Tag key={`genre_${genre.id}`}>{genre.name}</Tag>
          ))}
        </div>
        <div className="text-lg">{data.overview}</div>
        <div>
          <div className="inline font-bold">Starring: </div>
          <i>
            {data.credits?.cast
              ?.slice(0, 3)
              .map((cast, index) => `${cast.name}`)
              .join(", ")}
          </i>
        </div>
      </div>
    </div>
  );
};

export default MovieSummary;
