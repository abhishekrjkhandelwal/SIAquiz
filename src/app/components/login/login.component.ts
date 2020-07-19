import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormBuilder, Validators, EmailValidator, FormControl} from '@angular/forms';
import { TouchSequence } from 'selenium-webdriver';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})


export class LoginComponent implements OnInit {


  error: string;
  userForm: FormGroup;
  newUser : boolean = false;
  passReset: boolean = false;

  constructor(public auth: AuthenticationService,   private router : Router, public fb: FormBuilder, private titleService: Title,  private modalService: NgbModal) {}
  
  ngOnInit() {
    this.auth.checkNotLogin();
    this.titleService.setTitle('Login');
  }

  emailform = new FormGroup({
    email: new FormControl('', [
      Validators.email,
      Validators.required
    ]),
    password: new FormControl('', [
      Validators.minLength(6),
      Validators.required
    ])
  });
 
  
  get email() {
    return this.emailform.get('email');
  }
  get password() {
    return this.emailform.get('password');
  }

  login(mode){
    if(mode === 'google'){
      this.auth.googleLogin().then(() => {
        this.router.navigateByUrl('/home');
      });
    }

    if(mode === 'email'){
      this.auth.getAuth().signInWithEmailAndPassword(this.email.value, this.password.value)
        .then(() => {
          this.auth.getAuthState().subscribe(user => {
            if (user) {
              if (user.emailVerified) {
                this.router.navigateByUrl('/home');
              } else {
                this.auth.getAuth().currentUser.sendEmailVerification();
                this.auth.getAuth().signOut().then(() => console.log('Sign Out'));
              }
            }
          });
        })
        .catch(err => {
          if (err.code === 'auth/user-not-found') {
            this.error = 'No User with the given Email found.';
          }
          if (err.code === 'auth/wrong-password') {
            this.error = 'Password incorrect!';
          }
          if (err.code === 'auth/user-disabled') {
            this.error = 'User has been banned. Please contact the administrator.';
          }
        });
    }
  }

}