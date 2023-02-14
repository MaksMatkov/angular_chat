import { Component, Input, OnInit } from '@angular/core';
import { ChatState } from 'src/app/common/state/chat.state';
import { MessageModel } from 'src/app/models/MessageModel';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit{
  @Input("msg") msg! : MessageModel;
  get isMy() : boolean{
    return this.msg.userName === this.state.GetSettings()?.userName;
  }
  constructor(public state: ChatState) {
  }
  ngOnInit(): void {
  }

}
