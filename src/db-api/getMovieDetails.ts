import { AppendedReponse } from "@/pages/api/movie/[movieId]";
import { Movie } from "@/ui/types";
import { MongoClient, ObjectId } from "mongodb";
import { MovieDb, MovieResponse } from "moviedb-promise";

const getMovieDetails: (
  movieId: string
) => Promise<(Movie & MovieResponse) | undefined> = async (movieId: string) => {
  const client = new MongoClient(process.env.MONGODB_URI as string); // Connect to DB
  const db = client.db("movie-db"); // Get Database
  const movies = db.collection("movies"); // Get Movie Collection

  const mongoData = await movies.findOne({ _id: new ObjectId(movieId) });

  client.close()

  if (mongoData) {
    // Doc found
    const tmdbClient = new MovieDb(process.env.TMDB_KEY as string);

    const tmdbData: AppendedReponse = await tmdbClient.movieInfo({
      id: (mongoData as unknown as Movie).tmdb_id,
      append_to_response: "release_dates,credits",
    });

    return {
      ...tmdbData,
      ...(mongoData as unknown as Movie),
    };
  } else {
    // No doc found
    return;
  }
};

export default getMovieDetails;
