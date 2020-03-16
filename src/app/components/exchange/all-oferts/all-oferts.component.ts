import { Component, OnInit, ViewChild } from '@angular/core';
import { NormalOfertService } from '../../../services/normal-ofert.service';
import { AuthService } from '../../../services/auth.service';
import { OfertInterface } from 'src/app/models/ofert';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { ModalConfirmComponent } from 'src/app/components/exchange/tools/modal-confirm/modal-confirm.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

export interface Data {
  text: string;
}

@Component({
  selector: 'app-all-oferts',
  templateUrl: './all-oferts.component.html',
  styleUrls: ['./all-oferts.component.css']
})
export class AllOfertsComponent implements OnInit {
  displayedColumns: string[] = ['owner', 'ownerData', 'type', 'amountMin', 'payForms'];
  dataSource: MatTableDataSource<OfertInterface>;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) set content(sort: MatSort) {
    this.dataSource.sort = sort;
  }

  constructor(private userService: UserService, private _snackBar: MatSnackBar, private afs: AngularFirestore, public dialog: MatDialog, private router: Router, private normalOfert: NormalOfertService, private authService: AuthService) {

  }

  public oferts;

  public currentUser;



  ngOnInit() {
    this.authService.isAuth().subscribe(user => {
      this.currentUser = user
      this.normalOfert.getAllOferts(user.uid).subscribe(oferts => {
        this.oferts = oferts.filter(ofert => ofert.ownerUID != user.uid);
        this.dataSource = new MatTableDataSource(this.oferts);
        this.dataSource.paginator = this.paginator;
      });
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  showAlert(txt: string) {

    this._snackBar.open(txt, 'X', {
      duration: 3000,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
      panelClass: 'notif'
    });
  }

  openModalConfirm(ofert): void {
    const dialogRef = this.dialog.open(ModalConfirmComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.onAccept(ofert);
        //window.location.href = 'https://api.whatsapp.com/send?phone='+ofert.phoneNumber;
      }
    });
  }


  onAccept(ofert) {

    const takeOfert = this.afs.firestore.collection("users-oferts").doc(ofert.ownerUID).collection('normal-oferts').doc(ofert.id);

    this.afs.firestore.runTransaction(t =>
      t.get(takeOfert).then(ofert => {

        t.set(takeOfert, { acceptedBy: this.currentUser.displayName, status: 'pending', acceptedByUID:this.currentUser.uid });

      })).then(() => {
        this.router.navigate([`/app/exchange/transaction/accepted-oferts/${ofert.id}`])
        this.showAlert('¡Aceptaste esta oferta! Comunicate con tu compañero para completar la transacción.')
      })
      .catch(error => this.showAlert('Esta oferta ya fue tomada por alguien más.' + error));
  }

}