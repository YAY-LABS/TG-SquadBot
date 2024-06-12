import mongoose, { Model } from 'mongoose';
import { ISquad } from '../db/models/squad';
import type { CreateSquadBody } from '../types/squad';

export async function findSquads(
  SquadModel: Model<ISquad>,
  query: any
): Promise<any> {
  try {
    const squads = await SquadModel.find(query).populate('members');
    console.log({ squads });
    return squads;
  } catch (error: any) {
    console.error({ error });
    if (error instanceof mongoose.Error) {
      throw {
        message: 'An error occurred while finding the squad.',
      };
    } else {
      throw {
        message: 'A network error has occurred.',
      };
    }
  }
}

export async function createSquad(
  SquadModel: Model<ISquad>,
  { chatId, username, title, shareLink, userId, photo }: CreateSquadBody
): Promise<any> {
  try {
    const currentDate = new Date();
    const squad = await new SquadModel({
      chatId,
      username,
      title,
      shareLink,
      members: [userId],
      photo: photo,
      createdAt: currentDate,
      updatedAt: currentDate,
    }).save();
    console.log({ squad });
    return squad;
  } catch (error: any) {
    console.error({ error });
    if (error instanceof mongoose.Error) {
      throw {
        message: 'An error occurred while creating the squad',
      };
    } else {
      throw {
        message: 'A network error has occurred.',
      };
    }
  }
}

export async function updateSquad(
  SquadModel: Model<ISquad>,
  username: string,
  updateData: any
): Promise<any> {
  try {
    const squad = await SquadModel.findOneAndUpdate({ username }, updateData, {
      new: true,
    });
    console.log({ squad });
    return squad;
  } catch (error: any) {
    console.error({ error });
    if (error instanceof mongoose.Error) {
      throw {
        message: 'An error occurred while finding the squad.',
      };
    } else {
      throw {
        message: 'A network error has occurred.',
      };
    }
  }
}
