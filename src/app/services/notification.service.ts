import { Router } from '@angular/router';
import {Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AuthenticationService } from './authentication.service';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection} from '@angular/fire/firestore';

@Injectable({
    providedIn : 'root'
})

export class NotificationService{
    constructor(
        private afs: AngularFirestore,
        private auth: AuthenticationService
    ) {}

    getNotifs(uid){
        return this.afs.collection('users/' + uid + '/notifications',  ref=> ref.orderBy('timestamp', 'desc')).valueChanges();

    }

    getUserUnread(uid){
        return this.afs.collection('users/' + uid + '/unread',  ref=> ref.orderBy('timestamp', 'desc')).valueChanges();
    }

    clearUnread(uid){
        this.afs.collection('users/' + uid + '/unread').valueChanges().subscribe(unread => {
            unread.forEach(notif => {
                const notifications: any = notif;
                this.afs.doc('users/' + uid + '/unread' + notifications.pid).delete();
            });
        });
    }
}