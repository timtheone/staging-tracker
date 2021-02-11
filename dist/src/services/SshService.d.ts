import { NodeSSH } from 'node-ssh';
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
    private _ssh;
    constructor();
    connect(): Promise<NodeSSH>;
    execCommand(command: string, returnOutput?: boolean): Promise<void>;
}
export {};
