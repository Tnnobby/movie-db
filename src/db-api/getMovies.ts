import { MongoClient } from "mongodb";

const getMovies = async () => {
  const client = new MongoClient(process.env.MONGODB_URI as string); // Connect to DB
  const db = client.db("movie-db"); // Get Database
  const movies = db.collection("movies"); // Get Movie Collection

  const cursor = movies.find();
  const result = await cursor.toArray();
  await client.close();

  return result;
};

export default getMovies;
