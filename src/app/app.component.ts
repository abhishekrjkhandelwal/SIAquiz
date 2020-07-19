import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { ChatService } from './services/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  userChats$;
  constructor(public auth: AuthenticationService, public cs: ChatService) 
  {
    
  }
  ngOnInit(){
    this.userChats$ = this.cs.getUserChats();
  }
}
