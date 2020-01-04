import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar-home',
  templateUrl: './navbar-home.component.html',
  styleUrls: ['./navbar-home.component.css']
})
export class NavbarHomeComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) { }

  public email: string = '';
  public pass: string = '';

  ngOnInit() {
  }


  
  onLoginEmail(): void {

    this.authService.loginUser(this.email, this.pass)
      .then((res) => {
        this.router.navigate(['/app/social']);

      }).catch(err => console.log('err', err.mesage));
  }


}
