import { MovieDb, MovieResponse } from "moviedb-promise";
import { NextApiRequest, NextApiResponse } from "next";

type Response = {
  results?: MovieResponse;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  const { movieId } = req.query;
  if (!movieId || typeof movieId !== 'string') {
    res.status(400).json({error: 'Invalid MovieID'})
    return
  }

  const client = new MovieDb(process.env.TMDB_KEY as string);

  const response = await client.movieInfo({id: movieId, append_to_response: 'release_dates,credits'});
  res.status(200).json({ results: response });
}
