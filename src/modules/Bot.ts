import TelegramBot from '../lib/telegramBot';
import dotenv from 'dotenv';
import executeFirstBot from '../bots/firstBot';
import executeSecondBot from '../bots/secondBot';

dotenv.config();

const bots: { [key: string]: TelegramBot } = {};

const botTokens = {
  firstBot: process.env.TELEGRAM_BOT_TOKEN as string,
  secondBot: process.env.TELEGRAM_BOT_TOKEN_2 as string,
};

// 봇 api 호출할 때 사용할 어드민 봇 객체
export const adminBot = new TelegramBot(
  process.env.TELEGRAM_NNN_SQUAD_BOT as string
  // {
  //   testEnvironment: true,
  // }
);

export function executeBots() {
  Object.entries(botTokens).forEach(([name, token]) => {
    console.log({ name, token });
    bots[name] = new TelegramBot(token, {
      polling: true,
      testEnvironment: true,
    });
  });
  executeFirstBot(bots.firstBot);
  executeSecondBot(bots.secondBot);
}
