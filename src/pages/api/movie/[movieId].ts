import {
  CreditsResponse,
  MovieDb,
  MovieReleaseDatesResponse,
  MovieResponse,
} from "moviedb-promise";
import { NextApiRequest, NextApiResponse } from "next";

export type AppendedReponse = MovieResponse & {
  credits?: CreditsResponse;
  release_dates?: MovieReleaseDatesResponse;
};

type Response = {
  results?: AppendedReponse;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  const { movieId } = req.query;
  if (!movieId || typeof movieId !== "string") {
    res.status(400).json({ error: "Invalid MovieID" });
    return;
  }

  const client = new MovieDb(process.env.TMDB_KEY as string);

  const response: AppendedReponse = await client.movieInfo({
    id: movieId,
    append_to_response: "release_dates,credits",
  });

  const release_date = response.release_dates?.results?.find(
    (res) => res.iso_3166_1 == "US"
  );

  const processedResponse: AppendedReponse = {
    ...response,
    release_dates: {
      results: release_date ? [release_date] : undefined,
    },
  };

  res.status(200).json({ results: processedResponse });
}
