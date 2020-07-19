import { PostsService } from './post.service';
import { Router } from '@angular/router';
import '@firebase/firestore';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection} from '@angular/fire/firestore';
import { AngularFireStorage ,  AngularFireUploadTask} from '@angular/fire/storage';

import { Observable, from } from 'rxjs';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AuthenticationService } from './authentication.service';
import {GroupService } from './group.service';

@Injectable({
    providedIn: 'root',
})

export class UploadService{

constructor(
    private afs: AngularFirestore,
    private auth: AuthenticationService,
    private storage: AngularFireStorage,
    private postService: PostsService,
    private groupService: GroupService
){}


uploadTask;

pushUpload(file, type? : string, id ?: string){
    if(type === 'user'){
        const downloadURL = this.storage.upload('user-upload/' + id + '/dp', file).then(() => {
            const ref = this.storage.ref('user-upload/' + id + '/dp');
            ref.getDownloadURL().subscribe(url => {
                if(url){
                    this.auth.updatePhotoURL(url);
                }
            });
        })
    }

    if(type === 'post'){
        const downloadURL = this.storage.upload('post-uploads/' + id + '/post-image',file).then(() => {
            const ref = this.storage.ref('post-uploads/' + id + '/post-image' + id + '/dp');
            ref.getDownloadURL().subscribe(url => {
                if(url){
                    this.auth.updatePhotoURL(url);
                }
            });
        })
    }

    if(type === 'banner'){
        const downloadURL = this.storage.upload('user-uploads/' + id + '/banner' , file).then(() => {
            const ref = this.storage.ref('user-uploads/' + id + '/banner' + id + '/dp');
            ref.getDownloadURL().subscribe(url => {
                if(url){
                    this.auth.updatePhotoURL(url);
                }
            });
        })
    }

    if(type === 'group'){
        const downloadURL = this.storage.upload('group-uploads/' + id + '/banner', file).then(() => {
            const ref = this.storage.ref('group-uploads/' + id + '/banner');
            ref.getDownloadURL().subscribe(url => {
                if(url){
                    this.auth.updatePhotoURL(url);
                }
            });
        })
    }
}

}