import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import '@firebase/firestore';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection} from '@angular/fire/firestore';
import { AuthenticationService } from '../../services/authentication.service'; 

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
 
  adminDetails;
  feedbacks;
  reports;

  constructor(
 
    private afs: AngularFirestore,
    private auth: AuthenticationService,
    private router: Router,
    private titleService: Title

  ) { }

  ngOnInit() {
    this.titleService.setTitle('Admin Dashboard');
    this.auth.getAuthState().subscribe(curruser => {
      if (curruser) {
        this.afs.doc('global/admins/admins/' + curruser.uid).valueChanges().subscribe(admin => {
          if (!admin) {
            this.router.navigateByUrl('/home');
          } else {
            this.adminDetails = admin;
            this.getData();
          }
        });
      } else {
        this.router.navigateByUrl('/home');
      }
    });
  }

  getData() {
    this.afs.collection('feedback/', ref => ref.orderBy('timestamp')).valueChanges().subscribe(feedbacks => this.feedbacks = feedbacks);
    this.afs.collection('reports/', ref => ref.orderBy('timestamp')).valueChanges().subscribe(reports => this.reports = reports);
     }
}
