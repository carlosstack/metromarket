import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OfertInterface } from 'src/app/shared/models/ofert';
import { UserInterface } from 'src/app/shared/models/user';
import { UserService } from 'src/app/shared/services/user.service';

export interface Data {
  
  ofert: OfertInterface;
  userUID:string;
}
@Component({
  selector: 'app-ofert-preview',
  templateUrl: './ofert-preview.component.html',
  styleUrls: ['./ofert-preview.component.css']
})
export class OfertPreviewComponent implements OnInit {

  public ofert:OfertInterface;
  public userUID:string;
  constructor(public userService:UserService,public dialogRef: MatDialogRef<OfertPreviewComponent>,@Inject(MAT_DIALOG_DATA) public data: Data) { 
  }

  ngOnInit() {
    this.userUID = this.data.userUID;
    this.ofert = this.data.ofert;
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
