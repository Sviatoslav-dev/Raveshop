import telebot

bot = telebot.TeleBot('5382046057:AAFIPxhS5sz9C_hP6D3_dm8hW9W_t9MFJ1I')
bot.config['api_key'] = '5382046057:AAFIPxhS5sz9C_hP6D3_dm8hW9W_t9MFJ1I'
print(bot.send_message(473958566, 'massage'))
