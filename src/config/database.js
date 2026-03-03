import { Sequelize } from 'sequelize';
import dotenv from 'dotenv'

dotenv.config({ override: true })

const BASE_URL = process.env.DATABASE_URL || process.env.BASE_URL_DB;
const useSsl = /sslmode=require/i.test(BASE_URL || '');

export const sequelize = new Sequelize(
    BASE_URL,
    {
        dialect: 'postgres',
        dialectOptions: useSsl
            ? {
                ssl: {
                    require: true
                }
            }
            : undefined,
        logging: false
    }
) // Example for postgres

