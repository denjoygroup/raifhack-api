import {inject, injectable} from "inversify";
import Types from "../constants/Types";
import IConstants from '../constants/interfaces/IConstants';
import * as https from "https";
import {IncomingMessage} from "http";
import url from "url";
import IHandlerService from "./interfaces/IHandlerService";


@injectable()
export default class HandlerService implements IHandlerService {

    constructor(
        @inject(Types.Constants) private _constants: IConstants
    ) {

    }


    sendHttp(option: any, body: any = null, cookie: any = null) {
        return new Promise((resolve, reject) => {

            let defaultOptions: any = {
                method: 'GET',
                host: '127.0.0.1',
                port: 443
            }

            if (body && (!option.headers || !option.headers['Content-Type'])) {
                if (!defaultOptions.headers) defaultOptions.headers = {};
                defaultOptions.headers['Content-Type'] = 'application/json';
            }

            if (cookie) {
                if (!defaultOptions.headers) defaultOptions.headers = {};
                defaultOptions.headers['cookie'] = cookie;
            }

            Object.assign(defaultOptions, option);


            let request = https.request(defaultOptions, (response: IncomingMessage) => {
                response.setEncoding('utf8');
                let data = '';

                response.on('data', (chunk) => {
                    // console.log('data', data);
                    data += chunk;
                })

                response.on('close', (endData: any) => {
                    // console.log('response', response);
                    if (/^3[0-9]+/.test(response.statusCode!.toString())) {
                        let parsedUrl = url.parse(response.headers.location!);
                        option.host = parsedUrl.host;
                        option.path = parsedUrl.path;
                        let cookie = response.headers['set-cookie'];

                        this.sendHttp(option, body, cookie)
                            .then((data: any) => {
                                resolve(data);
                            }, (err: any) => {
                                reject(err);
                            })
                        return
                    }
                    if (response.statusCode !== 200) return reject(data);
                    resolve(data);
                })
            })

            request.on('error', (err) => {
                reject(err);
            })

            if (body && typeof body === 'object') request.write(JSON.stringify(body));
            request.end();
        })
    }
    sleep(ms: number) {
        return new Promise(res => setTimeout(res, ms));
    }
};
