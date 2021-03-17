const { exec } = require('child_process');
import fs from 'fs';
import { NodeSSH } from 'node-ssh';
import config from '../config';
import { getServerByName } from '../repositories/ServerRepository';

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

export default class ConnectionService {
  serverName: string;
  private _ssh: NodeSSH;

  constructor(serverName: string) {
    this.serverName = serverName;
    this._ssh = new NodeSSH();
  }

  async getServerCreds(serverName: string) {
    return await getServerByName(serverName);
  }

  async connect() {
    const server = await this.getServerCreds(this.serverName);

    if (server) {
      let connectionConfig = {
        host: server.host,
        username: server.username,
      };
      if (server.sshAuthKey && server.sshAuthKey.length > 1) {
        connectionConfig = {
          ...connectionConfig,
          ...{
            privateKey: fs.readFileSync(server.sshAuthKey, 'utf-8'),
          },
        };
        if (passPhraseRequired()) {
          connectionConfig = {
            ...connectionConfig,
            ...{ passphrase: server.sshKeyPassphrase },
          };
        }
      } else {
        connectionConfig = {
          ...connectionConfig,
          ...{ password: server.password },
        };
      }
      return this._ssh.connect(connectionConfig);
    }
  }

  async execCommand(command: string, returnOutput = false) {
    let connection = await this.connect();
    const ssh = this._ssh;

    if (connection) {
      return connection.execCommand(command).then(function (result: any) {
        if (returnOutput) {
          const data = result.stdout;
          ssh.dispose();
          return data;
        }
      });
    }
  }
}
