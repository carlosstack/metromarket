import { Component, OnInit } from '@angular/core';
import { NormalOfertService } from '../../../../shared/services/normal-ofert.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../../shared/services/auth.service';
import { UserService } from '../../../../shared/services/user.service';
import { OfertInterface } from '../../../../shared/models/ofert';
import { UserInterface } from '../../../../shared/models/user';

import { MatDialog } from '@angular/material/dialog';
import { ModalConfirmComponent } from '../../../../shared/components/modal-confirm/modal-confirm.component';
import { SuccessfulTransactionComponent } from '../../components/successful-transaction/successful-transaction.component';
import { UnsuccessfulTransactionComponent } from '../../components/unsuccessful-transaction/unsuccessful-transaction.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material';

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

  constructor(private _snackBar: MatSnackBar, private afs: AngularFirestore, public dialog: MatDialog, private OfertService: NormalOfertService, private route: ActivatedRoute, private authService: AuthService, private userService: UserService) { }

  public ofert;
  public user: UserInterface;
  public partner: UserInterface;
  public person: UserInterface;
  public idOfert: string;
  public content: string;
  public chats;

  status: string = '';

  currentUserUID: string = '';

  WA_LINK: string = '#';

  ngOnInit() {

    this.route.queryParams.subscribe(queryParams => {
      // do something with the query params
    });


    this.route.params.subscribe(routeParams => {

      this.authService.isAuth().subscribe(user => {

        this.currentUserUID = user.uid;

        const id = routeParams.id;
        const uid = routeParams.uid;
        this.idOfert = id


        this.OfertService.getOneOfert(id, uid).subscribe(ofert => {

          this.ofert = ofert;

          if (ofert.acceptedByUID && (ofert.acceptedByUID != this.currentUserUID)) {
            this.userService.getOneUser(ofert.acceptedByUID).subscribe(user => {
              this.person = user;

            });
          } else {
            this.userService.getOneUser(ofert.ownerUID).subscribe(user => {
              this.person = user;
            });
          }

          if (this.currentUserUID == this.ofert.ownerUID) {
            this.status = this.ofert.statusOwner;
          } else if (this.currentUserUID == this.ofert.acceptedByUID) {
            this.status = this.ofert.statusAcceptedBy;
          }

        });


      });

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
        this.setStatus('ACCEPTED_SUCCESS_AND_WAITING_FOR_RATING')
      }
    });
  }

  openDialogUnsuccess(): void {
    const dialogRef = this.dialog.open(ModalConfirmComponent, {
      width: '300px',
      data: [this.ofert, this.user,]
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.setStatus('ACCEPTED_UNSUCCESS_AND_WAITING_FOR_RATING')
      }
    });
  }

  openSuccesful(): void {
    var user;
    if (this.ofert.ownerUID == this.currentUserUID) {
      user = this.ofert.acceptedByUID;
    } else {
      user = this.ofert.ownerUID;
    }

    const dialogRef = this.dialog.open(SuccessfulTransactionComponent, {
      width: '40vw',
      data: { idUser: user, ofert: this.ofert }
    });
  }
  openUnsuccesful(): void {
    var uid;
    if (this.ofert.ownerUID == this.currentUserUID) {
      uid = this.ofert.acceptedByUID;
    } else {
      uid = this.ofert.ownerUID;
    }
    const dialogRef = this.dialog.open(UnsuccessfulTransactionComponent, {
      width: '40vw',
      data: { idUser: uid, ofert: this.ofert }
    });
  }

  showRatingPanel(): void {



  }


  setStatusCancel() {

    if (this.ofert.acceptedByUID && (this.ofert.acceptedByUID == this.currentUserUID)) {
      this.ofert.statusAcceptedBy = 'CANCELED';
    } else {
      this.ofert.statusOwner = 'CANCELED'
    }

    this.OfertService.updateOfert(this.ofert)
  }

  showAlert(txt: string) {

    this._snackBar.open(txt, 'X', {
      duration: 3000,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
      panelClass: 'notif'
    });
  }


  setStatus(status: string) {
    var ofertDoc = this.afs.doc<OfertInterface>(`users-oferts/${this.ofert.ownerUID}/oferts/${this.ofert.id}`);

    this.afs.firestore.runTransaction(t =>
      t.get(ofertDoc.ref).then(of => {
        if (of.data().ownerUID == this.currentUserUID) {
          if (this.ofert.statusAcceptedBy == 'ACCEPTED') {
            this.ofert.statusOwner = status;
            t.update(of.ref, this.ofert);
            if (status == 'ACCEPTED_UNSUCCESS_AND_WAITING_FOR_RATING') {
              this.openUnsuccesful();
            } else if (status == 'ACCEPTED_SUCCESS_AND_WAITING_FOR_RATING') {
              this.openSuccesful();
            }
          } else if (this.ofert.statusAcceptedBy == 'ACCEPTED_UNSUCCESS_AND_WAITING_FOR_RATING' || this.ofert.statusAcceptedBy == 'CANCELED') {
            if (status == 'ACCEPTED_UNSUCCESS_AND_WAITING_FOR_RATING') {
              this.ofert.statusOwner = status;
              t.update(of.ref, this.ofert);
              this.openUnsuccesful();
            } else if (status == 'ACCEPTED_SUCCESS_AND_WAITING_FOR_RATING') {
              this.showAlert('Tu compañero a indicado que la transacción no se llevó a cabo, en caso de no ser así, por favor pidele que lo cambie.')
            }
          } else if (this.ofert.statusAcceptedBy == 'ACCEPTED_SUCCESS_AND_WAITING_FOR_RATING' || this.ofert.statusAcceptedBy == 'COMPLETED') {
            if (status == 'ACCEPTED_SUCCESS_AND_WAITING_FOR_RATING') {
              this.ofert.statusOwner = status;
              t.update(of.ref, this.ofert);
              this.openSuccesful()
            } else if (status == 'ACCEPTED_UNSUCCESS_AND_WAITING_FOR_RATING') {
              this.showAlert('Tu compañero a indicado que la transacción si se llevó a cabo, debes indicar lo mismo.')
            }
          }
        } else if (of.data().acceptedByUID == this.currentUserUID) {
          if (this.ofert.statusOwner == 'ACCEPTED') {
            this.ofert.statusAcceptedBy = status;
            t.update(of.ref, this.ofert);
            if (status == 'ACCEPTED_UNSUCCESS_AND_WAITING_FOR_RATING') {
              this.openUnsuccesful();
            } else if (status == 'ACCEPTED_SUCCESS_AND_WAITING_FOR_RATING') {
              this.openSuccesful();
            }
          } else if (this.ofert.statusOwner == 'ACCEPTED_UNSUCCESS_AND_WAITING_FOR_RATING' || this.ofert.statusOwner == 'CANCELED') {
            if (status == 'ACCEPTED_UNSUCCESS_AND_WAITING_FOR_RATING') {
              this.ofert.statusAcceptedBy = status;
              t.update(of.ref, this.ofert);
              this.openUnsuccesful()
            } else if (status == 'ACCEPTED_SUCCESS_AND_WAITING_FOR_RATING') {
              this.showAlert('Tu compañero a indicado que la transacción no se llevó a cabo, en caso de no ser así, por favor pidele que lo cambie.')
            }
          } else if (this.ofert.statusOwner == 'ACCEPTED_SUCCESS_AND_WAITING_FOR_RATING' || this.ofert.statusOwner == 'COMPLETED') {
            if (status == 'ACCEPTED_SUCCESS_AND_WAITING_FOR_RATING') {
              this.ofert.statusAcceptedBy = status;
              t.update(of.ref, this.ofert);
              this.openSuccesful()
            } else if (status == 'ACCEPTED_UNSUCCESS_AND_WAITING_FOR_RATING') {
              this.showAlert('Tu compañero a indicado que la transacción si se llevó a cabo, debes indicar lo mismo.')
            }
          }
        }
      }))
      .catch(error => console.log(error));
  }

  getColorStatusNew(status: string) {
    if (status == 'NEW') {
      return 'dodgerblue';
    }
  }

  getColorStatusPending(status: string) {
    if (status == 'ACCEPTED') {
      return 'teal';
    }
  }

  getColorStatusWaiting(status: string) {
    if (status == 'ACCEPTED_SUCCESS_AND_WAITING_FOR_RATING' || status == 'ACCEPTED_UNSUCCESS_AND_WAITING_FOR_RATING') {
      return 'coral';
    }
  }

  getColorStatusFinalized(status: string) {
    if (status == 'COMPLETED') {
      return 'gray';
    }
  }
  getColorStatusCanceled(status: string) {
    if (status == 'CANCELED') {
      return 'grey';
    }
  }

  canChange() {
    if (this.ofert.ownerUID == this.currentUserUID) {
      if ((this.ofert.statusOwner == 'CANCELED' || this.ofert.statusOwner == 'ACCEPTED_UNSUCCESS_AND_WAITING_FOR_RATING') && (this.ofert.statusAcceptedBy == 'ACCEPTED')) {
        return true;
      }
    } else if (this.ofert.acceptedByUID == this.currentUserUID) {
      if ((this.ofert.statusAcceptedBy == 'CANCELED' || this.ofert.statusAcceptedBy == 'ACCEPTED_UNSUCCESS_AND_WAITING_FOR_RATING') && (this.ofert.statusOwner == 'ACCEPTED')) {
        return true;
      }
    }
    return false;
  }

  getStatusNumber() {
    console.info(this.status)
    switch (this.status) {
      case 'ACCEPTED':
        return 1
      case 'ACCEPTED_SUCCESS_AND_WAITING_FOR_RATING' || 'ACCEPTED_UNSUCCESS_AND_WAITING_FOR_RATING':
        return 2

      case 'COMPLETED':
        return 3

      case 'CANCELED':
        return 4


    }
  }

}
