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
    port: number = parseInt(process.env.PORT!)
}
