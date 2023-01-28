import getMovies from "@/db-api/getMovies";
import { Movie } from "@/ui/types";
import { WithId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

type Response = {
  results?: WithId<any>[];
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  const movies = await getMovies()
  if (movies) res.status(200).json({results: movies})
}