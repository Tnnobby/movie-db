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
  if (!req.body) {
    res.status(400).json({ result: false });
    return
  }

  const data = JSON.parse(req.body);
  const client = new MongoClient(process.env.MONGODB_URI as string); // Connect to DB

  try {
    const db = client.db("movie-db"); // Get Database
    const movies = db.collection("movies"); // Get Movie Collection
    if (data) {
      movies.insertOne(data).then((response) => {
        res.status(200).json({ result: true, response });
      });
    }
  } finally {
    client.close();
  }
  
}
