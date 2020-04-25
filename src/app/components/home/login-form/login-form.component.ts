import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ValidateEmail } from '../../validators/email.validator';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  formGroupLogin: FormGroup;
  
  constructor(private formBuilder: FormBuilder,public afAuth: AngularFireAuth, private router: Router, private authService: AuthService, private userService: UserService) { }
  
  public loading: boolean = false;
  public error: string= '';

  ngOnInit() {
    this.buildFormLogin();
  }


  onLoginEmail(){
    if(this.formGroupLogin.valid){
    this.loading = true;
    this.authService.loginUser(this.formGroupLogin.get('email').value, this.formGroupLogin.get('password').value)
      .then((res) => {
        this.router.navigate( [ '/app/exchange/e', {outlets: { exchange: ['all']}}]);
      }).catch(err => this.errorMessage(err.message));
    }else{
      this.error = 'Email or Password in bad format.';
    }
  }


errorMessage(error){
  this.loading = false;
this.error = error;
}
hideErrorMessage(){
  this.error = '';
}

buildFormLogin() {
    this.formGroupLogin = this.formBuilder.group({
      email: ['', [Validators.required,Validators.email]],
      password: ['', [Validators.required]],
    });
  }

}
