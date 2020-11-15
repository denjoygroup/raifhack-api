import { Container } from "inversify";
import "reflect-metadata";
import Types from "./constants/Types";
import Constants from "./constants/Constants";
import SaleBusiness from './app/business/SaleBusiness';
import HandlerService from "./services/HandlerService";
import PgClient from "./app/dataAccess/pg/client";
import { Connection } from "typeorm";
import IProviderPgConnection from "./app/dataAccess/pg/interfaces/IProviderPgConnection";
import SaleRepository from "./app/repositories/SaleRepository";
import QrBusiness from "./app/business/QrBusiness";


let container = new Container();

/**
 * DataBases
 */
container.bind(Types.PgClient).to(PgClient).inSingletonScope();
container.bind<IProviderPgConnection>(Types.IProviderPgConnection).toProvider<Connection>(context => {
    return () => {
        return new Promise((resolve) => {
            let pgClient = container.get<PgClient>(Types.PgClient);
            pgClient.init()
                .then((connection) => {
                    resolve(connection);
                })
        })
    }
})
/**
 * Constants
 */
container.bind(Types.Constants).to(Constants).inSingletonScope();

/**
 * Business
 */
container.bind(Types.SaleBusiness).to(SaleBusiness).inSingletonScope();
container.bind(Types.QrBusiness).to(QrBusiness).inSingletonScope();


/**
 * Services
 */
container.bind(Types.HandlerService).to(HandlerService).inSingletonScope();

/**
 * Repositories
 */
container.bind(Types.SaleRepository).to(SaleRepository).inSingletonScope();

export default container;
