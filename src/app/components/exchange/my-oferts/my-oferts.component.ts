import { Component, OnInit, ViewChild } from '@angular/core';
import { NormalOfertService } from 'src/app/services/normal-ofert.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { OfertInterface } from 'src/app/models/ofert';

import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-my-oferts',
  templateUrl: './my-oferts.component.html',
  styleUrls: ['./my-oferts.component.css']
})
export class MyOfertsComponent implements OnInit {

  displayedColumns: string[] = ['type','owner', 'amountMin', 'payForms','date', 'rate'];
  dataSource: MatTableDataSource<OfertInterface>;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  public currentUID:string;
  constructor(private normalOfert: NormalOfertService, private authService: AuthService, private userService: UserService) {
    this.authService.isAuth().subscribe(user => {
      this.currentUID = user.uid;
      this.normalOfert.getMyOferts(user.uid).subscribe(oferts => {
        this.oferts = oferts;
        this.dataSource = new MatTableDataSource(this.oferts);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })

    })
   }

  public oferts;
  public currentUserUID;

  ngOnInit() {
    this.authService.isAuth().subscribe((user)=>{
      this.currentUserUID = user.uid
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
        return 'teal';
      case 'ACCEPTED_UNSUCCESS_AND_WAITING_FOR_RATING':
        return 'coral';
      case 'ACCEPTED_SUCCESS_AND_WAITING_FOR_RATING':
        return 'coral';
      case 'NEW':
        return 'dodgerblue';
      case 'CANCELED':
        return 'gray';
      case 'COMPLETED':
        return 'gray';
    }
  }

  getStatus(status) {
    switch (status) {
      case 'NEW':
        return 'En espera';
      case 'ACCEPTED':
        return 'Aceptado';
      case 'SUCCESS_AND_WAITING_FOR_RATING':
        return 'Por calificar';
      case 'UNSUCCESS_AND_WAITING_FOR_RATING':
        return 'Por calificar';
      case 'CANCELED':
        return 'Cancelado';
      case 'COMPLETED':
        return 'Completado';
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
