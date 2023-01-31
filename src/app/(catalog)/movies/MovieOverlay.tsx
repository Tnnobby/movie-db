import useTmdbData from "@/hooks/useTmdbData";
import LoadingContainer from "@/ui/LoadingContainer";
import Overlay, { OverlayProps } from "@/ui/Overlay";
import Poster from "@/ui/Poster";
import StarRatingSelect from "@/ui/StarRatingSelect";
import Tag from "@/ui/Tag";
import Title from "@/ui/Title";
import { Movie } from "@/ui/types";
import { useEffect, useState } from "react";

export type MovieOverlayProps = OverlayProps & {
  data?: Movie;
};

const MovieOverlay = ({ data, ...props }: MovieOverlayProps) => {
  const [tmdbData, fetchData] = useTmdbData();
  const [tempData, setTempData] = useState(data);

  useEffect(() => {
    if (data) {
      fetchData(data.tmdb_id);
    }
  }, [data, fetchData]);

  useEffect(() => {
    if (data && data !== tempData) setTempData(data);
  }, [data, tempData]);

  return (
    <Overlay open={!!data} {...props}>
      {tempData && tmdbData ? (
        <div className="flex h-full w-full flex-row gap-4">
          <div className="h-fit">
            <Poster
              uri={tempData.poster_path}
              alt={tempData.title}
              className="w-48 overflow-hidden rounded-md"
            />
          </div>
          <div className="flex flex-grow flex-col gap-2">
            <div className="flex flex-row justify-between">
              <Title className="text-3xl">{tempData.title}</Title>
              <StarRatingSelect
                initialValue={tempData.stars}
                editable={false}
                color="black"
                labelShown={false}
                size="small"
              />
            </div>
            <div className="flex flex-row gap-2">
              {tmdbData.genres?.map((genre) => (
                <Tag key={`genre_${genre.id}`}>{genre.name}</Tag>
              ))}
            </div>
            <div className="text-lg">{tmdbData.overview}</div>
            <div>
              <div className="inline font-bold">Starring: </div>
              <i>
                {tmdbData.credits?.cast
                  ?.slice(0, 3)
                  .map((cast, index) => `${cast.name}`)
                  .join(", ")}
              </i>
            </div>
          </div>
        </div>
      ) : (
        <LoadingContainer />
      )}
    </Overlay>
  );
};

export default MovieOverlay;
