import { Injectable } from "@angular/core";
import * as signalR from "@microsoft/signalr"
import { MessageModel } from "src/app/models/MessageModel";
import { ChatState } from "../state/chat.state";

@Injectable({
  providedIn: 'root'
})
export class SignalrService {

  private connection: signalR.HubConnection;

  constructor() {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl('api/chatHub')
      .build();
  }

  public start(): Promise<void> {
    return this.connection.start();
  }

  public stop(): Promise<void> {
    return this.connection.stop();
  }

  public joinGroup(groupName: string | undefined): Promise<void> {
    return this.connection.invoke('JoinGroup', groupName);
  }

  public leaveGroup(groupName: string): Promise<void> {
    return this.connection.invoke('LeaveGroup', groupName);
  }

  public sendMessageToGroup(groupName: string | undefined, message: string, userName: string): Promise<void> {
    return this.connection.invoke('SendMessageToGroup', groupName, message, userName);
  }

  public onReceiveMessage(callback: (messageData: any) => void): void {
    this.connection.on('ReceiveMessage', callback);
  }

  public isConnected(): boolean {
    return this.connection?.state === signalR.HubConnectionState.Connected;
  }

}
