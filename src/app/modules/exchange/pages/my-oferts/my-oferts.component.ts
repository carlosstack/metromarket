import { Component, OnInit, ViewChild } from '@angular/core';
import { NormalOfertService } from 'src/app/shared/services/normal-ofert.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';
import { OfertInterface } from 'src/app/shared/models/ofert';

import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-my-oferts',
  templateUrl: './my-oferts.component.html',
  styleUrls: ['../all-oferts/all-oferts.component.css']
})
export class MyOfertsComponent implements OnInit {

  displayedColumns: string[] = [ 'owner', 'amountToSend', 'rate', 'status'];
  dataSource: MatTableDataSource<OfertInterface>;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  public currentUID:string;
  
  constructor(private normalOfert: NormalOfertService, private authService: AuthService, private userService: UserService) {
    
   }

  public oferts;
  public currentUserUID;

  ngOnInit() {
    this.authService.isAuth().subscribe(user => {
      this.currentUserUID = user.uid;
      this.normalOfert.getMyOferts(user.uid).subscribe(oferts => {
        this.oferts = oferts;
        this.dataSource = new MatTableDataSource(this.oferts);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })

    })

  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getColor(status: string) {
    switch (status) {
      case 'ACCEPTED':
        return 'dodgerblue';
      case 'ACCEPTED_UNSUCCESS_AND_WAITING_FOR_RATING':
        return 'dodgerblue';
      case 'ACCEPTED_SUCCESS_AND_WAITING_FOR_RATING':
        return 'dodgerblue';
      case 'NEW':
        return 'dodgerblue';
      case 'CANCELED':
        return 'transparent';
      case 'COMPLETED':
        return 'transparent';
    }
  }

  getStatus(status) {
    switch (status) {
      case 'NEW':
        return 'pendiente';
      case 'ACCEPTED':
        return 'aceptado';
      case 'ACCEPTED_SUCCESS_AND_WAITING_FOR_RATING':
        return 'confirmado';
      case 'ACCEPTED_UNSUCCESS_AND_WAITING_FOR_RATING':
        return 'fallida';
      case 'CANCELED':
        return 'cancelado';
      case 'COMPLETED':
        return 'completado';
    }
  }

  getDate(ofert: OfertInterface) {
    return Date.now();
  }

getStatusByOfert(ofert) {
  if (this.currentUserUID == ofert.ownerUID) {
    return ofert.statusOwner;
  } else if (this.currentUserUID == ofert.acceptedByUID) {
    return ofert.statusAcceptedBy;
  }
}
}
