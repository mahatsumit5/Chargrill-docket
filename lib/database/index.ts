import mongoose from "mongoose";

let cached = (global as any).mongoose || { conn: null, promise: null };
export const connectToDatabase = async () => {
  const MONGO_URI = process.env.MONGO_URI;

  try {
    if (!MONGO_URI) throw new Error("Mongo URI is Missing");
    cached.promise =
      cached.promise ||
      mongoose.connect(MONGO_URI, {
        dbName: "",
        bufferCommands: false,
      });
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    console.log(error);
  }
};
