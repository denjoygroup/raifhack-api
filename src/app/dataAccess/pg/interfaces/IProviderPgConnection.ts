import { Repository, Connection } from "typeorm";

export default interface IProviderPgConnection {
  (): Promise<Connection>
}