import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { getUserModel } from '../db/models/user';
import { getSquadModel } from '../db/models/squad';

dotenv.config();

const connections: { [key: string]: mongoose.Connection } = {};

export default async function connectDatabase(dbName: string) {
  if (
    connections[dbName] &&
    (connections[dbName].readyState === 1 ||
      connections[dbName].readyState === 2)
  ) {
    return connections[dbName];
  }

  const mongoUri = process.env.MONGODB_URI as string;

  try {
    const dbConnection = mongoose.createConnection(mongoUri, {
      dbName,
    });

    getUserModel(dbConnection);
    getSquadModel(dbConnection);

    connections[dbName] = dbConnection;
    console.log(`Connected to database: ${dbName}`);
    return dbConnection;
  } catch (err) {
    console.error('MongoDB connection error:', err);
    throw err;
  }
}
