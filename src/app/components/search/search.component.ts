  
import '@firebase/firestore';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection} from '@angular/fire/firestore';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { timer, combineLatest } from 'rxjs';

import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  @ViewChild('myDrop', {static: false}) searchDrop;

  searchterm;
  users;
  groups;

  hide = false;

  startAt = new Subject();
  endAt = new Subject();

  startObs = this.startAt.asObservable();
  endAtObs = this.endAt.asObservable();

  constructor(
    private afs: AngularFirestore,
    private router: Router,
  ) { }

  ngOnInit() {
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
    };
    combineLatest(this.startObs, this.endAtObs).subscribe(
      value => {
        this.doQuery(value[0], value[1]).subscribe(
          users => {
            if (users) {
              this.users = users;
              this.searchDrop.open();
            }
          });
          this.doGroupQuery(value[0], value[1]).subscribe(
            groups => {
              if (groups) {
                this.groups = groups;
              }
            });
      });
  }

  doQuery(start, end) {
    return this.afs.collection('users', ref => ref.limit(3).orderBy('userName').startAt(start).endAt(end)).valueChanges();
  }

  doGroupQuery(start, end) {
    return this.afs.collection('groups', ref => ref.limit(3).orderBy('gname').startAt(start).endAt(end)).valueChanges();
  }

  search($event) {
    const q = $event.target.value;
    this.startAt.next(q);
    this.endAt.next(q + '\uf8ff');
  }

  sendToProfile(username) {
    this.searchterm = null;
    this.router.navigateByUrl('user/' + username);
  }
}
