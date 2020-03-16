import { Component, OnInit, ViewChild } from '@angular/core';
import { NormalOfertService } from 'src/app/services/normal-ofert.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { OfertInterface } from 'src/app/models/ofert';

import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-accepted-oferts',
  templateUrl: './accepted-oferts.component.html',
  styleUrls: ['./accepted-oferts.component.css']
})
export class AcceptedOfertsComponent implements OnInit {

  displayedColumns: string[] = ['owner', 'type', 'amountMin', 'payForms'];
  dataSource: MatTableDataSource<OfertInterface>;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  
  constructor(private normalOfert: NormalOfertService, private authService: AuthService, private userService: UserService) {
    this.authService.isAuth().subscribe(user => {


      this.userService.getMyAcceptedOferts(user.displayName).subscribe(oferts => {
        this.oferts = oferts;
        this.dataSource = new MatTableDataSource(this.oferts);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    

        
      })

    })
   }

  public oferts;


  public type = 'my-oferts';

  public currentUsername = '';

  ngOnInit() {

  

  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getColor(status: string) {
    switch (status) {
      case 'new':
        return 'blue';
      case 'pending':
        return 'green';
      case 'waiting-for-rating':
        return 'orange';
      case 'finalized':
        return 'gray';
      case 'canceled-and-finalized':
        return 'gray';
      case 'canceled-by-owner':
        return 'gray';
      case 'canceled-and-waiting-for-rating':
        return 'gray';
    }
  }

  getStatus(ofert: OfertInterface) {
    switch (ofert.status) {
      case 'new':
        return 'En espera';
      case 'pending':
        return 'Aceptado';
      case 'waiting-for-rating':
        return 'Por calificar';
      case 'finalized':
        return 'Finalizado';
      case 'canceled-and-finalized':
        return 'Cancelado';
      case 'canceled-by-owner':
        return 'Cancelado';
      case 'canceled-and-waiting-for-rating':
        return 'Cancelado';
    }
  }

  getDate(ofert: OfertInterface) {
    return Date.now();
  }
}
