import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.scss']
})
export class TutorialComponent implements OnInit {
  userChats$;
  panelOpenState = false;
  constructor(public auth: AuthenticationService, public cs: ChatService) {}
  ngOnInit(){
    this.userChats$ = this.cs.getUserChats();
  }
}



  
