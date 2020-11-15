import * as express from "express";
import { Container, inject } from "inversify";
import {
    controller,
    httpGet,
    httpPost
} from "inversify-express-utils";
import Types from "../../constants/Types";
import IHandlerService from "../../services/interfaces/IHandlerService";
import ISaleBusiness from "../business/interfaces/ISaleBusiness";


export default function saleControllerFactory(container: Container) {
    @controller("/sale")
    class SaleController {
        constructor(
            @inject(Types.SaleBusiness) protected _saleBusiness: ISaleBusiness,
        ) { }

        @httpGet('/test')
        async test(req: express.Request, res: express.Response, next: express.NextFunction) {
            try {
                const result = await this._saleBusiness.test();
                res.send(result);
            } catch (e) {
                res.send(e);
            }
        }

        @httpGet('/index')
        async index(req: express.Request, res: express.Response, next: express.NextFunction) {
            try {
                const result = await this._saleBusiness.index();
                res.send(result);
            } catch (e) {
                res.send(e);
            }
        }

        @httpGet('/total')
        async total(req: express.Request, res: express.Response, next: express.NextFunction) {
            try {
                const result = await this._saleBusiness.getTotal();
                res.send({total: result});
            } catch (e) {
                res.send(e);
            }
        }

        @httpGet('/getByHours')
        async getByHours(req: express.Request, res: express.Response, next: express.NextFunction) {
            try {
                const result = await this._saleBusiness.getByHours();
                res.send(result);
            } catch (e) {
                res.send(e);
            }
        }
        @httpGet('/generateSales')
        async generateSales(req: express.Request, res: express.Response, next: express.NextFunction) {
            try {
                const result = await this._saleBusiness.generateSales();
                res.send(result);
            } catch (e) {
                res.send(e);
            }
        }
    }



    return SaleController;
}
