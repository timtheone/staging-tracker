import { NodeSSH } from 'node-ssh';
import config from '../config';

interface ConnectionServiceInterface {
  host: string;
  username: string;
  password: string;

  connect(): void;
  execCommand(command: string): Promise<void>;
}

export default class ConnectionService implements ConnectionServiceInterface {
  host: string;
  username: string;
  password: string;
  private _ssh: NodeSSH;

  constructor() {
    this.host = config.targetServer.host;
    this.username = config.targetServer.user;
    this.password = config.targetServer.user;
    this._ssh = new NodeSSH();
  }

  connect() {
    return this._ssh.connect({
      host: this.host,
      username: this.username,
      password: this.password,
    });
  }

  async execCommand(command: string, returnOutput = false) {
    let connection = await this.connect();
    const ssh = this._ssh;

    return connection.execCommand(command).then(function (result: any) {
      if (returnOutput) {
        const data = result.stdout;
        ssh.dispose();
        return data;
      }
    });
  }
}
