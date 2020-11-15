import IConstants from './interfaces/IConstants';
import { injectable } from 'inversify';
import path from 'path';
import dotenv from 'dotenv';

let pathToEnv: string | null;

switch (process.env.NODE_ENV) {
    case 'production':
        pathToEnv = path.join(__dirname, '../../.env');
        break;
    case 'development':
        pathToEnv = path.join(__dirname, '../../.env.dev');
        break;
    case 'test':
        pathToEnv = path.join(__dirname, '../../.env.test');
        break;
    default:
        pathToEnv = path.join(__dirname, '../../.env.dev.env');
}

dotenv.config({path: pathToEnv});

@injectable()
export default class Constants implements IConstants {
    port: number = parseInt(process.env.PORT!);
    sbp = {
        key: process.env.SBP_KEY!,
        merchant: process.env.SBP_MERCHANT!,
        host: process.env.SBP_HOST!,
        prefix: process.env.SBP_PREFIX! //AS96FF6B1D2D42F281D898E57CE64252/payment-info',
    };
    postgres: any = {
        host: process.env.POSTGRES_HOST,
        port: parseInt(process.env.POSTGRES_PORT!),
        username: process.env.POSTGRES_USERNAME,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DATABASE,

    };
}
