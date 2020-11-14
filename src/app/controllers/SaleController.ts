import * as express from "express";
import { Container, inject } from "inversify";
import {
    controller,
    httpGet,
    httpPost
} from "inversify-express-utils";


export default function saleControllerFactory(container: Container) {
    @controller("/sale")
    class SaleController {
        constructor(
        ) {
        }

    }

    return SaleController;
}
