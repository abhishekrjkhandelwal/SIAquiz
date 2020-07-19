import { Component, OnInit, Input } from '@angular/core';
import '@firebase/firestore';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection} from '@angular/fire/firestore';
import { AuthenticationService } from '../../../services/authentication.service';
@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.scss']
})
export class ChatroomComponent implements OnInit {

  @Input() messageData;

  style;
  curruser;
  
  constructor(
    private auth: AuthenticationService,
    private afs: AngularFirestore
  ) { }

  ngOnInit() {
    this.auth.getAuthState().subscribe(curruser => {
      if (curruser) {
        if (this.messageData.uid === curruser.uid) {
          this.curruser = true;
          this.style = 'text-right bg-white rounded mt-1 mb-2 py-2 px-3 border-primary';
        } else {
          this.style = 'text-left bg-white rounded mt-1 mb-2 py-2 px-3';
        }
      }
    });
  }

  
  delete() {
    this.afs.doc('messaging/' + this.messageData.rid + '/messages/' + this.messageData.mid).delete();
  }

}
