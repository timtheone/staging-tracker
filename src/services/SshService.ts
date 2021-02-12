const { exec, spawn } = require('child_process');
import { NodeSSH } from 'node-ssh';
import config from '../config';

interface ConnectionServiceInterface {
  host: string;
  username: string;
  keyPathOrPassword: string;
  keyPassphrase: string;

  connect(withKey: boolean): void;
  execCommand(command: string): Promise<void>;
}

function passPhraseRequired(): boolean {
  return exec(
    // This check if there is a password for ssh key
    `ssh-keygen -y -P "" -f ${config.authSshKeyPath}`,
    (error: { message: any }) => {
      if (error) {
        return true;
      }
      return false;
    }
  );
}

export default class ConnectionService implements ConnectionServiceInterface {
  host: string;
  username: string;
  keyPathOrPassword: string;
  keyPassphrase: string;
  private _ssh: NodeSSH;

  constructor() {
    this.host = config.targetServer.host;
    this.username = config.targetServer.user;
    this.keyPathOrPassword =
      config.authSshKeyPath.length > 1
        ? config.authSshKeyPath
        : config.targetServer.pass;
    this.keyPassphrase = config.sshKeyPassPhrase;
    this._ssh = new NodeSSH();
  }

  connect() {
    let connectionConfig = {
      host: this.host,
      username: this.username,
    };
    if (config.authSshKeyPath.length > 1) {
      connectionConfig = {
        ...connectionConfig,
        ...{ privateKey: this.keyPathOrPassword },
      };
      if (passPhraseRequired()) {
        connectionConfig = {
          ...connectionConfig,
          ...{ passphrase: this.keyPassphrase },
        };
      }
    } else {
      connectionConfig = {
        ...connectionConfig,
        ...{ password: this.keyPathOrPassword },
      };
    }

    return this._ssh.connect(connectionConfig);
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
