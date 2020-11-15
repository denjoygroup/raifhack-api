import { CustomError } from "../CustomErrorsGenerator";

export default interface ICustomErrorsGenerator {
    generateError(message?: string): CustomError;

}
