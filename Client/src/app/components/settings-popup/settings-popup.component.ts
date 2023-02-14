import { Component, OnInit } from '@angular/core';
import { LocalStorageHelper } from 'src/app/common/helpers/LocalStorageHelper';
import { SignalrService } from 'src/app/common/service/signalr.service';
import { ChatState } from 'src/app/common/state/chat.state';
import { Settings } from 'src/app/models/Settings';

@Component({
  selector: 'app-settings-popup',
  templateUrl: './settings-popup.component.html',
  styleUrls: ['./settings-popup.component.scss']
})
export class SettingsPopupComponent implements OnInit {

  userSettings: Settings | null | undefined;
  userName: string = "";
  groupName: string = "";

  ngOnInit(): void {
    this.userSettings = LocalStorageHelper.Get<Settings>("settings");
    if(this.userSettings){
      this.userName = this.userSettings.userName;
      this.groupName = this.userSettings.groupName;
    }
  }

  constructor(public sign : SignalrService, public state : ChatState){

  }

  Save(){
    if(!this.userName || !this.groupName)
      return;
    this.userSettings = new Settings();
    this.userSettings.userName = this.userName;
    this.userSettings.groupName = this.groupName;

    LocalStorageHelper.Set<Settings>("settings", this.userSettings);
    if(!this.sign.isConnected()){
      this.sign.start().then(() => {
        this.sign.joinGroup(this.userSettings?.groupName).then(() => {
          console.log("Join group" + this.groupName);
        })
      })
    }
    else{
      this.sign.leaveGroup(this.userSettings.groupName).then(() => {
        console.log("Leave group" + this.userSettings?.groupName);
        this.state.messagesList = [];
        this.sign.joinGroup(this.groupName).then(() => {
          console.log("Join group" + this.groupName);
        });
      });
    }
  }

}
