import getMovieDetails from "@/db-api/getMovieDetails";
import MovieSummary from "@/ui/MovieSummary";
import { PageProps } from "@/ui/types";
import Link from "next/link";
import { BsChevronLeft } from "react-icons/bs";

const Page = async ({
  params: { movieId = null },
}: PageProps<{ movieId: string | null }>) => {
  const movieData = await getMovieDetails(movieId);

  return (
    movieData && (
      <>
        <Link
          href="/movies"
          className="rounded-md bg-slate-200 px-2 py-1 text-lg font-bold transition hover:bg-slate-300 focus:bg-slate-400"
        >
          <BsChevronLeft strokeWidth={1.5} className="mb-1 mr-px inline" />
          Back to Movies
        </Link>

        <MovieSummary data={movieData} />
      </>
    )
  );
};

export default Page;
