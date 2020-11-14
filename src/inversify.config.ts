import { Container } from "inversify";
import "reflect-metadata";
import Types from "./constants/Types";
import Constants from "./constants/Constants";
import SaleBusiness from './app/business/SaleBusiness';
import HandlerService from "./services/HandlerService";


let container = new Container();

/**
 * Constants
 */
container.bind(Types.Constants).to(Constants).inSingletonScope();

/**
 * Business
 */
container.bind(Types.SaleBusiness).to(SaleBusiness).inSingletonScope();


/**
 * Services
 */
container.bind(Types.HandlerService).to(HandlerService).inSingletonScope();


export default container;
