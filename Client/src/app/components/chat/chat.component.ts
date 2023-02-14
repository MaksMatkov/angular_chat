import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { SignalrService } from 'src/app/common/service/signalr.service';
import { ChatState } from 'src/app/common/state/chat.state';
import { MessageModel } from 'src/app/models/MessageModel';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  constructor(public state : ChatState, public signalR: SignalrService) {
  }

  @ViewChild("msgBox") myScrollContainer : any;
  @ViewChildren('item') itemElements!: QueryList<any>;

  get msgs() {
    return this.state.messagesList;
  }

  pushMsg(messageData : any) {
    console.log(messageData);
    let msgModel = new MessageModel();
    msgModel.date = new Date();
    msgModel.text = messageData.message;
    msgModel.userName = messageData.userName;
    this.msgs.push(msgModel);
  }

  ngAfterViewInit() {
    this.itemElements.changes.subscribe(_ => this.ScrollToEnd());
  }

  inputText = "";

  ngOnInit(): void {
    this.signalR.onReceiveMessage(this.pushMsg.bind(this));
  }


  SendMsg(){
    if(!this.inputText)
      return;
    let msg = new MessageModel();
    msg.text = this.inputText;
    msg.date = new Date();
    if(this.state.GetSettings() != null){
      msg.userName = this.state.GetSettings()?.userName || "";
    }
    this.signalR.sendMessageToGroup(this.state.GetSettings()?.groupName, msg.text, msg.userName).then(() => {});
    this.inputText = "";
  }

  ScrollToEnd(){
    this.myScrollContainer.nativeElement.scroll({
      top: this.myScrollContainer.nativeElement.scrollHeight,
      left: 0,
      behavior: 'smooth'
    });
  }
}
