import { Injectable } from "@angular/core";
import { MessageModel } from "src/app/models/MessageModel";
import { Settings } from "src/app/models/Settings";
import { LocalStorageHelper } from "../helpers/LocalStorageHelper";


@Injectable({
  providedIn: 'root'
})
export class ChatState{
  settings!: Settings | null;
  messagesList: MessageModel[] = new Array<MessageModel>();

  GetSettings(): Settings | null {
    this.settings = LocalStorageHelper.Get<Settings>("settings")
    return this.settings;
  }

  constructor() {
  }
}
