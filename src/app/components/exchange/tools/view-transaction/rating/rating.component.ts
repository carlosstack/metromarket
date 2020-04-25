import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { UserService } from '../../../../../services/user.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { AuthService } from 'src/app/services/auth.service';
import { RatingInterface } from 'src/app/models/rating';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})


export class RatingComponent implements OnInit {

  @Input() public UID:string;
 
  displayedColumns: string[] = ['type', 'comment'];
  dataSource: MatTableDataSource<RatingInterface>;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

 public ratings;
 public countPositive;
 public countNegative;
 public countNeutral;

  constructor( private userService: UserService,  private authService: AuthService) {

  }

  ngOnInit() {
      this.userService.getUserRatings(this.UID).subscribe(ratings => {
        this.ratings = ratings;
        this.countNegative = ratings.filter(rating => rating.type != 'NEGATIVE').length;
        this.countPositive = ratings.filter(rating => rating.type != 'POSITIVE').length;
        this.countNeutral = ratings.filter(rating => rating.type != 'NEUTRAL').length;
        this.dataSource = new MatTableDataSource(this.ratings);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }




}
