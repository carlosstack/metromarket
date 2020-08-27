import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "@angular/fire/firestore";
import { UserInterface, UserVerificationInterface } from "../models/user";
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { RatingInterface } from '../models/rating';
import { Router } from '@angular/router';
import { OfertInterface } from '../models/ofert';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private router: Router, private afs: AngularFirestore, private authService: AuthService) {

  }
  private userCollection: AngularFirestoreCollection<UserInterface>;
  private users: Observable<UserInterface[]>;
  private userDoc: AngularFirestoreDocument<UserInterface>;

  getAllUsers() {

    this.userCollection = this.afs.collection<UserInterface>('users');
    this.users = this.userCollection.valueChanges();

    return this.users;

  }
  addUserVerification(user: UserVerificationInterface, _snackBar) {

    var userVerificationDoc = this.afs.doc<UserVerificationInterface>(`users-verification/${user.uid}`).ref;
    var userDoc = this.afs.doc<UserVerificationInterface>(`users/${user.uid}`).ref;

    var batch = this.afs.firestore.batch()

    batch.set(userVerificationDoc, user)
    batch.set(userDoc, ({
      firstName: user.firstName,
      lastName: user.lastName,
      uid: user.uid,
      dni:user.dni,
      gender:user.gender,
      address:user.address,
      photoUrl: null,
      phone_number: user.phone_number,
      rating: 0,
      rating_count: 0,
      verified: true
    }))

    batch.commit().then(() => {
      this.authService.isAuth().subscribe(u => {
        u.updateProfile({
          displayName: user.firstName+' '+user.lastName,
          photoURL: null
        }).then(() => {
          this.showAlert('¡Cuenta verficada con exito!', _snackBar)
          this.router.navigate([`/app/myAccount`])
        }).catch((e) => {
          this.showAlert('Oops! Ha ocurrido un error, intentalo nuevamente. ' + e, _snackBar)
          return false
        })
      })
    }).catch((e) => {
      this.showAlert('Oops! Ha ocurrido un error, intentalo nuevamente.' + e, _snackBar)
      return false
    })

    return false
  }

  showAlert(txt: string, _snackBar) {

    _snackBar.open(txt, 'X', {
      duration: 3000,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
      panelClass: 'notif'
    });
  }

  addUser(User: UserInterface): void {

    this.authService.isAuth().subscribe(user => {

      this.afs.collection<UserInterface>('users').doc(User.uid).set({
        firstName: User.firstName,
        lastName: User.lastName,
        uid: User.uid,
        photoUrl: User.photoUrl,
        phone_number: User.phone_number,
        rating: User.rating,
        rating_count: User.rating_count

      }).then((_) => {
        user.updateProfile({
          displayName: User.firstName + ' ' + User.lastName,
          photoURL: User.photoUrl
        }).then((_) => {
          this.router.navigate(['app/exchange/e/(exchange:all)']);
        })
      });

    })
  }

  getOneUser(uid: string) {
    this.userDoc = this.afs.collection<UserInterface>('users').doc(uid);
    return this.userDoc.valueChanges();
  }

  updateUser(user: UserInterface) {
    this.afs.collection<UserInterface>('users').doc(user.uid).update(user)
  }

  addRatingPartner(rating: RatingInterface,ofert:OfertInterface):any {

    var batch = this.afs.firestore.batch();
    var ratingDoc = this.afs.collection<RatingInterface>(`users-reviews`).doc(rating.userUID).collection<RatingInterface>('reviews').doc(rating.ofertID).ref;
    var ofertDoc = this.afs.collection<OfertInterface>('users-oferts').doc(ofert.ownerUID).collection('oferts').doc(ofert.id).ref;
    
    batch.set(ratingDoc,rating);
    batch.set(ofertDoc,ofert);
    return batch.commit()

  }

  getUserRatings(uid){
    var ratingCollection = this.afs.collection<RatingInterface>(`users-reviews`).doc(uid).collection<RatingInterface>('reviews');
    return ratingCollection.valueChanges();
  }

}
