import mongoose, { Mongoose } from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;

interface MongooseConnection {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

/**
 * In next.js we connect to the DB everytime we are making an API request.
 * Beacuse next.js runs in serverless environment.
 * Serverless funcitons are stateless
 * Meaning they startup perform the action and shutdown again. So they are not maintaining a continuous
 * connection
 *
 * This approach makes sure that each request is handled independently.
 * But it also means we need to make sure that there are optimisations.
 *
 * So we need to resort to caching.
 * If we are not doing so it will lead to too many connections.
 */

let cached: MongooseConnection = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = {
    conn: null,
    promise: null,
  };
}

export const connectToDatabase = async () => {
  if (cached.conn) return cached.conn; // This is the optimisation that we are making
  if (!MONGODB_URL) throw new Error("Missing MongoDB URL");
  cached.promise =
    cached.promise ||
    mongoose.connect(MONGODB_URL, {
      dbName: "imaginify",
      bufferCommands: false,
    });

  cached.conn = await cached.promise;
};
