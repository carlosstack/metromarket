import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../../../services/user.service';
import { UserInterface } from '../../../../../models/user';
import { AuthService } from '../../../../../services/auth.service';
import { RatingInterface } from '../../../../../models/rating';
import { AngularFirestore } from '@angular/fire/firestore';
import { OfertInterface } from '../../../../../models/ofert';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SuccessfulData } from '../view-transaction.component';

@Component({
  selector: 'app-unsuccessful-transaction',
  templateUrl: './unsuccessful-transaction.component.html',
  styleUrls: ['./unsuccessful-transaction.component.css']
})
export class UnsuccessfulTransactionComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<UnsuccessfulTransactionComponent>, @Inject(MAT_DIALOG_DATA) public data: SuccessfulData,private afs: AngularFirestore, private route: ActivatedRoute, private userService: UserService, private authService: AuthService, private router: Router) { }
  
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
  
        status: 'canceled-and-finalized'
  
      }).catch(e => {
        console.log('error', e);
      });
      this.dialogRef.close();

    }else{
  
      this.afs.collection<OfertInterface>(`users-oferts`).doc(`@${this.ofert.owner}`).collection('normal-oferts').doc(`${this.ofert.id}`).update({
  
        status: 'canceled-and-finalized'
  
      }).catch(e => {
        console.log('error', e);
      });

      this.dialogRef.close();

    }

  }

}