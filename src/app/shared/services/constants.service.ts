import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "@angular/fire/firestore";
import { map } from 'rxjs/internal/operators/map';
import { ExchangeConstInterface } from "../models/exchangeConstants";
import { Observable } from 'rxjs/internal/Observable';


@Injectable({
  providedIn: 'root'
})
export class ConstantsService {

  constructor(private afs: AngularFirestore) {

  }

  private constants;
  private constDoc: AngularFirestoreDocument<ExchangeConstInterface>;



    
  getExchangeNewOfertComponentConstants() {

    this.constDoc = this.afs.collection("constants").doc('exchange');

    return this.constants = this.constDoc.snapshotChanges().pipe(map(action => {

      if (action.payload.exists == false) {
        return null;
      } else {
        const data = action.payload.data() as ExchangeConstInterface;
        return data;
      }
    }))
  }

}
