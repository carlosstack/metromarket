import { Component, OnInit } from '@angular/core';
import { RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { NotifService } from 'src/app/shared/services/notif.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  notifCount;
  private user;

  constructor(private NotifService: NotifService, private AuthService: AuthService, public afAuth: AngularFireAuth, private router: Router) { }

  ngOnInit() {
    this.AuthService.isAuth().subscribe((user) => {
      this.user = user;
      this.NotifService.getLastDate(user.uid).subscribe((lastDate) => {
        this.NotifService.getNewNotifications(user.uid, lastDate.date).subscribe((notif) => {
          this.notifCount = notif.length;
        })
      })
    });
  }



  onLogout() {
    this.AuthService.logoutUser()
      .then((res) => {

        this.router.navigate(['/login']);

      }).catch(err => console.log('err', err.mesage));

  }

  saveLastOpenedDate() {
    this.NotifService.setLastOpenedDate(this.user.uid, Date.now());

  }


}
