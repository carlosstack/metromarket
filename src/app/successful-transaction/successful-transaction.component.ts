import { Component, OnInit, Inject } from '@angular/core';
import { UserInterface } from '../models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { OfertInterface } from '../models/ofert';
import { RatingInterface } from "../models/rating";
import { AuthService } from '../services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SuccessfulData } from '../view-transaction/view-transaction.component';

@Component({
  selector: 'app-successful-transaction',
  templateUrl: './successful-transaction.component.html',
  styleUrls: ['./successful-transaction.component.css']
})
export class SuccessfulTransactionComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<SuccessfulTransactionComponent>, @Inject(MAT_DIALOG_DATA) public data: SuccessfulData,private afs: AngularFirestore, private route: ActivatedRoute, private userService: UserService, private authService: AuthService, private router: Router) { }
  
  public partner: UserInterface;
  public value: number = 0;
  public comment: string = '';
  public rating: RatingInterface = {};
  public submit: boolean = false;
  public ofert: OfertInterface;
  public type: string;
  public ofertId: string;
  public idUser: string;

  ngOnInit() {

    const idUser = this.data.idUser;
    const ofertId = this.data.idOfert;
    const type = this.data.type;

    this.idUser = idUser;
    this.ofertId = ofertId;
    this.type = type;


    this.ofert=this.data.ofert;

    this.userService.getOneUser(idUser).valueChanges().subscribe(partner => {
      this.partner = partner;
      this.rating.username = this.partner.username;


      this.authService.isAuth().subscribe(user => {
        this.rating.partner = user.displayName;
      });

    });

  }



  setValue(value: number) {
    this.value = value;
  }

  onSubmit() {

    this.submit = true;
    this.rating.value = this.value;


    this.userService.addRatingPartner(this.rating).catch(e => {
      console.log('error', e);
    });

    if(this.type=='accepted-oferts'){
    this.afs.collection<OfertInterface>(`users-oferts`).doc(`@${this.ofert.acceptedBy}`).collection('accepted-oferts').doc(`${this.ofert.id}`).update({

      status: 'finalized'

    }).catch(e => {
      console.log('error', e);
    });
  }else{

    this.afs.collection<OfertInterface>(`users-oferts`).doc(`@${this.ofert.username}`).collection('normal-oferts').doc(`${this.ofert.id}`).update({

      status: 'finalized'

    }).catch(e => {
      console.log('error', e);
    });
  }

    this.dialogRef.close();

  }
  
  onNoClick(): void {
    this.dialogRef.close();
  }

}