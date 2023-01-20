import { Movie } from "@/ui/types";
import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

type Data = {
  result: boolean;
  response?: any;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const data = req.body as Movie;

  const client = new MongoClient(process.env.MONGODB_URI as string); // Connect to DB
  const db = client.db("movie-db"); // Get Database
  const movies = db.collection("movies"); // Get Movie Collection
  if (data) {
    movies.insertOne(data).then((response) => {
      res.status(200).json({ result: true, response });
    });
  }
  res.status(400).json({ result: false });
}
