import { Injectable } from '@angular/core'
import { AuthenticationService } from './authentication.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})

export class UserService{
    constructor(
        private auth: AuthenticationService,
        private afs : AngularFirestore,
        private router: Router
    ) {}

    retrieveUserDocument(uid){
        return this.afs.doc<any>('users/' + uid).valueChanges();
    }
  
    retrieveUserDocumentFromUsername(username) {
        return this.afs.collection('users', ref => ref.where('userName', '==', username)).valueChanges();
      }

    retrieveUserDocumentFromID(uid){
        return this.afs.doc<any>('users/' + uid).valueChanges();
    }
    getUserGroups(uid){
        return this.afs.collection('users/', ref => ref.orderBy('totalFollowers', 'desc').limit(5)).valueChanges();
    }

    getSuggestedUsers() {
        return this.afs.collection('users', ref => ref.orderBy('totalFollowers', 'desc').limit(5)).valueChanges();
      }
}