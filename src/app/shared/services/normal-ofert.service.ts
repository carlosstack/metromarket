import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentData } from "@angular/fire/firestore";
import { OfertInterface } from "../models/ofert";
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map } from 'rxjs/internal/operators/map';
import { UserInterface } from '../models/user';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { NotifService } from './notif.service';



@Injectable({
  providedIn: 'root'
})
export class NormalOfertService {

  constructor(private notifService: NotifService, private userService: UserService, private afs: AngularFirestore, private authService: AuthService, private router: Router) {

  }
  private ofertsCollection: AngularFirestoreCollection<OfertInterface>;
  private oferts: Observable<OfertInterface[]>;
  private ofertDoc: AngularFirestoreDocument<OfertInterface>;
  private ofert: Observable<OfertInterface>;

  private usersCollection: AngularFirestoreCollection<UserInterface>;
  private userDoc: AngularFirestoreDocument<UserInterface>;

  private date = new Date();


  getAllOferts(user: String) {

    this.oferts = this.afs.collectionGroup('oferts', ref =>
      ref.orderBy('date', 'desc').where('status','==','NEW')).valueChanges();

    return this.oferts;
  }

  getMyOferts(uid: String) {

    this.oferts = this.afs.collectionGroup('oferts', ref =>
      ref.where('ownerUID', '==', uid).orderBy('date', 'desc')).valueChanges();

    return this.oferts;
  }

  getMyAcceptedOferts(uid: String) {

    this.oferts = this.afs.collectionGroup('oferts', ref =>
      ref.where('acceptedByUID', '==', uid).orderBy('date', 'desc')).valueChanges();

    return this.oferts;
  }

  //PARA CARGAR LAS TRANSACCIONES ACTIVAS CARGADAS EN LA SIDEBAR DEL EXCHANGE
  getMyActiveOferts(uid: string) {
    this.oferts = this.afs.collectionGroup('oferts', ref =>
      ref.where('ownerUID', '==', uid).orderBy("statusOwner").startAt('ACCEPTED').endAt('ACCEPTED' + '\uf8ff')).valueChanges();

    return this.oferts;
  }
  getMyAcceptedActiveOferts(uid: string) {
    this.oferts = this.afs.collectionGroup('oferts', ref =>
      ref.where('acceptedByUID', '==', uid).orderBy("statusAcceptedBy").startAt('ACCEPTED').endAt('ACCEPTED' + '\uf8ff')).valueChanges();

    return this.oferts;
  }
  getMyNewActiveOferts(uid: string) {
    this.oferts = this.afs.collectionGroup('oferts', ref =>
      ref.where('ownerUID', '==', uid).orderBy("statusOwner").startAt('NEW').endAt('NEW' + '\uf8ff')).valueChanges();

    return this.oferts;
  }
  ////////////////

  addOfert(ofert) {


    this.authService.isAuth().subscribe(user => {

      this.userService.getOneUser(user.uid).subscribe((user) => {

        ofert.date = Date.now();
        ofert.ownerPhotoUrl = user.photoUrl;
        ofert.ownerUID = user.uid;
        ofert.owner = user.firstName + ' ' + user.lastName;
        ofert.phoneNumber = user.phone_number;
        ofert.ownerRating = user.rating;
        ofert.ownerRatingCount = user.rating_count;

        this.ofertsCollection = this.afs.collection(`users-oferts/${ofert.ownerUID}/oferts`);
        this.ofertsCollection.get();
        this.ofertsCollection.add(ofert).then((res) => {

          this.ofertDoc = this.afs.doc<OfertInterface>(`users-oferts/${ofert.ownerUID}/oferts/${res.id}`);

          this.ofertDoc.update({
            id: res.id
          }).then((_) => {
            this.router.navigateByUrl(`/app/exchange/e/(exchange:transaction/${ofert.ownerUID}/${res.id})`);
          });

        });

      })

    })

  }

  updateOfertToAcepted(ofert: OfertInterface, _snackBar) {

    this.authService.isAuth().subscribe(user => {

      ofert.acceptedByUID = user.uid;
      ofert.status = 'ACCEPTED';
      ofert.statusOwner = "ACCEPTED";
      ofert.statusAcceptedBy = "ACCEPTED";

      var ofertDoc = this.afs.doc<OfertInterface>(`users-oferts/${ofert.ownerUID}/oferts/${ofert.id}`);

      this.afs.firestore.runTransaction(t =>
        t.get(ofertDoc.ref).then(of => {
          if (of.data().statusOwner == 'NEW') {
            t.update(of.ref, ofert);

          }
        })).then(() => {
          this.notifService.new(ofert.ownerUID, {
            title: user.displayName + ' ha aceptado tu oferta: ',
            info:  ofert.type + ' ' + ofert.amountToSend + ofert.currencyAmountToSend + ' por ' + ofert.amountToReceive + ofert.currencyAmountToReceive,
            link: `/app/exchange/transaction/${ofert.ownerUID}/${ofert.id}`,
            date:  Date.now(),
          }).then(() => {
            this.router.navigateByUrl(`/app/exchange/transaction/${ofert.ownerUID}/${ofert.id}`);
            this.showAlert('¡Aceptaste esta oferta! Comunicate con tu compañero para completar la transacción.', _snackBar)
          })
        })
        .catch(error => this.showAlert('Esta oferta ya fue tomada por alguien más.' + error, _snackBar));
    });

  }
  updateOfert(ofert) {

    var ofertDoc = this.afs.doc<OfertInterface>(`users-oferts/${ofert.ownerUID}/oferts/${ofert.id}`);

    this.afs.firestore.runTransaction(t =>
      t.get(ofertDoc.ref).then(of => {

        t.update(of.ref, ofert);

      }))
      .catch(error => console.log(error));

  }



  showAlert(txt: string, _snackBar) {

    _snackBar.open(txt, 'X', {
      duration: 3000,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
      panelClass: 'notif'
    });
  }

  getOneOfert(id, uid) {
    var ofertDoc = this.afs.doc<OfertInterface>(`users-oferts/${uid}/oferts/${id}`);
    return ofertDoc.snapshotChanges().pipe(map(action => {

      if (action.payload.exists == false) {
        return null;
      } else {
        const data = action.payload.data() as OfertInterface;
        data.id = action.payload.id;
        return data;
      }
    }))

  }



}
