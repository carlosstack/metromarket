import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "@angular/fire/firestore";
import { OfertInterface } from "../models/ofert";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UrgentOfertService {

  constructor(private afs: AngularFirestore) {

    this.ofertsCollection = afs.collection<OfertInterface>('urgentsOferts');
    this.oferts = this.ofertsCollection.valueChanges();
   
  }
  private ofertsCollection: AngularFirestoreCollection<OfertInterface>;
  private oferts: Observable<OfertInterface[]>;


  getAllOferts(){

  }

  addOfert(){

  }

  deleteOfert(){

  }
}
