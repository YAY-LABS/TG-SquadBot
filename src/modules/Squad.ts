import mongoose, { Model } from 'mongoose';
import { ISquad } from '../db/models/squad';
import type { CreateSquadBody } from '../types/squad';

export async function findSquads(
  SquadModel: Model<ISquad>,
  query: any,
  sortBy?: string
): Promise<any> {
  try {
    if (sortBy === 'score') {
      // 정렬 조건이 'score'일 때 Aggregation 파이프라인 사용
      const squads = await SquadModel.aggregate([
        {
          $match: query, // 쿼리 조건 적용
        },
        {
          $lookup: {
            from: 'users', // User 컬렉션
            localField: 'members',
            foreignField: '_id',
            as: 'membersInfo',
          },
        },
        {
          $addFields: {
            totalScore: { $sum: '$membersInfo.score' },
          },
        },
        {
          $sort: { totalScore: -1 }, // 총 점수를 기준으로 내림차순 정렬
        },
        {
          $project: {
            membersInfo: 0, // 멤버 정보는 결과에서 제외 (필요에 따라 수정 가능)
          },
        },
      ]);
      console.log({ squads });
      return squads;
    } else {
      const squads = await SquadModel.find(query).populate('members');
      console.log({ squads });
      return squads;
    }
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
