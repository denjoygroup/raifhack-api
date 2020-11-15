import ISkipAndLimitOptions from "./ISkipAndLimitOptions";
import IOrderOptions from "./IOrderOptions";
import IFilterOptions from "./IFilterOptions";
import IRelationsOptions from "./IRelastionsOptions";

export default interface IQueryOptions<T> {
  skipAndLimitOptions: ISkipAndLimitOptions,
  ordersOptions: IOrderOptions<T>,
  filtersOptions: IFilterOptions<T>,
  relationsOptions: IRelationsOptions,

  fullOptions: ISkipAndLimitOptions & IOrderOptions<T> & IFilterOptions<T> & IRelationsOptions
}