import { Component, OnInit, Output } from '@angular/core';
import { NormalOfertService } from '../../../services/normal-ofert.service';
import { AuthService } from '../../../services/auth.service';
import { OfertInterface } from 'src/app/models/ofert';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { ModalConfirmComponent } from 'src/app/components/main/modal-confirm/modal-confirm.component';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from 'src/app/components/main/alert/alert.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularFirestore } from '@angular/fire/firestore';

export interface Data {
  text: string;
}






@Component({
  selector: 'app-all-oferts',
  templateUrl: './all-oferts.component.html',
  styleUrls: ['./all-oferts.component.css']
})
export class AllOfertsComponent implements OnInit {


  constructor(private _snackBar: MatSnackBar, private afs: AngularFirestore, public dialog: MatDialog, private router: Router, private normalOfert: NormalOfertService, private authService: AuthService, private userService: UserService, private normalOfertService: NormalOfertService) { }

  public oferts;

  public currentUsername = '';




  ngOnInit() {

    this.authService.isAuth().subscribe(user => {

      this.currentUsername = user.displayName;

      this.normalOfert.getAllOferts().subscribe(oferts => {

        this.oferts = oferts.filter(ofert => ofert.username != `${user.displayName}`);


      })

    })

  }

  showAlert(txt: string) {

    this._snackBar.open(txt, 'X', {
      duration: 3000,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
      panelClass: 'notif'
    });
  }

  openModalConfirm(ofert: OfertInterface): void {
    const dialogRef = this.dialog.open(ModalConfirmComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.onAccept(ofert);
      }
    });
  }

  onAccept(ofert: OfertInterface) {

    const takeOfert = this.afs.firestore.collection("normal-oferts").doc(ofert.id);

    this.afs.firestore.runTransaction(t =>
      t.get(takeOfert).then(ofert => {        
        t.update(takeOfert, { acceptedBy: this.currentUsername });
        this.userService.addOfertUser(ofert.data())
        this.userService.updateOfertPartner(ofert.data())
        t.delete(takeOfert);

      })).then(() => {
        this.router.navigate([`/exchange/transaction/accepted-oferts/${ofert.id}`])
        this.showAlert('¡Aceptaste esta oferta! Comunicate con tu compañero para efectuar la transacción.')
      })
      .catch(error => this.showAlert('Esta oferta ya fue tomada por alguien más.' + error));
  }

}

