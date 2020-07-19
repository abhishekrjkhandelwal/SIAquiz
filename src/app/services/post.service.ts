import {Injectable, Output} from '@angular/core';
import '@firebase/firestore';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection} from '@angular/fire/firestore';
import { AuthenticationService } from './authentication.service';
import * as firebase from 'firebase';
//import 'rxjs/add/operator/do';
//import 'rxjs/add/operator/scan';
//import 'rxjs/add/operator/take';
import { Router } from '@angular/router';
import { LikesService } from './likes.service';
import { AngularFireStorage } from '@angular/fire/storage';

interface QueryConfig{
    path: string;
    field?: string;
    value?: string;
    limit: number;
    reverse: boolean;
    prepend: boolean;
}

@Injectable({
    providedIn: 'root'
})

export class PostsService{
  [x: string]: any;
    constructor(
         private afs: AngularFirestore,
         private auth: AuthenticationService,
         private router:  Router
    ){}


    //Get a user's posts
    getProfilePosts(uid){
        return this.afs.collection('posts', ref=> ref.where('uid', '==', uid).orderBy('date', 'desc')).valueChanges();
    }

    addPost(newPost){
        this.auth.getAuthState().subscribe(
            currentuser => {
                const date = firebase.firestore.FieldValue.serverTimestamp();
                const post = {
                    pid: newPost.pid,
                    uid: currentuser.uid,
                    date: date,
                    body: newPost.body,
                    photoURL: newPost.photoURL ? newPost.photoURL : null,
                    to : newPost.to ? newPost.to : null,
                    type : newPost.type ? newPost.type : 'user'
                };

                const postRef = this.afs.collection('posts').doc(newPost.pid);
                return postRef.set(post)
                .then(() =>{
                    console.log('post Successfully submited - ', newPost.pid);
                });
            });
    }

    addComment(newPost){
        this.auth.getAuthState().subscribe(
            currentuser => {
                const date = firebase.firestore.FieldValue.serverTimestamp();
                const post = {
                    pid: newPost.pid,
                    uid: currentuser.uid,
                    date: date,
                    body: newPost.body,
                    photoURL: newPost.photoURL ? newPost.photoURL: null,
                    to: newPost.type ? newPost.type: 'user'
                };

                const postRef = this.afs.collection('posts').doc(newPost.pid);
                return postRef.set(post)
                .then(() =>
                {
                    const comment = {
                        pid: newPost.pid,
                        timestamp : firebase.firestore.FieldValue.serverTimestamp()
                    };
                    this.afs.doc('posts/' + newPost.to + '/comments' + newPost.pid).set(comment);
                    console.log('comment Successful -', newPost.pid);
                })
            }); 
    }

 
    //get comments on posts
    getComments(pid){
        return this.afs.collection('posts/' + pid + '/comments', ref => ref.orderBy('timestamp', 'asc',)).valueChanges();        
    }


    //get users feed
    getfeed(uid){
        return this.afs.collection<any>('users/' + uid + '/feed',
        ref => ref.orderBy('date','desc').limit(200)
        ).valueChanges();
    }


    //Get individual posts
    public getPost(pid){
        return this.afs.doc<any>('posts/' + pid).valueChanges();
    }

    //delete posts
    public deletePost(pid){
        this.afs.doc<any>('posts/' + pid).delete();
    }

    //Report post
    public reportPost(pid){
        this.auth.getAuthState().subscribe(curruser => {
            if(curruser) {
                const repid = this.afs.createId();
                const report = {
                    repid: repid,
                    pid: pid,
                    uid: curruser.uid,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                };
                this.afs.doc('reports/' + repid).set(report).then(() => console.log('Report submited for post' + pid));
            }
        });
    }

    //get most likable posts
    getMostLikePosts(){
        return this.afs.collection('posts', ref => ref.orderBy('totalLikes','desc').limit(3)).valueChanges();
    }

    //get most comments posts
    getMostCommentPosts(){
        return this.afs.collection('posts', ref=> ref.orderBy('totalComments','desc').limit(3)).valueChanges();
    }

    //update photo url
    updatePhotoURL(url, uid){
        const data = {
            photoURL: url
        };
        this.afs.doc('users/'+ uid).update(data);
    }

}