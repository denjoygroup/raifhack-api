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
                await this._saleBusiness.test();
                res.send({data: 'hello raif'})
            } catch (e) {
                res.send(e);
            }
        }
    }



    return SaleController;
}
