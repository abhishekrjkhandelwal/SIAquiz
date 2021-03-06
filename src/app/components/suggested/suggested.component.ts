import { UserService } from '../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
@Component({
  selector: 'app-suggested',
  templateUrl: './suggested.component.html',
  styleUrls: ['./suggested.component.scss']
})
export class SuggestedComponent implements OnInit {

  users;
  currentuser;

  constructor(
    private userService: UserService,
    private auth: AuthenticationService
  ) { }

  ngOnInit() {
    this.auth.getAuthState().subscribe(user => {
      if (user) {
        this.currentuser = user.uid;
      } else {
        this.currentuser = null;
      }
    });
    this.userService.getSuggestedUsers().subscribe(userlist => {
      this.users = userlist;
    });
  }

  checkCurrent(uid) {
    if (this.currentuser && this.currentuser === uid) {
      return false;
    } else {
      return true;
    }
  }
}
