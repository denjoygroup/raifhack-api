import { inject, injectable } from 'inversify';
import Types from '../../constants/Types';
import IHandlerService from "../../services/interfaces/IHandlerService";
import ISaleBusiness from "./interfaces/ISaleBusiness";
import IConstants from "../../constants/interfaces/IConstants";
import IQrBusiness from './interfaces/IQrBusiness';
import ISaleRepository from '../repositories/interfaces/ISaleRepository';
import Sale from '../models/Sale';
import moment from 'moment-timezone';


@injectable()
export default class SaleBusiness implements ISaleBusiness {
    private _lastTransactionId: string = '';
    constructor(
        @inject(Types.HandlerService) protected _handlerService: IHandlerService,
        @inject(Types.Constants) protected _constants: IConstants,
        @inject(Types.QrBusiness) protected _qrBusiness: IQrBusiness,
        @inject(Types.SaleRepository) protected _saleRepository: ISaleRepository,

    ) {}

    private _checkTransactionIdWasChanged(newTransactionId: string) {
        if (!this._lastTransactionId) {
            this._lastTransactionId = newTransactionId;
            return true;
        } else if (this._lastTransactionId !== newTransactionId) {
            this._lastTransactionId = newTransactionId;
            return true;
        } else {
            return false;
        }
    }

    async create() {
        let sale = new Sale(this._qrBusiness.value);
        return await this._saleRepository.create(sale);
    }

    async index() {
        return await this._saleRepository.find();
    }

    private generateLabels() {
        let labelsMap = new Map<string, {label: string, total: number}>();
        for (let i = 23; i >= 0; i--) {
            let label = moment().subtract(i, 'hours').format('YYYY-MM-DD HH');
            labelsMap.set(label, {label, total: 0});
        }
        return labelsMap;
    }

    private groupByLabels(sales: Sale[]) {
        let labelsMap = this.generateLabels();
        for (let i = 0; i < sales.length; i++) {
            let sale = sales[i];
            let salesLabel = moment(sale.createdAt).format('YYYY-MM-DD HH');
            let labelValue = labelsMap.get(salesLabel);
            if (!labelValue) continue;
            labelValue.total += sale.value;
        }
        return Array.from(labelsMap.values());
    }

    async getByHours() {
        let sales = await this._saleRepository.find();
        return this.groupByLabels(sales);
    }

    async getTotal() {
        let sales = await this._saleRepository.find();
        return sales.reduce((total, sale) => {
            return total += sale.value;
        }, 0)
    }

    async test() {
        // let qrInfo = await this._qrBusiness.getLastQrInfoFromApi('AS96FF6B1D2D42F281D898E57CE64252');
        let options = {
            host: this._constants.sbp.host,
            path: `${this._constants.sbp.prefix}AS96FF6B1D2D42F281D898E57CE64252/payment-info`,
            method: 'GET',
            headers: {
              Authorization: `Bearer ${this._constants.sbp.key}`,
            }
        };
        let body = {};
        let result = JSON.parse(await this._handlerService.sendHttp(options, body, 'https'));
        let response: any = {};
        if (result.code === 'SUCCESS') {
            response.tid = result.transactionId;
            response.active = true;
            let changed = this._checkTransactionIdWasChanged(result.transactionId);
            if (changed) await this.create();
        } else {
            response.active = false;
            response.tid = null;
        }
        return response;
    }

}
    // https://test.ecom.raiffeisen.ru/api/sbp/v1/qr/{qrId}/payment-info -H "Authorization :Bearer SecretKey"
