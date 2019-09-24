import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentData } from "@angular/fire/firestore";
import { OfertInterface } from "../models/ofert";
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs/internal/operators/map';
import { UserInterface } from '../models/user';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class NormalOfertService {

  constructor(private afs: AngularFirestore, private authService: AuthService,private router: Router) {

  }
  private ofertsCollection: AngularFirestoreCollection<OfertInterface>;
  private oferts: Observable<OfertInterface[]>;
  private ofertDoc: AngularFirestoreDocument<OfertInterface>;
  private ofert: Observable<OfertInterface>;

  private usersCollection: AngularFirestoreCollection<UserInterface>;
  private userDoc: AngularFirestoreDocument<UserInterface>;

  private date = new Date();


  getAllOferts() {

    this.ofertsCollection = this.afs.collection<OfertInterface>('normal-oferts',ref =>
    ref.orderBy('date','desc'));
    this.oferts = this.ofertsCollection.valueChanges();

    return this.oferts;
  }

  addOfert(ofert: OfertInterface) {


    this.authService.isAuth().subscribe(user => {
      ofert.date=Date.now();
      ofert.username = user.displayName;
      this.ofertsCollection = this.afs.collection<OfertInterface>('normal-oferts');
      this.ofertsCollection.get();
      this.ofertsCollection.add(ofert).then((res) => {

        this.ofertDoc = this.afs.doc<OfertInterface>(`normal-oferts/${res.id}`);
      
        this.ofertDoc.update({
          id:res.id
        });

        this.router.navigate([`/exchange/transaction/my-oferts/${res.id}`]);
       
      });

    })

  }

  getOneOfert(idOfert: string) {

    this.ofertDoc = this.afs.doc<OfertInterface>(`normal-oferts/${idOfert}`);

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

  updateOfert(idOfert: string){
    this.ofertDoc = this.afs.doc<OfertInterface>(`normal-oferts/${idOfert}`);
    this.ofertDoc.update({
      
    })

  }

  deleteOfert(idOfert: string) {

    this.ofertDoc = this.afs.doc<OfertInterface>(`normal-oferts/${idOfert}`);
    return this.ofertDoc;

  }


}
