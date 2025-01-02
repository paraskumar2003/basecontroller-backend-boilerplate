import * as dotenv from "dotenv";
dotenv.config();
import { DataSource } from 'typeorm'
import * as entities from '../entity/mysql'
import { join } from 'path'


export const AppDataSource = new DataSource({
    type: 'mysql',
    host:
        process.env.NODE_ENV === 'production'
            ? process.env.DB_PROD_HOST
            : process.env.DB_HOST,
    username:
        process.env.NODE_ENV === 'production'
            ? process.env.DB_PROD_USER
            : process.env.DB_USER,
    password:
        process.env.NODE_ENV === 'production'
            ? process.env.DB_PROD_PASSWORD
            : process.env.DB_PASSWORD,
    port: 3306,
    database:
        process.env.NODE_ENV === 'production'
            ? process.env.DB_PROD_NAME
            : process.env.DB_NAME,
    logging: false,
    synchronize: false,
    migrations: [join(__dirname, '../migrations/*.{ts,js}')],
    extra: {
        connectionLimit: 10,
    },
    entities: Object.values(entities),
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: true } : false,
})
