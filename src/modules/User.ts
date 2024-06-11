import mongoose, { Model } from 'mongoose';
import { IUser } from '../db/models/user';

export async function createUser(
  UserModel: Model<IUser>,
  userId: number
): Promise<any> {
  try {
    const user = await new UserModel({ userId, score: 0 }).save();
    console.log('create user', user);
    return user;
  } catch (error) {
    console.error({ error });
    if (error instanceof mongoose.Error) {
      throw {
        message: 'An error occurred while creating the user',
      };
    } else {
      throw {
        message: 'A network error has occurred.',
      };
    }
  }
}

export async function findUser(
  UserModel: Model<IUser>,
  userId: number
): Promise<any> {
  try {
    const user = await UserModel.findOne({ userId });
    console.log('find user', user);
    if (user?.squad) {
      return user.populate('squad');
    } else {
      return user;
    }
  } catch (error) {
    console.error({ error });
    if (error instanceof mongoose.Error) {
      throw {
        message: 'An error occurred while finding the user',
      };
    } else {
      throw {
        message: 'A network error has occurred.',
      };
    }
  }
}

export async function updateUser(
  UserModel: Model<IUser>,
  userId: number,
  updateData: any
): Promise<any> {
  try {
    const user = await UserModel.findOneAndUpdate({ userId }, updateData);
    console.log('update user', user);
    return user;
  } catch (error) {
    console.error({ error });
    if (error instanceof mongoose.Error) {
      throw {
        message: 'An error occurred while updating the user',
      };
    } else {
      throw {
        message: 'A network error has occurred.',
      };
    }
  }
}
