import { Container } from "inversify";
import "reflect-metadata";
import Types from "./constants/Types";
import Constants from "./constants/Constants";

let container = new Container();

/**
 * Constants
 */
container.bind(Types.Constants).to(Constants).inSingletonScope();

export default container;
