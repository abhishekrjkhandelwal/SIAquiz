import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AuthenticationService } from './authentication.service';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection} from '@angular/fire/firestore';
import { Group } from './group.model';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
    providedIn: 'root'
})


export class GroupService{
    currentuser;

    constructor(
        private afs: AngularFirestore,
        private router: Router,
        private auth: AuthenticationService
    ){}

    createGroup(data){

        const gid = this.afs.createId();
        const GData = {
            gname: data.gname,
            desc: data.desc,
            createdData: firebase.firestore.FieldValue.serverTimestamp(),
            gid: gid,
        };

        this.afs.doc('groups/' + gid).set(GData).then(() =>{
            this.auth.getAuthState().subscribe(user => {
                this.currentuser = user;
                const adminData = {admin: this.currentuser.uid};
                this.afs.doc('groups/' + GData.gid).update(adminData);

                const guserdata = {
                    gid: gid,
                    last: firebase.firestore.FieldValue.serverTimestamp()
                };

                this.afs.doc('users/'+ this.currentuser.uid + '/groups' + gid).set(guserdata).then(() => this.router.navigateByUrl('group/' + gid ));

                const ugroupdata = {
                    uid: this.currentuser.uid,
                    date : firebase.firestore.FieldValue.serverTimestamp()
                };

                this.afs.doc('groups/' + gid + '/members/' + this.currentuser.uid).set(ugroupdata);
            });
        });
    }

    editGroup(data){
        const Gdata = {
            gname: data.gname,
            desc: data.desc,
        };
    return this.afs.doc('groups/' + data.gid).update(Gdata);
    }


    subscribe(gid){
        this.auth.getAuthState().subscribe(currentuser => {
            if(currentuser){
                const uid = currentuser.uid;
                const data = {
                    uid: uid,
                    date: firebase.firestore.FieldValue.serverTimestamp()
                };
                this.afs.doc('groups/' + gid + '/members/' + uid).set(data);
            }
        });
    }

    unsubscribe(gid){
        this.auth.getAuthState().subscribe( currentuser => {
            if(currentuser){
                const uid = currentuser.uid;
                this.afs.doc('groups/' + gid + '/members/' + uid).delete();
            }
        });
    }


    getGroup(gid){
        return this.afs.doc<Group>('groups/' + gid).valueChanges();
    }

    getFeed(gid){
        return this.afs.collection('groups/' + gid + '/feed',  ref => ref.orderBy('date','desc')).valueChanges();
    }

    getMembers(gid){
        return this.afs.collection('groups/' + gid + '/members', ref => ref.orderBy('date')).valueChanges();
    }

    getMostSubbed(){
        return this.afs.collection('groups', ref => ref.orderBy('totalMembers','desc')).valueChanges();
    }

    updateBannerURL(url, gid){
        const data = {
            bannerURL : url
        };
        this.afs.doc('group/' + gid).update(data)
        .then(() => console.log('Group banner updated'));
    }
}
