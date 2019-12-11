import { Component, OnInit } from '@angular/core';
import { RatingInterface } from '../../../models/rating';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { NormalOfertService } from '../../../services/normal-ofert.service';
import { AuthService } from '../../../services/auth.service';
import { UserService } from '../../../services/user.service';
import { OfertInterface } from '../../../models/ofert';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {



  constructor(private afs: AngularFirestore, private OfertService: NormalOfertService, private route: ActivatedRoute, private authService: AuthService, private userService: UserService) { }

  public rating_value: number;
  public rating_count: number;
  public ofert: OfertInterface;

  ngOnInit() {

    const idOfert = this.route.snapshot.params['id'];
    const type = this.route.snapshot.params['type'];



    this.authService.isAuth().subscribe(user => {

      if (type == 'my-oferts') {

        
        this.userService.getOneOfert(idOfert, user.displayName, type).subscribe(ofert => {

          this.ofert = ofert;

          if (ofert != null) {
            this.calculate_rating(ofert.acceptedBy);
          } else if (ofert == null) {
            this.OfertService.getOneOfert(idOfert).subscribe(ofert => {
              if(ofert==null){
                this.userService.getOneOfert(idOfert,user.displayName,'my-oferts').subscribe(ofert=>{
                  this.ofert = ofert;
                  this.calculate_rating(ofert.username);
                });

              }else{
                this.ofert = ofert;
                this.calculate_rating(ofert.username);
              }
              
            });
          }
        });

      } else if (type == 'accepted-oferts') {

        this.userService.getOneOfert(idOfert, user.displayName, type).subscribe(ofert => {

          this.ofert = ofert;
          this.calculate_rating(ofert.username);
        });

      }

    });

  }

  calculate_rating(username:string) {

    this.rating_value = 0;
    this.rating_count = 0;

    this.afs.collection<RatingInterface>(`users-rating`).doc(`@${username}`).collection('my-ratings').valueChanges().subscribe(ratings => {
      this.rating_count = ratings.length;
    });

    this.afs.collection<RatingInterface>(`users-rating`).doc(`@${username}`).collection<RatingInterface>('my-ratings').valueChanges().subscribe(userRating => {
      userRating.forEach(rating => {

        if (rating.value) {

          this.rating_value += rating.value;

        }

      });

      this.rating_value = this.rating_value / this.rating_count;

    });
  }

  getRatingRounded() {
    return parseFloat(this.rating_value.toPrecision(1));
  }


}
