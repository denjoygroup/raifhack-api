import Sale from '../../models/Sale';
import IBaseRepository from '../base/interfaces/IBaseRepository';

export default interface ISaleRepository extends IBaseRepository<Sale> {
  create(sale: Sale): Promise<Sale>;
  find(): Promise<Sale[]>;
}
