import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LocalStorageHelper } from './common/helpers/LocalStorageHelper';
import { SignalrService } from './common/service/signalr.service';
import { ChatState } from './common/state/chat.state';
import { SettingsPopupComponent } from './components/settings-popup/settings-popup.component';
import { Settings } from './models/Settings';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Client';
  showSideBar = false;

  constructor(public dialog: MatDialog, public state :ChatState, public sign : SignalrService){

  }

  get groupName(): string | undefined | null {
    return this.state.GetSettings() == null ? undefined : this.state.GetSettings()?.groupName;
  }
  get userName(): string | undefined | null {
    return this.state.GetSettings() == null ? undefined : this.state.GetSettings()?.userName;
  }

  ngOnInit(): void {
    this.init();
  }

  init(){
    if(this.state.GetSettings() == null){
      this.openSettingsPopup();
    }
    else{
      this.sign.start().then(() => {
        console.log("connected");
        this.sign.joinGroup(this.state.GetSettings()?.groupName)
          .then(() => {console.log("Connected to group " + this.state.GetSettings)})
      })
    }
  }

  openSettingsPopup(): void {
    this.dialog.open(SettingsPopupComponent);
  }




}
