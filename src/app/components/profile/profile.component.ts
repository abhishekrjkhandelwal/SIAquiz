import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UploadService } from '../../services/upload.service';
import { DateFormatPipe } from '../../services/date.pipe';
import { NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FollowService } from '../../services/follow.service';
import { PostsService } from '../../services/post.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { AuthenticationService } from '../../services/authentication.service';
import { AddPostComponent } from '../../components/add-post/add-post.component';
import { LikesService } from '../../services/likes.service';
import { MessageService } from '../../services/message.service';
import { PlatformLocation } from '@angular/common';
 

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  
 @ViewChild('modelContainer',  { static: false }) modelContent: ElementRef<any>;
  
 modelRef;
  closeResult;
  room;


  displayName;
  userName;
  photoURL = '';
  status;
  joinDate = 'Oct 2019';
  userid = null;
  bannerURL;
  userFollowers;
  userFollowing;


  currentid;

  totalScribes;
  totalFollowers;
  totalFollowing;
  totalLikes = 0;

  posts;
  followers: any;
  following: any;
  likes: any;

  
  showInvalid: boolean;
  isLoaded: boolean;
  isCurrentUser: boolean;
  isLoggedIn: boolean;
  isFollowing: boolean;
  showPosts: boolean;
  showFollowers: boolean;
  showFollowing: boolean;
  showLikes: boolean;

  filename;

  profileInfoClass = 'row justify-content-center m1-md-2 ml-lg-auto justify-content lg-end';

  constructor(
   
     private router: Router,
     private userService: UserService,
     private postsService: PostsService,
     private sanitizer: DomSanitizer,
     private titleService: Title,
     private auth: AuthenticationService,
     private follow: FollowService,
     private likeService: LikesService,
     private msgService: MessageService,
     private modelService: NgbModal,
     private location: PlatformLocation,
     private datePipe: DateFormatPipe,
     private uploadService: UploadService
  ) {
   
     location.onPopState((event) =>
     {
       //ensure that model is opened
       if(this.modelRef !== undefined){
         this.modelRef.close();
       }
     });
   }

  ngOnInit() {
 
    this.showPosts  = true;
    this.isLoggedIn = false,
    this.isLoaded = false,
    this.isFollowing = false,
    this.titleService.setTitle('profile');
    this.userService.retrieveUserDocumentFromUsername(this.router.url.slice(6)).subscribe(
      user => {
      if(user[0]){
        const uservar: any = user[0];
        this.displayName = uservar.displayName;
        this.userName = uservar.userName;
        this.status = uservar.photoURL;
        this.userid = uservar.uid;
        this.joinDate = uservar.joinDate ? uservar.joinDate : this.joinDate;
        this.totalScribes = uservar.totalScribes ? uservar.totalScribes : 0;
        this.totalFollowing = uservar.totalFollowing ? uservar.totalFollowing : 0;
        this.totalFollowers = uservar.totalFollowers ? uservar.totalFollowers : 0;
        this.bannerURL = uservar.bannerURL ? uservar.bannerURL : null;
        this.isLoaded = true;
        this.titleService.setTitle(this.displayName + '@' + this.userName);
        this.checkcurrentUser();
        this.getFollowData();
        this.getLikes();
        this.postsService.getProfilePosts(this.userid).subscribe(
          posts =>{ 
            if(posts){
              this.posts = posts;
            }
          });
       }

       else{
         this.isLoaded = true;
         this.showInvalid = true;
         this.totalScribes = 0;
         this.totalFollowing = 0;
         this.totalFollowers = 0;
       }
    });
  }

 showTabs(type){
   if(type === 'posts'){
     this.showPosts = true;
     this.showFollowers = true;
     this.showFollowing = true;
     this.showLikes = true;
   }
   
   if(type === 'followers'){
     this.showPosts = false;
     this.showFollowers = true;
     this.showFollowing = true;
     this.showLikes = false;
   }

   if(type === 'following'){
     this.showPosts = false;
     this.showFollowers  = false;
     this.showFollowing = true;
     this.showLikes = false;
   }

   if(type === 'likes'){
     this.showPosts = false;
     this.showFollowers = false;
     this.showFollowing = false;
     this.showLikes = true;
   }
 }
 
getFollowData(){
  this.follow.getFollowers(this.userid).subscribe(
    followers => {
       this.followers = followers;
       this.userFollowers = followers;
    });

  this.follow.getFollowing(this.userid).subscribe(
    following => {
       this.following = following;
       this.userFollowing = following;
    });  
}


followUser(){
  
  if(this.isFollowing){
    this.isFollowing = false;
    this.follow.unfollow(this.userid);
  } else {
    this.isFollowing = true;
    this.follow.follow(this.userid);
  }
}

checkFollowing(){
  if(this.isFollowing){
    return 'Following';
  } else {
    return 'Follow';
  }
}

checkcurrentUser(){
   this.auth.getAuthState().subscribe(
     user => {
       if(user){
         if(this.userid){
            this.isLoggedIn = true;
            this.currentid = user.uid;
            
            if(this.userid === user.uid){
              this.isCurrentUser = true;
              this.profileInfoClass = 'row justify-content-center m1-md-2 m1-lg-auto';
            }
            this.follow.isFollowing(this.userid, this.currentid).subscribe(
            followinguser =>{
              if(followinguser[0]){
                this.isFollowing = true;
              }
            });
         }
       }

       else{
         this.isLoggedIn = false;
         this.profileInfoClass = 'row justify-content-center m1-md-2 m1-lg-auto';
       }
     });
}


getActiveTabStyle(tabName){
  const style = 'col-2 p-1 px-3 my-0 align-self-center';
  if(this.showPosts && tabName === 'posts'){
    return style + 'current';
  }

  if(this.showFollowing && tabName === 'following'){
    return style + 'current';
  }
  if(this.showFollowers && tabName === 'followers'){
    return style + 'current';
  }
  if(this.showLikes && tabName === 'likes'){
    return style + 'current';
  }

  return style;
}


getStyle(){
  if(this.bannerURL){
    return this.sanitizer.bypassSecurityTrustStyle(`background-image: url(${this.bannerURL})`);
  } 
}


getLikes(){
  this.likeService.getUserLikes(this.userid).subscribe(
    likes => {
      this.likes = likes;
      this.totalLikes = likes.length;
    });
}


openChatRoom(){
  this.msgService.getChatroom(this.userid, this.currentid).subscribe( chatroom =>{
    if(chatroom[0]){
      this.room = chatroom[0];
      this.open();
    } else {
      this.msgService.createChatroom(this.userid);
      this.open();
    }
  });
}


getJoinDate(){
  return this.datePipe.transform(this.joinDate, 'month');
}


open(){
  this.modelRef = this.modelService.open(this.modelContent, {
    size: 'lg',
    windowClass: 'model-style'
  });

  if(this.room){
    history.pushState(null, null, 'chatroom/' + this.room.rid);
  }

  this.modelRef.result.then((result) =>{
       this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`
  });
}


private getDismissReason(reason: any): string{
  history.back();
  if(reason === ModalDismissReasons.ESC){
    return 'by pressing ESC';
  }

  else if(reason === ModalDismissReasons.BACKDROP_CLICK){
    return 'by clicking on a backdrop';
  }
  else {
    return `with: ${reason}`
  }
}


processImage(event){
  const file = event.target.files[0];
  if(file.size > 2000000){
    this.filename = 'Max FILESIZE 1mb!';
  } else {
    this.filename = 'Edit Banner';
    this.uploadService.pushUpload(file, 'banner', this.userid);
  }
}

}
