import { injectable } from "inversify";
import { EntityTarget } from 'typeorm';
import IProviderPgConnection from "../../dataAccess/pg/interfaces/IProviderPgConnection";
import IBaseRepository from './interfaces/IBaseRepository';

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
}