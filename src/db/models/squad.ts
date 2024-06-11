import mongoose, { Connection, Document, Schema } from 'mongoose';

export interface ISquad extends Document {
  chatId: number;
  username: string;
  title: string;
  shareLink: string;
  members: mongoose.Types.ObjectId[];
  photo: string;
  createdAt: Date;
  updatedAt: Date;
}

const SquadSchema = new Schema(
  {
    chatId: { type: Number, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    shareLink: { type: String, required: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    photo: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const getSquadModel = (connection: Connection) => {
  return connection.model<ISquad>('Squad', SquadSchema);
};
