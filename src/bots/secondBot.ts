import TelegramBot from '../lib/telegramBot';

export default function executeBot(bot: TelegramBot) {
  bot.onText(/\/start/, async (msg: any) => {
    const chatId = msg.chat.id;
    try {
      await bot.sendMessage(chatId, 'Welcome to the second bot');
    } catch (error) {
      console.log(error);
    }
  });
  bot.onText(/\/second/, async (msg: any) => {
    const chatId = msg.chat.id;
    try {
      await bot.sendMessage(chatId, 'play second bot');
    } catch (error) {
      console.log(error);
    }
  });
}
