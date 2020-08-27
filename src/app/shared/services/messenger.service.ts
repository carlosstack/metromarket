import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class MessengerService {

  constructor(private afs: AngularFirestore) { }

  new(id, msg) {
    return this.afs.collection('oferts-chats').doc(id).collection('chats').add(msg);
  }

  get(id) {
    return this.afs.collection('oferts-chats').doc(id).collection('chats',ref =>
    ref.orderBy('date', 'desc')).valueChanges();
  }

  
}

