import * as express from "express";
import { Container, inject } from "inversify";
import {
    controller,
    httpGet,
    httpPost
} from "inversify-express-utils";
import Types from "../../constants/Types";
import IHandlerService from "../../services/interfaces/IHandlerService";
import IQrBusiness from "../business/interfaces/IQrBusiness";


export default function qrControllerFactory(container: Container) {
    @controller("/qr")
    class QrController {
        constructor(
            @inject(Types.QrBusiness) protected _qrBusiness: IQrBusiness,
        ) { }

        @httpPost('/create')
        async create(req: express.Request, res: express.Response, next: express.NextFunction) {
            try {
                let {value} = req.body;
                const result = await this._qrBusiness.createQr(value);
                res.send(result);
            } catch (e) {
                res.send(e);
            }
        }

        @httpGet('/get')
        async get(req: express.Request, res: express.Response, next: express.NextFunction) {
            try {
                // let {value} = req.body;
                const result = await this._qrBusiness.getLastQrInfo();
                res.send(result);
            } catch (e) {
                res.send(e);
            }
        }
    }



    return QrController;
}
