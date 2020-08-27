import { Component, OnInit, ViewChild } from '@angular/core';
import { NormalOfertService } from 'src/app/shared/services/normal-ofert.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';
import { OfertInterface } from 'src/app/shared/models/ofert';

import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-accepted-oferts',
  templateUrl: './accepted-oferts.component.html',
  styleUrls: ['../all-oferts/all-oferts.component.css']
})
export class AcceptedOfertsComponent implements OnInit {

  displayedColumns: string[] = [ 'owner', 'amountToSend', 'rate', 'status'];
  dataSource: MatTableDataSource<OfertInterface>;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  
  constructor(private normalOfert: NormalOfertService, private authService: AuthService, private userService: UserService) {
    this.authService.isAuth().subscribe(user => {


      this.normalOfert.getMyAcceptedOferts(user.uid).subscribe(oferts => {
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
        return 'dodgerblue';
      case 'ACCEPTED_UNSUCCESS_AND_WAITING_FOR_RATING':
        return 'dodgerblue';
      case 'ACCEPTED_SUCCESS_AND_WAITING_FOR_RATING':
        return 'dodgerblue';
      case 'NEW':
        return 'dodgerblue';
      case 'CANCELED':
        return 'lightgrey';
      case 'COMPLETED':
        return 'lightgrey';
    }
  }

  getStatus(status) {
    switch (status) {
      case 'ACCEPTED':
        return 'aceptado';
      case 'ACCEPTED_SUCCESS_AND_WAITING_FOR_RATING':
        return 'por calificar';
      case 'ACCEPTED_UNSUCCESS_AND_WAITING_FOR_RATING':
        return 'por calificar';
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
 return ofert.statusAcceptedBy
}
}