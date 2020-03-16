import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../services/auth.service";

@Component({
  selector: 'app-exchange-dashboard',
  templateUrl: './exchange-dashboard.component.html',
  styleUrls: ['./exchange-dashboard.component.css']
})
export class ExchangeDashboardComponent implements OnInit {

  private user;

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.auth.isAuth().subscribe(user=>{
      this.user = user;
    });
  }

}
