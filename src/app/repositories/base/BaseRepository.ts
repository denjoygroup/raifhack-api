import { inject, injectable } from "inversify";
import IProviderPgConnection from "../../dataAccess/pg/interfaces/IProviderPgConnection";
import Types from "../../../constants/Types";
import IBaseRepository from './interfaces/IBaseRepository';
import { EntitySchema, Entity, ObjectType, EntityTarget } from 'typeorm';
import IQueryOptions from "../../../constants/interfaces/IQueryOptions";
import IFilterOptions from "../../../constants/interfaces/IFilterOptions";

@injectable()
export default class BaseRepository<T> implements IBaseRepository<T> {
  constructor(
    private _providerPgClient: IProviderPgConnection,
    private model: EntityTarget<T> & { new(...args: any[]): T }
  ) {}

  getConnection() {
    return this._providerPgClient();
  }

  protected async getRepository() {
    const connection = await this.getConnection();
    return connection.getRepository(this.model);
}

  async save(item: T) {
    const repository = await this.getRepository();
    return await repository.save(item);
  }
  async deleteById(id: number) {
    const repository = await this.getRepository();
    await repository.delete(id);
  }
  async findOne(options: IQueryOptions<T>) {
    const repository = await this.getRepository();
    return await repository.findOne(options.fullOptions);
  }
  async find(options: IQueryOptions<T>) {
    const repository = await this.getRepository();
    return await repository.find(options.fullOptions);
  }

  async count(options: IFilterOptions<T>) {
    const repository = await this.getRepository();
    return await repository.count(options);
  }

  async findOrCreate(options: IQueryOptions<T>, itemToCreate: Partial<T>) {
    const repository = await this.getRepository();
    let item = await repository.findOne(options.filtersOptions);
    if (!item) {
        item = new this.model();
        Object.assign(item, itemToCreate);
        await repository.save(item);
    }
    return item;
}
}