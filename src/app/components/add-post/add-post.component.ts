import { Component, OnInit,  Input } from '@angular/core';
import { UploadService } from '../../services/upload.service';
import '@firebase/firestore';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection} from '@angular/fire/firestore';
import { PostsService } from '../../services/post.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {

  @Input() userURL: string;
  @Input() showAvatar: string;
  @Input() type;
  @Input() id;

  buttonClass = 'col-12 mt-2 d-done';
  textareaClass = 'form-control col-10';
  imgcontainerClass = 'col-2';
  addPostWrapper;
  containerStyle;
  route;


  //Post Data
  postbody;
  imgURL;
  pid;

  //ImageData 
  inputFile;
  filename;


  constructor(
     private postService: PostsService,
     private sanitizer: DomSanitizer,
     private router: Router,
     private afs: AngularFirestore,
     private uploadService: UploadService
  ) { }
  
  ngOnInit() {
    this.route = this.router.url.slice(1,5);
    if(this.route === 'user'){
      this.textareaClass = 'form-control col-12 mx-1 my-2';
      this.imgcontainerClass = 'd-none';
      this.addPostWrapper = 'row mx-1 justify-content-center';
      this.containerStyle = 'rounded p-2 my-1 container-fluid';
    } else {
      this.imgcontainerClass = 'col-2 mx-0';
      this.textareaClass = 'form-control col-10';
      this.addPostWrapper = 'row mr-1 justify-content-center';
      this.containerStyle = 'rounded p-2 mb-1 container-fluid';
    }

    if(!this.userURL){
      this.userURL = '../../assets/images/default.jpg';
    }
  }

  expand(){
     this.buttonClass = 'col-12 mt-12';
      if(this.route === 'user'){
       this.textareaClass = 'form-control col-12 expanded mx-1 my-2';
      }
      else{
        this.textareaClass = 'form-control col-10 expanded';
      } 
    }

  contract(){
    this.buttonClass = 'col-9 col-lg-12 mt-2 d-done';
    if(this.route === 'user'){
      this.textareaClass ='form-control col-12 mx-1 my-2';
    } else {
      this.textareaClass = 'form-control col-10';
    }
  }

  addPost(){
    this.contract();
    if(!this.type){
      if(this.postbody || this.inputFile.size< 2000000){
        this.pid = this.afs.createId();
        const newPost = {
          body: this.postbody,
          imgURL: this.imgURL ? this.imgURL : null,
          pid: this.pid
        };

        this.postService.addPost(newPost);
        if(this.inputFile){
          this.uploadService.pushUpload(this.inputFile, 'post', this.pid);
        }
        this.postbody = null;
      }
    }

    if(this.type === 'group'){
      if(this.postbody && this.inputFile.size < 2000000){
        this.pid = this.afs.createId();
        const newPost = {
          body : this.postbody,
          imgURL: this.imgURL ? this.imgURL : null,
          to : this.id,
          type: 'group',
          pid: this.pid
        };

        this.uploadService.pushUpload(this.inputFile, 'post', this.pid);
        this.postService.addPost(newPost);
        this.postbody = null;
      }
    }
  }

  processImage(event) {
    this.inputFile = event.target.files[0];
    this.filename = this.inputFile.name;
    if (this.inputFile.size > 2000000) {
      this.filename = 'Max Filesize 2Mb!';
    } else {
      if (this.filename.length > 25) {
        this.filename = this.filename.slice(0, 10) + '...' + this.filename.slice(this.filename.length - 3);
      }
    }
  }
}


