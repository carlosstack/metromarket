import { Component, OnInit, Output } from '@angular/core';
import { NormalOfertService } from '../../services/normal-ofert.service';
import { AuthService } from '../../services/auth.service';
import { OfertInterface } from 'src/app/models/ofert';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { ModalConfirmComponent } from 'src/app/modal-confirm/modal-confirm.component';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from 'src/app/alert/alert.component';
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

    var aux = true;

    this.normalOfertService.getOneOfert(ofert.id).subscribe(ofert => {
      if (ofert.acceptedBy == null) {
        aux = false;
        this.authService.isAuth().subscribe(user => {
          this.afs.doc<OfertInterface>(`normal-oferts/${ofert.id}`).update({
            acceptedBy: user.displayName
          })
          this.normalOfertService.deleteOfert(ofert.id).delete();
          this.userService.addOfertUser(ofert);
          this.userService.updateOfertPartner(ofert);
          this.router.navigate([`/exchange/transaction/accepted-oferts/${ofert.id}`]);
        })
      } else {
        if (aux) {
          this.showAlert('Esta oferta ya fue tomada por alguien más.');
        }
      }
    })
  }

}

