import { url_db, username, password, database } from "src/configuration";
import { ConnectionOptions } from "typeorm";

export const JWT_SECRET = 'secret-secret';
export const JWT_EXPIRATION = '24h';

export const CHANNELS = [
  {
    name: 'vk',
    icon: 'https://cdn-icons-png.flaticon.com/512/145/145813.png'
  }, {
    name: 'telegram',
    icon: 'https://pngimg.com/uploads/telegram/small/telegram_PNG2.png'
  }
  // , {
  //   name: 'watsapp',
  //   icon: 'https://pngimg.com/uploads/whatsapp/whatsapp_PNG95149.png'
  // }
]

export  const ormconfig: ConnectionOptions = {
  type: 'postgres',
  url: url_db,
  username: username,
  password: password,
  database: database,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true,
}
