
import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = "mongodb+srv://shabahatsyed101:Hyderabad@007@cluster0.n32mkke.mongodb.net/cause";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

export async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    return client.db("cause");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    throw error;
  }
}

export function getClient() {
  return client;
}
