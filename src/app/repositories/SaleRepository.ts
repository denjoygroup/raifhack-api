import { inject, injectable } from "inversify";
import Types from "../../constants/Types";
import IHandlerService from "../../services/interfaces/IHandlerService";
import IProviderPgConnection from "../dataAccess/pg/interfaces/IProviderPgConnection";
import Sale from "../models/Sale";
import BaseRepository from "./base/BaseRepository";
import ISaleRepository from "./interfaces/ISaleRepository";



@injectable()
export default class SaleRepository extends BaseRepository<Sale> implements ISaleRepository {
    constructor(
        @inject(Types.IProviderPgConnection) _providerPgClient: IProviderPgConnection,
        @inject(Types.HandlerService) private _handlerService: IHandlerService,
    ) {
        super(_providerPgClient, Sale)
    }
    protected async getRepository() {
        const connection = await this.getConnection();
        return connection.getRepository(Sale);
    }


    async create(sale: Sale) {
        let repository = await this.getRepository();
        return await repository.save(sale);
    }

    async find() {
        let repository = await this.getRepository();
        return repository.find();
    }

}
