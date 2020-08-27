import { Component, OnInit, ViewChild } from '@angular/core';
import { NormalOfertService } from '../../../../shared/services/normal-ofert.service';
import { AuthService } from '../../../../shared/services/auth.service';
import { OfertInterface } from 'src/app/shared/models/ofert';
import { UserService } from '../../../../shared/services/user.service';
import { Router } from '@angular/router';
import { ModalConfirmComponent } from 'src/app/shared/components/modal-confirm/modal-confirm.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { AdvancedFilterComponent } from '../../components/advanced-filter/advanced-filter.component';
import { Subscription } from 'rxjs/Subscription';

export interface Data {
  text: string;
}

@Component({
  selector: 'app-all-oferts',
  templateUrl: './all-oferts.component.html',
  styleUrls: ['./all-oferts.component.css'],

})
export class AllOfertsComponent implements OnInit {
  displayedColumns: string[] = [ 'owner', 'amountToSend', 'rate', 'status'];
  dataSource: MatTableDataSource<OfertInterface>;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  isFilter: boolean = false;
  filters;

  ofertsSubscription: Subscription;
  usersSubscription: Subscription;

  constructor(private userService: UserService, private _snackBar: MatSnackBar, private afs: AngularFirestore, public dialog: MatDialog, private router: Router, private normalOfert: NormalOfertService, private authService: AuthService) {

  }

  public oferts: OfertInterface[];


  ngOnInit() {
    this.getOferts();
  }

  getOferts() {
    this.usersSubscription = this.authService.isAuth().subscribe(user => {
      this.ofertsSubscription = this.normalOfert.getAllOferts(user.uid).subscribe(oferts => {
        this.oferts = oferts.filter((ofert) => ofert.ownerUID != user.uid).sort((a, b) => b.date - a.date);
        if (this.isFilter) {
          this.filter(this.filters);
        } else {
          this.dataSource = new MatTableDataSource(this.oferts);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }
      });
    });
  }
  openModalFilter(): void {
    if (this.oferts.length > 0) {

      const dialogConfig = new MatDialogConfig();
      dialogConfig.width = '500px';
      dialogConfig.minWidth = '300px';

      const dialogRef = this.dialog.open(AdvancedFilterComponent, dialogConfig);

      dialogRef.afterClosed().subscribe(result => {

        if (result) {
          this.filters = result;
          this.filter(result);
        }

      });
    }
  }
  delFilter() {
    this.isFilter = false;
    this.getOferts();
  }
  filter(filters) {
    if (filters.amountMin && !filters.amountMax) {
      this.oferts = this.oferts.filter(ofert => (ofert.amountToSend >= filters.amountMin))
      this.isFilter = true;
    }
    if (!filters.amountMin && filters.amountMax) {
      this.oferts = this.oferts.filter(ofert => (ofert.amountToSend <= filters.amountMax))
      this.isFilter = true;
    }
    if (filters.amountMin && filters.amountMax) {
      this.oferts = this.oferts.filter(ofert => (ofert.amountToSend <= filters.amountMax))
      this.oferts = this.oferts.filter(ofert => (ofert.amountToSend >= filters.amountMin))
      this.isFilter = true;
    }
    if (filters.type) {
      this.oferts = this.oferts.filter(ofert => (ofert.type === filters.type))
      this.isFilter = true;
    }
    if (filters.rateMax) {
      this.oferts = this.oferts.filter(ofert => (ofert.rate <= filters.rateMax))
      this.isFilter = true;
    }
    this.dataSource = new MatTableDataSource(this.oferts);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
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
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '300px';


    const dialogRef = this.dialog.open(ModalConfirmComponent, dialogConfig);

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