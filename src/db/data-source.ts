import 'dotenv/config';
import { User } from '../users/user.entity';
import { DataSource } from 'typeorm';
import { Event } from '../events/event.entity';

const base = {
  type: 'postgres' as const,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT ?? '5432', 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
};

export default new DataSource({
  ...base,
  entities: [User, Event],
  migrations: ['src/migrations/*{.ts,.js}'],
  synchronize: false,
});
