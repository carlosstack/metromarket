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
import { StorageService } from 'src/app/services/storage.service';

export interface Data {
  text: string;
}

@Component({
  selector: 'app-all-oferts',
  templateUrl: './all-oferts.component.html',
  styleUrls: ['./all-oferts.component.css'],

})
export class AllOfertsComponent implements OnInit {
  displayedColumns: string[] = ['type', 'owner', 'amountMin', 'payForms', 'date', 'rate'];
  dataSource: MatTableDataSource<OfertInterface>;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;


  constructor(private storageService: StorageService, private userService: UserService, private _snackBar: MatSnackBar, private afs: AngularFirestore, public dialog: MatDialog, private router: Router, private normalOfert: NormalOfertService, private authService: AuthService) {

  }

  public oferts;


  ngOnInit() {
    this.authService.isAuth().subscribe(user => {
      this.normalOfert.getAllOferts(user.uid).subscribe(oferts => {
        this.oferts = oferts.filter((ofert)=>ofert.ownerUID!=user.uid).sort((a,b)=> b.date - a.date);
        this.dataSource = new MatTableDataSource(this.oferts);
        this.dataSource.sort = this.sort;
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
      }
    });
  }


  onAccept(ofert) {
    this.normalOfert.updateOfertToAcepted(ofert, this._snackBar);
  }

  getUser(uid: string) {
    this.userService.getOneUser(uid).subscribe((user) => { return user })
    return null
  }
}