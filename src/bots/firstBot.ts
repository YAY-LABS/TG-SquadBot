import TelegramBot from '../lib/telegramBot';

const startMenuMessage = `👋 Welcome to The Pixels Game! 🎨\nThe biggest battle btw Telegram communities. Join squad, paint goal, earn TON, invite friends for more $PXL, and keep streaks 🚀\nStart pushing right now! 🔥`;
const startMenuMessageOptions = {
  reply_markup: {
    inline_keyboard: [
      [
        {
          text: 'Play Now!',
          web_app: {
            url: 'https://doberman-humble-troll.ngrok-free.app/',
          },
        },
      ],
      [
        {
          text: 'Join Community',
          callback_data: 'click_join_community',
        },
      ],
      [
        {
          text: 'How to Play',
          callback_data: 'click_how_to_play',
        },
      ],
    ],
  },
};

export default function executeBot(bot: TelegramBot) {
  bot.onText(/\/start/, async (msg: any) => {
    const chatId = msg.chat.id;
    try {
      const playMessage = await bot.sendMessage(
        chatId,
        '<a href="https://t.me/react_demo_bot">🎮</a><a href="https://t.me/react_demo_bot">🎮</a><a href="https://t.me/react_demo_bot">🎮</a>',
        {
          parse_mode: 'HTML',
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: 'Play (🏃‍♀️ 3 531 055)',
                  url: 'https://doberman-humble-troll.ngrok-free.app/',
                },
              ],
            ],
          },
        }
      );
      await bot.pinChatMessage(chatId, playMessage.message_id);
      await bot.sendMessage(chatId, startMenuMessage, startMenuMessageOptions);
    } catch (error) {
      console.log(error);
    }
  });

  bot.onText(/\/play/, async (msg: any) => {
    const chatId = msg.chat.id;
    try {
      await bot.sendPhoto(
        chatId,
        'https://imagedelivery.net/yK3uZpv-m_elJ5lOiyeHWw/5a025009-f919-4ce0-4383-af45bbd3f400/jewel',
        {
          caption: `Hi Yescoiner, ${msg.from.first_name}\n\nSwipe finger and watch your balance grow. Invite friends and get more coins together.\n\nYescoin is what you want it to be.\n\nLet's go!`,
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: '🕹Play',
                  web_app: {
                    url: 'https://doberman-humble-troll.ngrok-free.app/form',
                  },
                },
              ],
              [
                {
                  text: 'Twitter',
                  url: 'https://doberman-humble-troll.ngrok-free.app/form',
                },
                {
                  text: 'Community',
                  url: 'https://doberman-humble-troll.ngrok-free.app/form',
                },
              ],
              [
                {
                  text: 'Chat 3',
                  url: 'https://doberman-humble-troll.ngrok-free.app/form',
                },
                {
                  text: 'Chat 4',
                  url: 'https://doberman-humble-troll.ngrok-free.app/form',
                },
              ],
              [
                {
                  text: 'Chat 5',
                  url: 'https://doberman-humble-troll.ngrok-free.app/form',
                },
                {
                  text: 'Chat 6',
                  url: 'https://doberman-humble-troll.ngrok-free.app/form',
                },
                {
                  text: 'Chat 7',
                  url: 'https://doberman-humble-troll.ngrok-free.app/form',
                },
              ],
              [
                {
                  text: '🖐How to play',
                  url: 'https://doberman-humble-troll.ngrok-free.app/form',
                },
              ],
            ],
          },
        }
      );
    } catch (error) {
      console.error('Error sending photo:', error);
    }
  });

  bot.onText(/\/menu/, async (msg: any) => {
    const chatId = msg.chat.id;
    try {
      await bot.sendMessage(chatId, startMenuMessage, startMenuMessageOptions);
    } catch (error) {
      console.log(error);
    }
  });

  bot.onText(/\/invite/, async (msg: any) => {
    const chatId = msg.chat.id;
    try {
      await bot.sendMessage(
        chatId,
        '<a href="https://t.me/react_demo_bot">🎮</a><a href="https://t.me/react_demo_bot">🎮</a><a href="https://t.me/react_demo_bot">🎮</a>',
        {
          parse_mode: 'HTML',
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: 'Invite',
                  url: 'https://doberman-humble-troll.ngrok-free.app/',
                },
              ],
            ],
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  });

  bot.onText(/\/terms/, async (msg: any) => {
    const chatId = msg.chat.id;
    try {
      await bot.sendMessage(
        chatId,
        '<a href="https://the-pixels-game.fireheadz.games/the_pixels_terms_and_conditions.pdf">Terms and Conditions</a>',
        {
          parse_mode: 'HTML',
        }
      );
    } catch (error) {
      console.log(error);
    }
  });

  bot.onText(/\/support/, async (msg: any) => {
    const chatId = msg.chat.id;
    try {
      await bot.sendMessage(
        chatId,
        'To contact our support team, please use email: support@fireheadz.games. We are always ready to help!'
      );
    } catch (error) {
      console.log(error);
    }
  });

  bot.onText(/\/faq/, async (msg: any) => {
    const chatId = msg.chat.id;
    const faqs = [
      {
        question: 'How to color a pixel and earn tokens?',
        answer: 'Press the Draw button',
      },
      {
        question: 'How to join a squad?',
        answer:
          'Press the "squads" button, choose a squad or a picture you like more, click on it and then on the Join Squad button',
      },
      {
        question: 'How to create your own squad?',
        answer:
          'Press the "squads" button, enter your Telegram channel address, upload the picture you want to color, select its size and location on the canvas, and start drawing.',
      },
      {
        question: `Why use Boosts if they don't pay off?`,
        answer:
          'Boosts are needed to color the picture faster and get more "colored by you" pixels (until they are recolored by someone else))',
      },
    ];
    const formattedFaq = faqs
      .map((faq) => `<b>${faq.question}</b>\n${faq.answer}`)
      .join('\n\n');
    try {
      await bot.sendMessage(
        chatId,
        `<b>FAQ</b>\n\nThe most important things is to enjoy the game:\n💠 Draw pixels\n💠 Mint pixels to earn more tokens\n💠 Join squads or create your own\n\n${formattedFaq}`,
        {
          parse_mode: 'HTML',
        }
      );
    } catch (error) {
      console.log(error);
    }
  });

  bot.onText(/\/appeal/, async (msg: any) => {
    const chatId = msg.chat.id;
    try {
      await bot.sendMessage(chatId, 'You have already created an appeal');
    } catch (error) {
      console.log(error);
    }
  });

  bot.on('callback_query', async (query: any) => {
    if (!query.message) {
      return;
    }
    const message = query.message;

    try {
      if (query.data === 'click_join_community') {
        await bot.editMessageText(
          'Join our community to get the latest news and updates about the game',
          {
            chat_id: message.chat.id,
            message_id: message.message_id,
            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: 'Join 🇬🇧 Community',
                    url: 'https://doberman-humble-troll.ngrok-free.app/',
                  },
                ],
                [
                  {
                    text: 'Join 🇷🇺 Community',
                    url: 'https://doberman-humble-troll.ngrok-free.app/',
                  },
                ],
                [
                  {
                    text: 'Menu',
                    callback_data: 'click_start_menu',
                  },
                ],
              ],
            },
          }
        );
      } else if (query.data === 'click_start_menu') {
        await bot.editMessageText(startMenuMessage, {
          chat_id: message.chat.id,
          message_id: message.message_id,
          ...startMenuMessageOptions,
        });
      } else if (query.data === 'click_how_to_play') {
        const howToPlayMessage = [
          {
            title: '🚀🎨 Welcome to The Pixels Battle!🎨🚀',
          },
          {
            title: 'Greetings, Warriors of Color! 👋',
            description: `You're about to embark on the grandest adventure within the Telegram realms. The Pixels is a Battle and competition among the mightiest Telegram communities!`,
          },
          {
            title: '🛡️Join Your Squad!',
            description:
              'Dive into the canvas wars, where every pixel is a battlefield, and every color you splash is a step towards glory. Your mission? To conquer the canvas with your community brilliance and strategic genius, painting your way to victory.',
          },
          {
            title: '💰 Earn TONs of Rewards!',
            description: `With every stroke of creativity, you're not just claiming territory; you're getting a chance to earn TON! The more Pixels you push, the richer you become in the realm of Pixels Battle.`,
          },
          {
            title: '👥 Bring Your Friends into the Fray!',
            description:
              'https://t.me/the_pixels_bot/play?startapp=0_304d681d-2bed-40eb-8d97-f7a71f6cacbb_2_invite-link Rally your comrades, for there is strength in numbers. The more teammates you have, the more $PXL you earn, and the greater your artistic empire will grow.',
          },
          {
            title: `🎁 Don't Let Your Streaks Fade!`,
            description:
              'Consistency is key in this colorful conquest. Keep your streaks on fire to dominate the leaderboard and secure your legacy among the legends of the Pixels Battle.',
          },
          {
            title: '📱 Open the App to Push!',
            description: `It's time to make your mark. Good Luck, Player! 🍀 May your pixels be bold and your victories bright.`,
          },
        ];
        const formattedMessage = howToPlayMessage
          .map((item) => {
            if (item.description) {
              return `${item.title}\n${item.description}`;
            } else {
              return item.title;
            }
          })
          .join('\n\n');
        await bot.editMessageText(formattedMessage, {
          chat_id: message.chat.id,
          message_id: message.message_id,
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: 'Menu',
                  callback_data: 'click_start_menu',
                },
              ],
            ],
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  });
}
