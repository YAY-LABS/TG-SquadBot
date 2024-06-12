import express from 'express';
import axios from 'axios';
import mongoose from 'mongoose';
import connectDatabase from '../lib/mongoose';
import { adminBot } from '../modules/Bot';
import { getUserModel } from '../db/models/user';
import { getSquadModel } from '../db/models/squad';
import { findSquads, createSquad, updateSquad } from '../modules/Squad';
import { createUser, findUser, updateUser } from '../modules/User';

const router = express.Router();

router.get('/chat', async (req, res) => {
  const { username } = req.query;
  if (!username) {
    res.json({ error: 'username is required' });
    return;
  }

  adminBot
    .getChat(username as string)
    .then((data: any) => {
      console.log({ data });
      res.status(200).json({ chat: data });
    })
    .catch((error: any) => {
      console.log({ error });
      res.status(error.response.statusCode).json(error);
    });
});

router.post('/user', async (req, res) => {
  const token = req.headers.authorization as string;
  const { userId } = req.body;
  const dbName = token.split(':')[0];

  try {
    const dbConnection = await connectDatabase(dbName);
    const UserModel = getUserModel(dbConnection);
    const user = await createUser(UserModel, userId);
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.get('/user/:userId', async (req, res) => {
  const token = req.headers.authorization as string;
  const { userId } = req.params;
  const dbName = token.split(':')[0];

  console.log(userId);

  if (!userId) {
    return res.json({ error: 'userId is required' });
  }

  try {
    const dbConnection = await connectDatabase(dbName);
    const UserModel = getUserModel(dbConnection);
    const user = await findUser(UserModel, userId);
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.get('/squads', async (req, res) => {
  const token = req.headers.authorization as string;
  const dbName = token.split(':')[0];
  console.log('dbName', dbName);
  try {
    const dbConnection = await connectDatabase(dbName);
    const SquadModel = getSquadModel(dbConnection);
    const squads = await findSquads(SquadModel, {});
    res.status(200).json(squads);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.get('/squads/:squadId', async (req, res) => {
  const token = req.headers.authorization as string;
  const { squadId } = req.params;
  const dbName = token.split(':')[0];

  console.log('get squad squadId', squadId);

  if (!squadId) {
    return res.json({ error: 'squadId is required' });
  }

  try {
    const dbConnection = await connectDatabase(dbName);
    const SquadModel = getSquadModel(dbConnection);
    const squad = await findSquads(SquadModel, { chatId: squadId });
    if (!squad) {
      return res.status(500).json({ message: `Can't find squad` });
    }
    res.status(200).json(squad[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// 유저 스코어 업데이트 및 조회
router.post('/squads/:userId', async (req, res) => {
  const token = req.headers.authorization as string;
  const { userId } = req.params;
  const { score } = req.body;
  try {
    const dbName = token.split(':')[0];
    const dbConnection = await connectDatabase(dbName);
    const UserModel = getUserModel(dbConnection);
    const existingUser = await findUser(UserModel, userId);
    if (!existingUser) {
      await createUser(UserModel, userId);
    }
    const updatedUser = await updateUser(UserModel, userId, {
      $set: { score },
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.post('/create-squad', async (req, res) => {
  const token = req.headers.authorization as string;
  const { chatId, username, title, userId, photo } = req.body;
  const dbName = token.split(':')[0];
  console.log('dbName', dbName);
  console.log('create-squad', chatId, username, title, userId, photo);
  try {
    const dbConnection = await connectDatabase(dbName);
    const UserModel = getUserModel(dbConnection);
    const SquadModel = getSquadModel(dbConnection);
    const squads = await findSquads(SquadModel, { chatId });
    if (squads.length > 0) {
      return res.status(500).json({ message: 'Squad already exists' });
    }

    const user = await findUser(UserModel, userId);
    if (!user) {
      return res.status(500).json({ message: 'You are not a user' });
    }

    const shareLink = `https://t.me/${username}`;
    const profilePhoto = photo
      ? await adminBot.getFile(photo.big_file_id)
      : { file_path: 'default' };
    console.log(profilePhoto);
    const savedSquad = await createSquad(SquadModel, {
      chatId,
      username,
      title,
      shareLink,
      userId: user._id,
      photo: profilePhoto.file_path,
    });
    await updateUser(UserModel, userId, {
      $set: { squad: savedSquad._id },
    });
    if (user.squad) {
      await updateSquad(SquadModel, user.squad.username, {
        $pull: { members: { $in: [user._id] } },
      });
    }

    res.status(200).json(savedSquad);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.post('/join-squad', async (req, res) => {
  const token = req.headers.authorization as string;
  const { username, userId } = req.body;
  const dbName = token.split(':')[0];
  console.log('join squad', username, userId);
  try {
    const dbConnection = await connectDatabase(dbName);
    const UserModel = getUserModel(dbConnection);
    const SquadModel = getSquadModel(dbConnection);
    const user = await findUser(UserModel, userId);
    const existingSquads = await findSquads(SquadModel, { username });
    if (existingSquads.length === 0) {
      return res.status(404).json({ message: 'Squad not found' });
    }
    console.log('judy user id', user._id);
    if (user.squad) {
      const isMember = existingSquads[0].members.some(
        (member: mongoose.Types.ObjectId) => member.equals(user._id)
      );
      if (isMember) {
        return res
          .status(400)
          .json({ message: 'User is already a member of the squad' });
      } else {
        await updateSquad(SquadModel, user.squad.username, {
          $pull: { members: { $in: [user._id] } },
        });
      }
    }
    const updatedsquad = await updateSquad(SquadModel, username, {
      $push: { members: user._id },
    });
    await updateUser(UserModel, userId, {
      $set: { squad: updatedsquad._id },
    });
    res.status(200).json(updatedsquad);
  } catch (error) {
    console.log(error);
    console.log('internal', error);
    res.status(500).json(error);
  }
});

router.post('/leave-squad', async (req, res) => {
  const token = req.headers.authorization as string;
  const { userId } = req.body;
  const dbName = token.split(':')[0];
  console.log(userId);
  try {
    const dbConnection = await connectDatabase(dbName);
    const UserModel = getUserModel(dbConnection);
    const SquadModel = getSquadModel(dbConnection);
    const user = await findUser(UserModel, userId);
    if (!user.squad) {
      return res
        .status(404)
        .json({ message: 'User is not a member of any squad' });
    }

    await updateSquad(SquadModel, user.squad.username, {
      $pull: { members: { $in: [user._id] } },
    });

    const updatedUser = await updateUser(UserModel, userId, {
      $set: { squad: null },
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.get('/profile-photo', async (req, res) => {
  const photo = req.query.photo;
  try {
    if (photo === 'default') {
      return;
    }
    console.log('profile photo', photo);
    const filePath = `https://api.telegram.org/file/bot${process.env.TELEGRAM_NNN_SQUAD_BOT}/${photo}`;
    const response = await axios({
      url: filePath,
      method: 'GET',
      responseType: 'stream',
    });
    response.data.pipe(res);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error downloading file');
  }
});

export default router;
