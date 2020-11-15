import { inject, injectable } from 'inversify';
import Types from '../../constants/Types';
import IHandlerService from "../../services/interfaces/IHandlerService";
import IQrBusiness from "./interfaces/IQrBusiness";
import IConstants from "../../constants/interfaces/IConstants";
import { QrInfo } from '../../constants/utils';
import url from 'url';
import querystring from 'querystring';


// type QrInfo = {
//     code: string,
//     qrId: string,
//     payload: string,
//     qrUrl: string
// }

@injectable()
export default class QrBusiness implements IQrBusiness {
    // private _lastTransactionId: string = '';
    private lastQrInfo?: QrInfo;
    value: number = 50;

    constructor(
        @inject(Types.HandlerService) protected _handlerService: IHandlerService,
        @inject(Types.Constants) protected _constants: IConstants,

    ) {}

    async getLastQrInfo() {
        if (!this.lastQrInfo) await this.getLastQrInfoFromApi('AS96FF6B1D2D42F281D898E57CE64252');
        if (this.lastQrInfo) this.getValueFromQrPayload(this.lastQrInfo.payload);
        return {lastQrInfo: this.lastQrInfo, value: this.value};
    }

    getValueFromQrPayload(payload: string) {
        let parsedUrl = url.parse(payload);
        if (!parsedUrl.query) return;
        let query = querystring.parse(parsedUrl.query);
        if (!query.sum || typeof query.sum !== 'string') return;
        let sum = parseInt(query.sum);
        if (!Number.isFinite(sum)) return;
        this.value = sum;
    }

    async createQr(value: number) {

        let body = {
            // "account": 40700000000000000000,
            "additionalInfo": "Доп информация",
            "amount": value,
            "createDate": "2019-07-22T09:14:38.107227+03:00",
            "currency": "RUB",
            "order": "1-22-333",
            "paymentDetails": "Назначение платежа",
            "qrType": "QRStatic",
            "qrExpirationDate": "2023-07-22T09:14:38.107227+03:00",
            "sbpMerchantId": this._constants.sbp.merchant
        }

        let options = {
            host: this._constants.sbp.host,
            // https://test.ecom.raiffeisen.ru/api/sbp/v1/qr/register
            path: `${this._constants.sbp.prefix}register`,
            method: 'POST',
            headers: {
              Authorization: `Bearer ${this._constants.sbp.key}`,
            }
        };
        // let body = {}; .
        let result = JSON.parse(await this._handlerService.sendHttp(options, body, 'https'));
        if (result && result.code === 'SUCCESS') {
            this.value = value;
            this.lastQrInfo = result;
        }

        console.log('result', result);
        
        // let response: any = {};
        
        // if (result.code === 'SUCCESS') {
        //     response.tid = result.transactionId;
        //     response.active = true;
        //     this._lastTransactionId()
        // } else {
        //     response.active = false;
        //     response.tid = null;
        // }
        return result as QrInfo;
    }


    async getLastQrInfoFromApi(qrId: string) {
        let options = {
            host: this._constants.sbp.host,
            path: `${this._constants.sbp.prefix}${qrId}/info`,
            method: 'GET',
            headers: {
              Authorization: `Bearer ${this._constants.sbp.key}`,
            }
        };
        let body = {};
        let result = JSON.parse(await this._handlerService.sendHttp(options, body, 'https'));
        this.lastQrInfo = result;
        return result as QrInfo;
    }



}
    // https://test.ecom.raiffeisen.ru/api/sbp/v1/qr/{qrId}/payment-info -H "Authorization :Bearer SecretKey"
