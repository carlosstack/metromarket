import { Component, OnInit } from '@angular/core';
import { NormalOfertService } from 'src/app/services/normal-ofert.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { OfertInterface } from 'src/app/models/ofert';

@Component({
  selector: 'app-my-oferts',
  templateUrl: './my-oferts.component.html',
  styleUrls: ['./my-oferts.component.css']
})
export class MyOfertsComponent implements OnInit {
  constructor(private normalOfert: NormalOfertService, private authService: AuthService,private userService:UserService) { }

  public oferts;

  public type ='my-oferts';

  public currentUsername = '';

  ngOnInit() {

    this.authService.isAuth().subscribe(user => {


        this.userService.getMyOferts(user.displayName).subscribe(oferts=>{
          this.oferts=oferts;
          
        })
     
    })
  }
  getColor(status: string) {
    switch (status) {
      case 'new':
        return 'gray';
      case 'pending':
        return 'green';
      case 'waiting-for-rating':
        return 'orange';
      case 'finalized':
        return 'gray';
        case 'canceled-and-finalized':
        return 'gray';
        case 'canceled-by-owner':
        return 'gray';
        case 'canceled-and-waiting-for-rating':
        return 'orange';
    }
  }

  getStatus(ofert:OfertInterface){
    if(ofert.status=='new'){
      return 'En espera'
    }else if(ofert.status=='canceled-by-owner' || ofert.status=='canceled-and-finalized'){
      return 'Cancelado';
    }else if(ofert.status=='pending'){
      return 'Aceptado';
    }else if(ofert.status=='waiting-for-rating' || ofert.status=='canceled-and-waiting-for-rating'){
      return 'Por calificar';
    }else if(ofert.status=='finalized'){
      return 'Finalizado';
    }
  }

  getDate(ofert: OfertInterface){
    return Date.now();
  }
}
