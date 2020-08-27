import { Component, OnInit, Input } from '@angular/core';
import { MessengerService } from 'src/app/shared/services/messenger.service';
import { MessageInterface } from 'src/app/shared/models/message';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.css']
})
export class MessengerComponent implements OnInit {

  @Input() id: string;
  @Input() uid: string;
  @Input() name: string;

  messagesSubscription: Subscription;

  public messages: MessageInterface[];
  public message: MessageInterface = {};


  constructor(private msgService: MessengerService) { }

  ngOnInit(): void {
    this.getMessages(this.id);
  }
  ngOnDestroy(): void {
    this.messagesSubscription.unsubscribe();
  }

  addMsg() {
    if (this.message.text.length > 0) {
      this.message.uid = this.uid;
      this.message.date = Date.now();
      this.msgService.new(this.id, this.message);
      this.message = {}
    }

  }
  getMessages(id) {
    this.messagesSubscription = this.msgService.get(id).subscribe((messages) => {
      this.messages = messages;

    })
  }

}
