
export default interface IBaseRepository<T> {
  save(item: T): Promise<T>;
  deleteById(id: number): Promise<void>;
}
