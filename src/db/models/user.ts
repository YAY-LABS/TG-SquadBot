import mongoose, { Document, Schema, Connection } from 'mongoose';

export interface IUser extends Document {
  userId: string;
  score: number;
  squad?: mongoose.Types.ObjectId | null;
}

const UserSchema = new Schema<IUser>(
  {
    userId: { type: String, required: true, unique: true, index: true },
    score: { type: Number, default: 0 },
    squad: { type: Schema.Types.ObjectId, ref: 'Squad', default: null },
  },
  { autoIndex: false }
);

export const getUserModel = (connection: Connection) => {
  return connection.model<IUser>('User', UserSchema);
};
