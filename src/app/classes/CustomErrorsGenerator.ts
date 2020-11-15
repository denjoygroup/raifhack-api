/**
 * Шаблоны ошибок для отправки на клиент
 */

import {inject, injectable, unmanaged} from "inversify";
import ICustomErrorsGenerator from "./interfaces/ICustomErrorsGenerator";




export class CustomError extends Error {
  statusCode?: string;
  constructor(public message: string = 'error', public code?: number) {
    super();
  }
}

@injectable()
export class CustomErrorsGenerator implements ICustomErrorsGenerator {

  constructor(
  ) {
  }


  generateError(message?: string) {
    // this.ErrorsTypes
    return new CustomError(message);
  }

}
