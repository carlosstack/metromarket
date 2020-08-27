import { Component, OnInit } from '@angular/core';
import { NotifService } from 'src/app/shared/services/notif.service';
import { NotificationInterface } from 'src/app/shared/models/notification';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  public notifications;

  constructor(private authService: AuthService, private NotifService: NotifService,private router:Router) { }
  
  ngOnInit() {
    this.authService.isAuth().subscribe((user) => {
      this.NotifService.get(user.uid).subscribe((notifications) => {
        this.notifications = notifications;
      })
    })

  }
  link(link:string){
    console.log(link)
    this.router.navigateByUrl(link);
  }

}
