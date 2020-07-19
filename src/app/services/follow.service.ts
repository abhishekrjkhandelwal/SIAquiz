import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import '@firebase/firestore';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection} from '@angular/fire/firestore';
import { AuthenticationService } from './authentication.service';


@Injectable({
    providedIn : 'root'
})

export class FollowService {
    constructor(
        private afs : AngularFirestore,
        private auth: AuthenticationService,
        private userservice: UserService
    ){}

    isFollowing(profileuid, currentuid){
        return this.afs.collection<any>('/users/' + profileuid + '/followers', ref=> ref.where('uid', '==', currentuid)).valueChanges();
    }


     follow(profileuid){
       this.auth.getAuthState().subscribe(
           user => {
               if(user){
                   const currentuid = user.uid;
                   let data = {
                       uid: profileuid
                   };
                   this.afs.collection<any>('/users/' + currentuid + '/following').doc(profileuid).set(data);
                   data = {
                       uid: currentuid
                   };
                   this.afs.collection<any>('/users/' + profileuid + '/followers').doc(currentuid).set(data)
               }
           });    
    }
    
    
    unfollow(profileuid){
        this.auth.getAuthState().subscribe(
            user => {
                if(user) {
                    const currentuid = user.uid;
                    this.afs.collection<any>('/users/' + currentuid + '/following').doc(profileuid).delete();
                    this.afs.collection<any>('/users/' + profileuid + '/followers').doc(currentuid).delete();
                }
            });
    }
  
    getFollowing(uid){
        return this.afs.collection<any>('/users/' + uid + '/following').valueChanges();
    }

    getFollowers(uid){
        return this.afs.collection<any>('/users/' + uid + '/followers').valueChanges();
    }
}