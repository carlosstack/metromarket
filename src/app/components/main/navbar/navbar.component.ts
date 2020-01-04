import { Component, OnInit } from '@angular/core';
import { RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  private isLogged: boolean = false;



  private page_name='La red del Samán';

  constructor(private AuthService: AuthService, public afAuth: AngularFireAuth, private router: Router) { }

  ngOnInit() {
    //this.getCurrentUser();
  }


  onLogout() {
    this.AuthService.logoutUser()
      .then((res) => {



        this.router.navigate(['login']);

      }).catch(err => console.log('err', err.mesage));

  }

  private getCurrentUser() {

    this.AuthService.isAuth().subscribe(auth => {
      if (auth) {

        this.isLogged = true;
      } else {

        this.isLogged = false;
      }
    });
  }



}
