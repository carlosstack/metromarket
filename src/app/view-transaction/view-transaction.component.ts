import { Component, OnInit, Inject } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { NormalOfertService } from '../services/normal-ofert.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { OfertInterface } from '../models/ofert';
import { UserInterface } from '../models/user';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SuccessfulTransactionComponent } from '../successful-transaction/successful-transaction.component';
import { ModalConfirmComponent } from '../modal-confirm/modal-confirm.component';
import { UnsuccessfulTransactionComponent } from '../unsuccessful-transaction/unsuccessful-transaction.component';
import { RatingPanelComponent } from '../rating-panel/rating-panel.component';

export interface SuccessfulData {
  type: string;
  idOfert: string;
  idUser: string;
  ofert: OfertInterface;
}

@Component({
  selector: 'app-view-transaction',
  templateUrl: './view-transaction.component.html',
  styleUrls: ['./view-transaction.component.css']
})
export class ViewTransactionComponent implements OnInit {

  constructor(public dialog: MatDialog, private afs: AngularFirestore, private OfertService: NormalOfertService, private route: ActivatedRoute, private router: Router, private authService: AuthService, private userService: UserService) { }

  public ofert: OfertInterface;
  public user: UserInterface;
  public partner: UserInterface;
  public person: UserInterface;
  public type: string;
  public idOfert: string;
  public content: string;
  public chats;
  public secureAnswer: string = 'NORMAL';


  ngOnInit() {


    this.authService.isAuth().subscribe(user => {

      const idOfert = this.route.snapshot.params['id'];
      const type = this.route.snapshot.params['type'];
      this.type = type;
      this.idOfert = idOfert;



      if (type == 'my-oferts') {

        this.userService.getOneOfert(idOfert, user.displayName, type).subscribe(ofert => {

          this.ofert = ofert;

          if (ofert == null) {
            this.OfertService.getOneOfert(idOfert).subscribe(ofert => {
              this.ofert = ofert;

            });
          } else {

            this.userService.getMyMessages(this.ofert).subscribe(chats => {
              this.chats = chats;
            });

            this.userService.getOneUser(ofert.acceptedBy).valueChanges().subscribe(partner => {
              this.partner = partner;
            });
          }

          this.userService.getOneUser(user.displayName).valueChanges().subscribe(user => {
            this.user = user;
            this.person = user;
          });

        });



      } else if (type == 'accepted-oferts') {

        this.userService.getOneOfert(idOfert, user.displayName, type).subscribe(ofert => {

          if (ofert.status == 'new') {

            ofert.acceptedBy = user.displayName;
            ofert.status = 'pending';

            this.userService.updateOfertPartner(ofert);
            this.userService.addOfertUser(ofert);
            this.OfertService.deleteOfert(ofert.id);
          }

          this.userService.getOneUser(ofert.username).valueChanges().subscribe(partner => {
            this.partner = partner;
            this.person = partner;
          });

          this.userService.getOneUser(user.displayName).valueChanges().subscribe(user => {
            this.user = user;
          });

          this.ofert = ofert;

          this.userService.getMyMessages(this.ofert).subscribe(chats => {
            this.chats = chats;
          });
        });

      }


    });

  }

  openDialogToCancel(): void {
    const dialogRef = this.dialog.open(ModalConfirmComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.setStatusCancel();
      }
    });
  }

  openDialogSuccess(): void {
    const dialogRef = this.dialog.open(ModalConfirmComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.setStatusWait();
        this.openSuccesful();
      }
    });
  }

  openDialogUnsuccess(): void {
    const dialogRef = this.dialog.open(ModalConfirmComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.setStatusCanceledAndWait();
        this.openUnsuccesful();
      }
    });
  }

  openSuccesful(): void {
    var user;
    if(this.type=='my-oferts'){
       user = this.ofert.acceptedBy;
    }else{
      user = this.ofert.username;
    }
    const dialogRef = this.dialog.open(SuccessfulTransactionComponent, {
      width: '70%',
      height: '70%',
      data: { idOfert: this.ofert.id, type: this.type, idUser: user, ofert: this.ofert }

    });
  }
  openUnsuccesful(): void {
    var user;
    if(this.type=='my-oferts'){
       user = this.ofert.acceptedBy;
    }else{
      user = this.ofert.username;
    }
    const dialogRef = this.dialog.open(UnsuccessfulTransactionComponent, {
      width: '70%',
      height: '70%',
      data: { idOfert: this.ofert.id, type: this.type, idUser: user, ofert: this.ofert }

    });
  }

  showRatingPanel(): void {

    var partner;

    if (this.ofert.status == 'new' || this.ofert.status=='canceled-by-owner') {
      partner = this.person.username;

    } else {
      partner = this.partner.username;
    }

    const dialogRef = this.dialog.open(RatingPanelComponent, {
      width: '75%',
      height: '90%',
      data: { idOfert: this.ofert.id, type: this.type, idUser: partner, ofert: this.ofert }

    });
  }

  setStatusWait() {
    
    this.afs.collection<OfertInterface>(`users-oferts`).doc(`@${this.ofert.acceptedBy}`).collection('accepted-oferts').doc(`${this.ofert.id}`).update({

      status: 'waiting-for-rating'

    }).catch(e => {
      console.log('error', e);
    });

    this.afs.collection<OfertInterface>(`users-oferts`).doc(`@${this.ofert.username}`).collection('normal-oferts').doc(`${this.ofert.id}`).update({

      status: 'waiting-for-rating'

    }).catch(e => {
      console.log('error', e);
    });
  }


  setStatusCancel() {

    if(this.ofert.status=='new'){

      var old_ofert = this.ofert;

      this.ofert.status='canceled-by-owner';

      this.userService.updateOfertPartner(this.ofert);    
      this.userService.getOneOfert(this.ofert.id,this.ofert.username,'my-oferts').subscribe(ofert=>{
        this.ofert=ofert;

        this.OfertService.deleteOfert(old_ofert.id);

        this.router.navigate([`/exchange/my-oferts/`]);
      });

      


    }else{
    
    this.afs.collection<OfertInterface>(`users-oferts`).doc(`@${this.ofert.acceptedBy}`).collection('accepted-oferts').doc(`${this.ofert.id}`).update({

      status: 'canceled-by-owner'

    }).catch(e => {
      console.log('error', e);
    });

    this.afs.collection<OfertInterface>(`users-oferts`).doc(`@${this.ofert.username}`).collection('normal-oferts').doc(`${this.ofert.id}`).update({

      status: 'canceled-by-owner'

    }).catch(e => {
      console.log('error', e);
    });
  }
  }

  setStatusCanceledAndWait() {
    
    this.afs.collection<OfertInterface>(`users-oferts`).doc(`@${this.ofert.acceptedBy}`).collection('accepted-oferts').doc(`${this.ofert.id}`).update({

      status: 'canceled-and-waiting-for-rating'

    }).catch(e => {
      console.log('error', e);
    });

    this.afs.collection<OfertInterface>(`users-oferts`).doc(`@${this.ofert.username}`).collection('normal-oferts').doc(`${this.ofert.id}`).update({

      status: 'canceled-and-waiting-for-rating'

    }).catch(e => {
      console.log('error', e);
    });
  }



  changeAnswer(an: string) {
    this.secureAnswer = an;
  }

  sendMessage() {
    this.authService.isAuth().subscribe(user => {
      this.userService.sendNewMessage(this.ofert, this.content, this.partner.username, user.displayName);
      this.content = '';
    });
  }

  getColorStatusNew(status: string) {
    if (status == 'new') {
      return '#5bc0de';
    } else {
      return '#ccc';
    }
  }

  getColorStatusPending(status: string) {
    if (status == 'pending') {
      return '#5bc0de';
    } else {
      return '#ccc';
    }
  }

  getColorStatusWaiting(status: string) {
    if (status == 'waiting-for-rating') {
      return '#5bc0de';
    } else {
      return '#ccc';
    }
  }

  getColorStatusFinalized(status: string) {
    if (status == 'finalized') {
      return '#22bb33';
    } else {
      return '#ccc';
    }
  }



}
