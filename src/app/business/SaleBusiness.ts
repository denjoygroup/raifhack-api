import { inject, injectable } from 'inversify';
import Types from '../../constants/Types';
import IHandlerService from "../../services/interfaces/IHandlerService";
import ISaleBusiness from "./interfaces/ISaleBusiness";


@injectable()
export default class SaleBusiness implements ISaleBusiness {
    constructor(
        @inject(Types.HandlerService) protected _handlerService: IHandlerService,

    ) {}

    async test() {
        let options = {
            host: 'smartvend.ru',
            path: '/',
            method: 'GET'
        };
        let body = {
        };
        let result = await this._handlerService.sendHttp(options, body, 'https');
        console.log(result);
        return result;
    }

}
