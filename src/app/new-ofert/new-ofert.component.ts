import { Component, OnInit } from '@angular/core';
import { NormalOfertService } from '../services/normal-ofert.service';
import { OfertInterface } from '../models/ofert';
import { Router } from '@angular/router';
import {MatSnackBarModule, MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-new-ofert',
  templateUrl: './new-ofert.component.html',
  styleUrls: ['./new-ofert.component.css']
})
export class NewOfertComponent implements OnInit {

  addBtnIsPulsed=false;


  constructor(private _snackBar: MatSnackBar,private normalOfert: NormalOfertService, private router: Router) { }



  ofert: OfertInterface = {
    destino: '',
    divisaMonto: '$',
    divisaTasa: 'Bss',
    entrega: '',
    monto: 0,
    origen: '',
    tasa: 0,
    tipo: '',
    username: '',
    id:'',
    status:'new',
    acceptedBy: null
   
  }

  public tax:number=this.ofert.monto*0.01;
  durationInSeconds = 10;


  ngOnInit() {

  }

  addOfert() {

  this.addBtnIsPulsed=true;
  this.normalOfert.addOfert(this.ofert);
  
   
  }

}

