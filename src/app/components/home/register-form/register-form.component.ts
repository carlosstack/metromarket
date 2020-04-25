import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidateEmail } from '../../validators/email.validator';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  formGroupRegister: FormGroup;

  private loading: boolean = false;
  private error:string ='';

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.buildFormRegister();
  }

  buildFormRegister() {
    this.formGroupRegister = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  errorMessage(error) {
    this.loading = false;
    this.error = error;

  }

  hideErrorMessage() {
    this.error ='';
  }

  onRegister() {
    if(this.formGroupRegister.valid){
    this.loading = true;
    this.authService.registerUser(this.formGroupRegister.get('email').value, this.formGroupRegister.get('password').value)
      .then(() => {
        this.router.navigate(['/app/exchange/e', { outlets: { exchange: ['all'] } }]);
      }).catch(error => this.errorMessage(error));
   }else{
    this.error = 'Email or password in bad format.';
    }
  }


}
