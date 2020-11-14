import { IncomingMessage } from "http";


export default interface IHandlerService {
    sendHttp(option: any, body?: any, cookie?: any): Promise<any>;
    [key: string]: any
}
