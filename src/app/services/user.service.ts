import { Injectable, ɵsetCurrentInjector } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestoreCollectionGroup } from "@angular/fire/firestore";
import { UserInterface } from "../models/user";
import { Observable, combineLatest } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs/internal/operators/map';
import { OfertInterface } from '../models/ofert';
import { RatingInterface } from '../models/rating';
import { MessageInterface } from '../models/message';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private afs: AngularFirestore, private authService: AuthService) {

  }
  private userCollection: AngularFirestoreCollection<UserInterface>;
  private userOfertCollection: AngularFirestoreCollection<OfertInterface>;
  private userOfertCollectionGroup: AngularFirestoreCollectionGroup<OfertInterface>;
  private ofertDoc: AngularFirestoreDocument<OfertInterface>;
  private ofertsDocs: AngularFirestoreDocument<OfertInterface[]>;
  private users: Observable<UserInterface[]>;
  private oferts: Observable<OfertInterface[]>;
  private userDoc: AngularFirestoreDocument<UserInterface>;
  private User: Observable<UserInterface>;
  private ofert: Observable<OfertInterface>;

  private chats: Observable<MessageInterface[]>;
  private userChatsCollection: AngularFirestoreCollection<MessageInterface>;
  getAllUsers() {

    this.userCollection = this.afs.collection<UserInterface>('users-profile');
    this.users = this.userCollection.valueChanges();

    return this.users;

  }

  addUser(User: UserInterface): void {

    this.authService.isAuth().subscribe(user => {

      this.afs.collection<UserInterface>('users-profile').doc('@' + `${User.username}`).set({
        name: User.name,
        email: User.email,
        uid: User.uid,
        username: User.username,
        photoUrl: User.photoUrl,
        phone_number: User.phone_number,
        rating: User.rating,
        rating_count: User.rating_count

      });

      user.updateProfile({
        displayName: User.username,
        photoURL: User.photoUrl
      })

    })
  }

  getOneUser(idUser: string) {

    this.userDoc = this.afs.collection<UserInterface>('users-profile').doc('@' + `${idUser}`);

    return this.userDoc;

  }

  updateUser(User: UserInterface) {
    this.afs.collection<UserInterface>('users-profile').doc('@' + `${User.username}`).set({
      name: User.name,
      email: User.email,
      uid: User.uid,
      username: User.username,
      photoUrl: User.photoUrl,
      phone_number: User.phone_number,
      rating: User.rating
    });


  }

  addOfertUser(ofert: OfertInterface): void {

      this.authService.isAuth().subscribe(user => {


        this.afs.collection<OfertInterface>(`users-oferts/@${user.displayName}/accepted-oferts`).doc(`${ofert.id}`).set({
          id: ofert.id,
          destino: ofert.destino,
          divisaMonto: ofert.divisaMonto,
          divisaTasa: ofert.divisaTasa,
          entrega: ofert.entrega,
          monto: ofert.monto,
          origen: ofert.origen,
          tasa: ofert.tasa,
          tipo: ofert.tipo,
          username: ofert.username,
          status: ofert.status,
          date: ofert.date,
          acceptedBy:ofert.acceptedBy
        });
      });


  }

  updateOfertPartner(ofert: OfertInterface): void {

    this.authService.isAuth().subscribe(user => {
        this.afs.collection<OfertInterface>(`users-oferts/@${ofert.username}/normal-oferts`).doc(`${ofert.id}`).set({
          id: ofert.id,
          destino: ofert.destino,
          divisaMonto: ofert.divisaMonto,
          divisaTasa: ofert.divisaTasa,
          entrega: ofert.entrega,
          monto: ofert.monto,
          origen: ofert.origen,
          tasa: ofert.tasa,
          tipo: ofert.tipo,
          username: ofert.username,
          status: ofert.status,
          date: ofert.date,
          acceptedBy:ofert.acceptedBy
        });
      });

  }


  sendNewMessage(ofert: OfertInterface, content: string,sendTo:string,sendBy:string): void {


    this.authService.isAuth().subscribe(user => {

      this.afs.collection(`users-chats`).doc(`@${ofert.username}_@${ofert.acceptedBy}_${ofert.id}`).collection<MessageInterface>('messages').add({
        content:content,
        username:sendTo,
        partner:sendBy,
        date: Date.now()
      });

    });

}

getMyMessages(ofert: OfertInterface) {

  this.userChatsCollection = this.afs.collection(`users-chats`).doc(`@${ofert.username}_@${ofert.acceptedBy}_${ofert.id}`).collection<MessageInterface>('messages',ref =>
  ref.orderBy('date','asc'))

  this.chats = this.userChatsCollection.valueChanges();

  return this.chats;
}

  getMyOferts(uid: string) {

    this.userOfertCollectionGroup = this.afs.collectionGroup('normal-oferts',ref =>
    ref.where('username', '==', `${uid}`).orderBy('date','desc'))

    this.oferts = this.userOfertCollectionGroup.valueChanges();

    return this.oferts;
  }

  //Hacer consultas con querys
  getMyOfertsByQuery(uid: string) {

    this.userOfertCollection = this.afs.collection<OfertInterface>('normal-oferts', ref =>
      ref.where('username', '==', `${uid}`).orderBy('date','desc'));
    

    this.oferts = this.userOfertCollection.valueChanges();

    return this.oferts;
  }

  getMyAcceptedOferts(uid: string) {

    this.userOfertCollection = this.afs.collection<OfertInterface>(`users-oferts/@${uid}/accepted-oferts`,ref =>
    ref.orderBy('date','desc'));
    this.oferts = this.userOfertCollection.valueChanges();

    return this.oferts;
  }

  deleteOfert(idOfert: string) {

    this.ofertDoc = this.afs.doc<OfertInterface>(`users-oferts/${idOfert}/normal-oferts`);
    this.ofertDoc.delete();

  }

  getOneOfert(idOfert: string, uid: string, type: string) {

    if(type=='my-oferts'){
      type='normal-oferts';
    }

    this.ofertDoc = this.afs.doc<OfertInterface>(`users-oferts/@${uid}/${type}/${idOfert}`);

    return this.ofert = this.ofertDoc.snapshotChanges().pipe(map(action => {

      if (action.payload.exists == false) {
        return null;
      } else {
        const data = action.payload.data() as OfertInterface;
        data.id = action.payload.id;
        return data;
      }
    }))

  }

  addRatingPartner(rating: RatingInterface) {

    return this.afs.collection<RatingInterface>(`users-rating`).doc(`@${rating.username}`).collection<RatingInterface>('my-ratings').add(rating);

  }

}
