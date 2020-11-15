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

    async generateSales() {
        for (let i = 0; i < 32; i++) {
            console.log('i', i);
            
            let sale = new Sale(50);
            if (i == 0) {
                sale.createdAt = moment('2020-11-15T08:00:00.000+00:00').toDate();
                sale.updatedAt = moment('2020-11-15T08:00:00.000+00:00').toDate();
            }
            if (i == 1) {
                sale.createdAt = moment('2020-11-15T08:01:00.000+00:00').toDate();
                sale.updatedAt = moment('2020-11-15T08:01:00.000+00:00').toDate();
            }
            if (i == 2) {
                sale.createdAt = moment('2020-11-15T08:02:00.000+00:00').toDate();
                sale.updatedAt = moment('2020-11-15T08:02:00.000+00:00').toDate();
            }
            if (i == 3) {
                sale.createdAt = moment('2020-11-15T08:03:00.000+00:00').toDate();
                sale.updatedAt = moment('2020-11-15T08:03:00.000+00:00').toDate();
            }

            if (i == 4) {
                sale.createdAt = moment('2020-11-15T09:01:00.000+00:00').toDate();
                sale.updatedAt = moment('2020-11-15T09:01:00.000+00:00').toDate();
            }
            if (i == 5) {
                sale.createdAt = moment('2020-11-15T09:02:00.000+00:00').toDate();
                sale.updatedAt = moment('2020-11-15T09:02:00.000+00:00').toDate();
            }
            if (i == 6) {
                sale.createdAt = moment('2020-11-15T09:03:00.000+00:00').toDate();
                sale.updatedAt = moment('2020-11-15T09:03:00.000+00:00').toDate();
            }
            if (i == 7) {
                sale.createdAt = moment('2020-11-15T09:04:00.000+00:00').toDate();
                sale.updatedAt = moment('2020-11-15T09:04:00.000+00:00').toDate();
            }
            if (i == 8) {
                sale.createdAt = moment('2020-11-15T09:05:00.000+00:00').toDate();
                sale.updatedAt = moment('2020-11-15T09:05:00.000+00:00').toDate();
            }

            if (i == 9) {
                sale.createdAt = moment('2020-11-15T10:01:00.000+00:00').toDate();
                sale.updatedAt = moment('2020-11-15T10:01:00.000+00:00').toDate();
            }
            if (i == 10) {
                sale.createdAt = moment('2020-11-15T10:02:00.000+00:00').toDate();
                sale.updatedAt = moment('2020-11-15T10:02:00.000+00:00').toDate();
            }
            if (i == 11) {
                sale.createdAt = moment('2020-11-15T10:03:00.000+00:00').toDate();
                sale.updatedAt = moment('2020-11-15T10:03:00.000+00:00').toDate();
            }
            if (i == 12) {
                sale.createdAt = moment('2020-11-15T10:04:00.000+00:00').toDate();
                sale.updatedAt = moment('2020-11-15T10:04:00.000+00:00').toDate();
            }
            if (i == 13) {
                sale.createdAt = moment('2020-11-15T10:05:00.000+00:00').toDate();
                sale.updatedAt = moment('2020-11-15T10:05:00.000+00:00').toDate();
            }
            if (i == 14) {
                sale.createdAt = moment('2020-11-15T10:06:00.000+00:00').toDate();
                sale.updatedAt = moment('2020-11-15T10:06:00.000+00:00').toDate();
            }
            if (i == 15) {
                sale.createdAt = moment('2020-11-15T10:07:00.000+00:00').toDate();
                sale.updatedAt = moment('2020-11-15T10:07:00.000+00:00').toDate();
            }
            if (i == 16) {
                sale.createdAt = moment('2020-11-15T10:08:00.000+00:00').toDate();
                sale.updatedAt = moment('2020-11-15T10:08:00.000+00:00').toDate();
            }

            if (i == 17) {
                sale.createdAt = moment('2020-11-15T11:01:00.000+00:00').toDate();
                sale.updatedAt = moment('2020-11-15T11:01:00.000+00:00').toDate();
            }
            if (i == 18) {
                sale.createdAt = moment('2020-11-15T11:02:00.000+00:00').toDate();
                sale.updatedAt = moment('2020-11-15T11:02:00.000+00:00').toDate();
            }
            if (i == 19) {
                sale.createdAt = moment('2020-11-15T11:03:00.000+00:00').toDate();
                sale.updatedAt = moment('2020-11-15T11:03:00.000+00:00').toDate();
            }
            if (i == 20) {
                sale.createdAt = moment('2020-11-15T11:04:00.000+00:00').toDate();
                sale.updatedAt = moment('2020-11-15T11:04:00.000+00:00').toDate();
            }
            if (i == 21) {
                sale.createdAt = moment('2020-11-15T11:05:00.000+00:00').toDate();
                sale.updatedAt = moment('2020-11-15T11:05:00.000+00:00').toDate();
            }
            if (i == 22) {
                sale.createdAt = moment('2020-11-15T11:06:00.000+00:00').toDate();
                sale.updatedAt = moment('2020-11-15T11:06:00.000+00:00').toDate();
            }
            if (i == 23) {
                sale.createdAt = moment('2020-11-15T11:07:00.000+00:00').toDate();
                sale.updatedAt = moment('2020-11-15T11:07:00.000+00:00').toDate();
            }
            if (i == 24) {
                sale.createdAt = moment('2020-11-15T11:08:00.000+00:00').toDate();
                sale.updatedAt = moment('2020-11-15T11:08:00.000+00:00').toDate();
            }
            if (i == 25) {
                sale.createdAt = moment('2020-11-15T11:09:00.000+00:00').toDate();
                sale.updatedAt = moment('2020-11-15T11:09:00.000+00:00').toDate();
            }

            if (i == 26) {
                sale.createdAt = moment('2020-11-15T12:01:00.000+00:00').toDate();
                sale.updatedAt = moment('2020-11-15T12:01:00.000+00:00').toDate();
            }
            if (i == 27) {
                sale.createdAt = moment('2020-11-15T12:02:00.000+00:00').toDate();
                sale.updatedAt = moment('2020-11-15T12:02:00.000+00:00').toDate();
            }
            if (i == 28) {
                sale.createdAt = moment('2020-11-15T12:03:00.000+00:00').toDate();
                sale.updatedAt = moment('2020-11-15T12:03:00.000+00:00').toDate();
            }
            if (i == 29) {
                sale.createdAt = moment('2020-11-15T12:04:00.000+00:00').toDate();
                sale.updatedAt = moment('2020-11-15T12:04:00.000+00:00').toDate();
            }
            if (i == 30) {
                sale.createdAt = moment('2020-11-15T12:05:00.000+00:00').toDate();
                sale.updatedAt = moment('2020-11-15T12:05:00.000+00:00').toDate();
            }
            if (i == 31) {
                sale.createdAt = moment('2020-11-15T12:06:00.000+00:00').toDate();
                sale.updatedAt = moment('2020-11-15T12:06:00.000+00:00').toDate();
            }
            console.log('saleto create', sale);
            
            let created = await this._saleRepository.create(sale);
            console.log(created);
            
        }
    }

}
    // https://test.ecom.raiffeisen.ru/api/sbp/v1/qr/{qrId}/payment-info -H "Authorization :Bearer SecretKey"
