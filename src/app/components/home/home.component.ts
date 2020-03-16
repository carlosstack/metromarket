import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public afAuth: AngularFireAuth, private router: Router, private authService: AuthService, private userService: UserService) { }
  
  public email: string = '';
  public pass: string = '';
  public error: string= '';

  ngOnInit() {

   
  }


  
  onLoginEmail(){

    this.authService.loginUser(this.email, this.pass)
      .then((res) => {
        this.router.navigate( [ '/app/exchange/e', {outlets: { exchange: ['all']}}]);

      }).catch(err => this.errorMessage(err.message));
  }


errorMessage(error){
this.error = error;
}
hideErrorMessage(){
  this.error = '';
  }

}