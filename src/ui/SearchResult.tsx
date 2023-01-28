import { MovieResult } from "moviedb-promise";
import Poster from "./Poster";

export type SearchResultProps = {
  data: MovieResult;
  onClick?: (data: MovieResult) => void;
};

const SearchResult = ({ data, onClick }: SearchResultProps) => {
  // TODO : Build a Missing Image placeholder
  if (!data.poster_path || !data.title) return <></>;
  return (
    <div
      className="flex w-32 flex-col items-center gap-1 cursor-pointer"
      onClick={onClick ? () => onClick(data) : undefined}
    >
      <div className="aspect-movie w-32 overflow-hidden rounded-md hover:shadown-md">
        {data.poster_path && data.title && (
          <Poster uri={data.poster_path} alt={data.title} />
        )}
      </div>
      <div className="text-sm">{data.title && data.title}</div>
    </div>
  );
};

export default SearchResult;
