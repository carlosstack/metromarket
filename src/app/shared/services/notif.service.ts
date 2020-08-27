import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NotificationInterface } from '../models/notification';
import { LastDateInterface } from '../models/lastDate';

@Injectable({
  providedIn: 'root'
})
export class NotifService {

  constructor(private afs: AngularFirestore) { }

  new(uid, notif: NotificationInterface) {
    return this.afs.collection('users-notifications').doc(uid).collection('notifications').add(notif);
  }
  get(uid) {
    return this.afs.collection('users-notifications').doc(uid).collection('notifications').valueChanges();
  }
  setLastOpenedDate(uid, date) {
    console.log('save', date)
    return this.afs.collection('users-notifications').doc(uid).collection('last-date').doc('lastDate').set({ date: date });
  }
  getLastDate(uid) {

    return this.afs.collection('users-notifications').doc(uid).collection('last-date').doc<LastDateInterface>('lastDate').valueChanges();


  }
  getNewNotifications(uid, lastDate) {
    return this.afs.collection('users-notifications').doc(uid).collection('notifications', ref =>
      ref.where('date', '>', lastDate)).valueChanges();
  }

}
