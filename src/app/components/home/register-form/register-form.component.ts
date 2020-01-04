import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { UserService } from '../../../services/user.service';
import { from } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { UserInterface } from '../../../models/user';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  constructor(public afAuth: AngularFireAuth, private router: Router, private authService: AuthService, private userService: UserService) { }
  public email: string = '';
  public pass: string = '';
  public email2: string = '';
  public pass2: string = '';


  user: UserInterface = {
    uid: '',
    name: '',
    email: '',
    phone_number: '',
    photoUrl: '',
    username: ''

  }



  ngOnInit() {
  }

  onRegister(): void {
    this.authService.registerUser(this.email2, this.pass2)
      .then((res) => {

        this.router.navigate(['/myaccount(sidebar:sidebar)']);

      }).catch(err => console.log('err', err));

  }

  onLoginEmail(): void {

    this.authService.loginUser(this.email, this.pass)
      .then((res) => {
        this.router.navigate(['/social(sidebar:sidebar)']);

      }).catch(err => console.log('err', err.mesage));
  }
 

}
