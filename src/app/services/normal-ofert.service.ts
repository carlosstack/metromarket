import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentData } from "@angular/fire/firestore";
import { OfertInterface } from "../models/ofert";
import { OfertChangeInterface } from "../models/ofert";
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

  private ofertChangeDoc: AngularFirestoreDocument<OfertChangeInterface>;
  private ofertChange: Observable<OfertChangeInterface>;
  private ofertsChangeCollection: AngularFirestoreCollection<OfertChangeInterface>;


  private usersCollection: AngularFirestoreCollection<UserInterface>;
  private userDoc: AngularFirestoreDocument<UserInterface>;

  private date = new Date();


  getAllOferts(user:String) {

    this.oferts  = this.afs.collectionGroup('normal-oferts',ref =>
    ref.where('status','==','new').orderBy('date','desc')).valueChanges();
  
    return this.oferts;
  }

  addOfert(ofert) {

    this.authService.isAuth().subscribe(user => {
      ofert.date=Date.now();
      ofert.ownerPhotoUrl=user.photoURL;
      ofert.ownerUID = user.uid;
      ofert.owner = user.displayName;
      ofert.phoneNumber = user.phoneNumber

      this.ofertsCollection = this.afs.collection('users-oferts').doc(ofert.ownerUID).collection('normal-oferts');
      this.ofertsCollection.get();
      this.ofertsCollection.add(ofert).then((res) => {

        this.ofertDoc = this.afs.doc<OfertInterface>(`normal-oferts/${res.id}`);
      
        this.ofertDoc.update({
          id:res.id
        });

        this.router.navigate([`app/exchange/transaction/my-oferts/${res.id}`]);
       
      });

    })

  }

  addOfertOfTypeChange(ofert: OfertChangeInterface) {


    this.authService.isAuth().subscribe(user => {
      ofert.date=Date.now();
      ofert.owner = user.displayName;
      ofert.ownerUID = user.uid;
      ofert.ownerPhotoUrl=user.photoURL;
      this.ofertsChangeCollection = this.afs.collection<OfertChangeInterface>('normal-oferts');
      this.ofertsChangeCollection.get();
      this.ofertsChangeCollection.add(ofert).then((res) => {

        this.ofertChangeDoc = this.afs.doc<OfertChangeInterface>(`normal-oferts/${res.id}`);
      
        this.ofertChangeDoc.update({
          id:res.id
        });

        this.router.navigate([`app/exchange/transaction/my-oferts/${res.id}`]);
       
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
