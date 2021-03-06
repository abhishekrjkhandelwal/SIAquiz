import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection} from '@angular/fire/firestore';
import { AuthenticationService } from '../../services/authentication.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsernameValidators } from '../../validators/username.validators';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(
    private title: Title,
    private auth: AuthenticationService,
    private afs: AngularFirestore
  ) {}
  
  isTaken = false;

  
  ngOnInit() {
    this.title.setTitle('Signup');
  }


  emailform = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      UsernameValidators.cannotContainSpace
    ]),
  
  displayname: new FormControl('', [
      Validators.required,
      Validators.minLength(5)
    ]),  

    email: new FormControl('', [
      Validators.email,
      Validators.required
    ]),
    password: new FormControl('', [
      Validators.minLength(6),
      Validators.required
    ]),
    passwordConfirm: new FormControl('',
      Validators.required
    )
  }, this.passwordMatchValidator);

  googleform = new FormGroup({
    googleusername: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      UsernameValidators.cannotContainSpace
    ])
  });

  passwordMatchValidator(g: FormGroup) {
    if (g.get('password').value && g.get('passwordConfirm').value) {
      return g.get('passwordConfirm').value === g.get('password').value
       ? null : {'mismatch': true};
    }
 }


  get googleusername() {
    return this.googleform.get('googleusername');
  }
  get username() {
    return this.emailform.get('username');
  }
  get displayname() {
    return this.emailform.get('displayname');
  }
  get email() {
    return this.emailform.get('email');
  }
  get password() {
    return this.emailform.get('password');
  }

  
  search($event) {
    const q = $event.target.value;
    this.checkUsername(q);
  }

  checkUsername(q) {
    this.afs.collection('users', ref => ref.where('userName', '==', q)).valueChanges().subscribe(user => {
      if (user[0]) {
        this.isTaken = true;
      } else {
        this.isTaken = false;
      }
    });
  }


  register(type) {
    if (type === 'google' && this.googleusername.value && !this.isTaken) {
      const data = {
        type: 'google',
        username: this.googleusername.value
      };
      this.auth.register(data);

    }
    if (type === 'email'
      && !this.password.errors
      && !this.username.errors
      && !this.displayname.errors
      && !this.email.errors && !this.isTaken) {
      const data = {
        username: this.username.value,
        displayname: this.displayname.value,
        email: this.email.value,
        password: this.password.value,
        type: 'email'
      };
      this.auth.register(data);
    }
  }
}
