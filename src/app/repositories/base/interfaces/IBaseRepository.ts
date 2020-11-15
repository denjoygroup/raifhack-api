import { Connection, Repository } from 'typeorm';
import IFilterOptions from '../../../../constants/interfaces/IFilterOptions';
import IQueryOptions from '../../../../constants/interfaces/IQueryOptions';

export default interface IBaseRepository<T> {
  save(item: T): Promise<T>;
  findOrCreate(options: IQueryOptions<T>, itemToCreate: T): Promise<T>;
  findOne(options: IQueryOptions<T>): Promise<T | undefined>;
  find(options: IQueryOptions<T>): Promise<T[]>;
  deleteById(id: number): Promise<void>;
  count(options: IFilterOptions<T>): Promise<number>;
}
