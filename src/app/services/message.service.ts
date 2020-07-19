import { Router } from '@angular/router';
import {Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AuthenticationService } from './authentication.service';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection} from '@angular/fire/firestore';

@Injectable({
    providedIn : 'root'
})

export class MessageService {
    constructor(
        private afs: AngularFirestore,
        private auth: AuthenticationService
    ){}

    getChatrooms(uid){
        return this.afs.collection('/users/' + uid + '/messaging', ref=> ref.orderBy('lastUpdate','desc')).valueChanges();
    }

    checkChatroom(profileuid){
        this.auth.getAuthState().subscribe( curruser =>{
            const currentuser = curruser.uid;
            this.afs.collection('users/' + curruser.uid + '/messaging', ref=> ref.where('uid', '==', profileuid)).valueChanges()
            .subscribe(chatroom => {
                if(chatroom.length === 1){
                    console.log('open chatroom model');
                } else {
                    this.createChatroom(profileuid);
                }
            });
        });
    }


    clearUnread(rid){
        this.auth.getAuthState().subscribe(curruser => {
            if(curruser){
                this.afs.doc('users/' + curruser.uid + '/messsaging/' + rid).update({unread: false});
            }
        })
    }

    getChatroomFromRID(rid, uid){
        return this.afs.doc('users/' + uid + '/messaging' + rid).valueChanges();
    }

    createChatroom(profileuid){
        this.auth.getAuthState().subscribe(
            curruser => {
                const rid = this.afs.createId();
                const roomData = {
                    rid: rid,
                    lastUpdate: firebase.firestore.FieldValue.serverTimestamp()
                };
                this.afs.doc('messaging/' + rid).set(roomData)
                .then(() => {
                    let data = {
                        uid: profileuid
                    };
                    this.afs.doc('messaging/' + rid + '/users/' + profileuid).set(data);
                    data = {
                        uid: curruser.uid
                    };
                    this.afs.doc('messaging/' + rid + '/users/' + curruser.uid).set(data);
                });
            });
    }

  getUnread(uid){
      return this.afs.collection('users/' + uid + '/messaging', ref=> ref.where('unread', '==', true)).valueChanges();
  }
  
  getMessages(rid){
      return this.afs.collection('messaging/' + rid + '/messages', ref=> ref.orderBy('timestamp')).valueChanges();
  }

  sendMessages(msgData){
      this.auth.getAuthState().subscribe( curruser => {
          const mid = this.afs.createId();
          const msg = {
              mid: mid,
              rid : msgData.rid,
              uid: msgData.uid,
              text: msgData.text,
              timestamp : firebase.firestore.FieldValue.serverTimestamp()
          };
          this.afs.doc('messaging/' + msgData.rid + '/messages/' + mid).set(msg);
      })
  }
  getChatroom(profileuid, currentuid) {
    return this.afs.collection('users/' + currentuid + '/messaging', ref => ref.where('uid', '==', profileuid)).valueChanges();
  }
}
