import { Component, OnInit, Inject } from '@angular/core';
import {  MatSnackBarRef, MAT_SNACK_BAR_DATA} from "@angular/material/snack-bar";
import { Data } from '../../../modules/exchange/pages/all-oferts/all-oferts.component';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  public text:string;

  constructor(public dialogRef: MatSnackBarRef<AlertComponent>, @Inject(MAT_SNACK_BAR_DATA) public data: Data) { }


  ngOnInit() {
    this.text=this.data.text;
  }

}
