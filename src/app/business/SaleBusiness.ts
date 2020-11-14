import { inject, injectable } from 'inversify';
import Types from '../../constants/Types';
import IHandlerService from "../../services/interfaces/IHandlerService";
import ISaleBusiness from "./interfaces/ISaleBusiness";
import IConstants from "../../constants/interfaces/IConstants";


@injectable()
export default class SaleBusiness implements ISaleBusiness {
    constructor(
        @inject(Types.HandlerService) protected _handlerService: IHandlerService,
        @inject(Types.Constants) protected _constants: IConstants,

    ) {}

    async test() {
        let options = {
            host: 'test.ecom.raiffeisen.ru',
            path: '/api/sbp/v1/qr/AS96FF6B1D2D42F281D898E57CE64252/payment-info',
            method: 'GET',
            headers: {
              Authorization: `Bearer ${this._constants.sbp.key}`,
            }
        };
        let body = {
        };
        let result = JSON.parse(await this._handlerService.sendHttp(options, body, 'https'));
        let response: any = {};
        if (result.code === 'SUCCESS') {
            response.tid = result.transactionId;
            response.active = true;
        } else {
            response.active = false;
            response.tid = null;
        }
        return response;
    }

}
    // https://test.ecom.raiffeisen.ru/api/sbp/v1/qr/{qrId}/payment-info -H "Authorization :Bearer SecretKey"
