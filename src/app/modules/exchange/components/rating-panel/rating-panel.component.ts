import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { NormalOfertService } from '../../../../shared/services/normal-ofert.service';
import { AuthService } from '../../../../shared/services/auth.service';
import { UserService } from '../../../../shared/services/user.service';
import { UserInterface } from '../../../../shared/models/user';
import { RatingInterface } from '../../../../shared/models/rating';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SuccessfulData } from '../../pages/transaction/view-transaction.component';

@Component({
  selector: 'app-rating-panel',
  templateUrl: './rating-panel.component.html',
  styleUrls: ['./rating-panel.component.css']
})
export class RatingPanelComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<RatingPanelComponent>, @Inject(MAT_DIALOG_DATA) public data: SuccessfulData,private afs: AngularFirestore, private router: Router, private authService: AuthService, private userService: UserService) { }


  public partner: UserInterface;

  public type: string;
  public idOfert: string;
  public ratings;


  ngOnInit() {


    this.authService.isAuth().subscribe(() => {

      const partner = this.data.idUser;

      this.userService.getOneUser(partner).subscribe(partner => {
        this.partner = partner;
      });

      this.afs.collection<RatingInterface>(`users-rating`).doc(`@${partner}`).collection<RatingInterface>('my-ratings').valueChanges().subscribe(ratings => {
        this.ratings = ratings;
      });

    });

  }


  onClick() {


    if (this.type == 'my-oferts') {
      this.router.navigate([`/exchange/transaction/my-oferts/${this.idOfert}`]);
    } else if (this.type == 'accepted-oferts') {
      this.router.navigate([`/exchange/transaction/accepted-oferts/${this.idOfert}`]);
    }
  }



  getRatingRounded(num: Number) {
    return parseFloat(num.toPrecision(1));
  }


}
