import { NextApiRequest, NextApiResponse } from "next";
import { MovieDb, MovieResult } from "moviedb-promise";

type Response = {
  results?: MovieResult[];
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  if (!req.query) {
    res.status(400).json(req.query);
    return;
  }
  const { term }: { term?: string } = req.query;
  if (!term) {
    res.status(400).json({ error: "Invalid Request: Missing term parameter" });
    return;
  }

  const client = new MovieDb(process.env.TMDB_KEY as string);
  const result = await client.searchMovie({ query: term });
  if (!result.results) {
    res.status(400).json({ error: `No Results found for query: '${term}'` });
    return;
  }

  const urlAdjustedResults = result.results.map((movie) => ({
    ...movie,
    backdrop_path: movie.backdrop_path
      ? (process.env.IMAGE_BASE_URL as string) + movie.backdrop_path
      : undefined,
    poster_path: movie.poster_path
      ? (process.env.IMAGE_BASE_URL as string) + movie.poster_path
      : undefined,
  }));

  res.status(200).json({ results: urlAdjustedResults });
}
