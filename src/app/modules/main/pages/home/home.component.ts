import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }
  
  images=[];


  ngOnInit(): void {
    this.images[0] ='../../../../assets/shop-images/apple.jpg';
    this.images[1]='../../../../assets/shop-images/contigo.jpg';
    this.images[2]='../../../../assets/shop-images/laptop.jpg';
  
  }

}