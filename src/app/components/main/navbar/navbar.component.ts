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

  constructor(private AuthService: AuthService, public afAuth: AngularFireAuth, private router: Router) { }
  public user;
  ngOnInit() {
  this.AuthService.isAuth().subscribe((user)=>{
    this.user = user
  })
  }

  setStyleByRoute(url: string) {
    if (url.includes('exchange')) {
      document.getElementById('exchange').classList.add('active');
    } else {
      document.getElementById('exchange').classList.remove('active');
    }
    if (url.includes('marketplace')) {
      document.getElementById('marketplace').classList.add('active');
    } else {
      document.getElementById('marketplace').classList.remove('active');
    }
    if (url.includes('myAccount')) {
      document.getElementById('userAccount').classList.add('active');
    } else {
      document.getElementById('userAccount').classList.remove('active');
    }
    if (url.includes('forum')) {
      document.getElementById('forum').classList.add('active');
    } else {
      document.getElementById('forum').classList.remove('active');
    }
  }

  onLogout() {
    this.AuthService.logoutUser()
      .then((res) => {

        this.router.navigate(['/login']);

      }).catch(err => console.log('err', err.mesage));

  }



  isActive(name: string) {
    if (this.router.getCurrentNavigation.toString().search(name)) {
      return true
    } else {
      return false
    }
  }

}
