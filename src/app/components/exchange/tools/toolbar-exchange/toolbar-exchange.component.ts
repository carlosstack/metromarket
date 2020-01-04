import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-toolbar-exchange',
  templateUrl: './toolbar-exchange.component.html',
  styleUrls: ['./toolbar-exchange.component.css']
})
export class ToolbarExchangeComponent implements OnInit {

  private user;
  constructor(private auth:AuthService) { }

  ngOnInit() {
   

    this.auth.isAuth().subscribe(user => {
      this.user=user;
    });


  }



}
