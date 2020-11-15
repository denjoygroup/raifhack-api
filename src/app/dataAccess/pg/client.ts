import { createConnection, Connection, ConnectionOptions } from 'typeorm';
import { injectable, inject } from 'inversify';
import path from 'path';
import fs from 'fs';
import { EventEmitter } from 'events';
import Types from '../../../constants/Types';
import IConstants from '../../../constants/interfaces/IConstants';
import IHandlerService from '../../../services/interfaces/IHandlerService';


enum ConnectionResult {
  SUCCESS = 0,
  ERROR = 1
}

@injectable()
export default class PgClient {
  connection?: Connection;
  private waitingConnection: boolean = false;
  private connectionEvent: EventEmitter = new EventEmitter();
  private maxCountOfRepeatConnection = 10;
  private timeoutToRepeatConnection = 3000;
  private connectionResult = ConnectionResult.ERROR;
  constructor(
    @inject(Types.Constants) private _constants: IConstants,
    @inject(Types.HandlerService) private _handlerService: IHandlerService,
  ) {}
  

  async init() {
    if (!this.connection) {
      if (this.waitingConnection) {
        await new Promise(resolve => this.connectionEvent.once('connected', resolve));
      } else {
        await this.repeatConnect();
      }
    }
    return this.connection;
  }

  private async repeatConnect() {
    let counter = 0;
    while (this.connectionResult !== ConnectionResult.SUCCESS && counter < this.maxCountOfRepeatConnection) {
      if (counter) await this._handlerService.sleep(this.timeoutToRepeatConnection);
      await this.connect();
      counter++;
    }
    if (this.connectionResult === ConnectionResult.ERROR) throw new Error('connections postgres');
  }

  private async connect() {
    try {
      this.waitingConnection = true;
      let optionsForDb: ConnectionOptions = {
        type: 'postgres',
        host: this._constants.postgres.host,
        port: this._constants.postgres.port,
        database: this._constants.postgres.database,
        username: this._constants.postgres.username,
        password: this._constants.postgres.password,
        entities: [
          path.join(__dirname, '../../models/**/*{ts,js}')
        ],
        migrations: [
          path.join(__dirname, '../../migrations/**/*{ts,js}')
        ],
        synchronize: true
      }
      let connection = await createConnection(optionsForDb);
      console.log('info', `connect to postgres ${this._constants.postgres.host}:${this._constants.postgres.port}`, true);
      this.connection = connection;
      this.connectionEvent.emit('connected');
      this.connectionResult = ConnectionResult.SUCCESS;
      return ConnectionResult.SUCCESS;
    } catch(e) {
      console.log('error', e.message);
      this.connectionResult = ConnectionResult.ERROR;
      return ConnectionResult.ERROR;
    }
  }

  // async getRepository(model: any) {
  //   // if (!this.connection) await this.init();
  //   if (!this.connection) throw new Error('Connection not initialized');
  //   return this.connection.getRepository(model);
  // }
}
