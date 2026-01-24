import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const BASE_URL = process.env.BASE_URL_DB;

export const sequelize = new Sequelize(BASE_URL, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },
    logging: false,
});