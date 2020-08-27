import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionInterface } from '../models/question';
import { AngularFirestore } from '@angular/fire/firestore';
import { CommentInterface } from '../models/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private router: Router, private afs: AngularFirestore) { }

  add(comment: CommentInterface, collection: string) {
    const id = this.afs.createId();
    comment.id = id;
    return this.afs.collection(collection).doc(id).set(comment);
  }
  get(collection) {
    return this.afs.collection(collection, ref =>
      ref.orderBy('date', 'asc')).valueChanges();
  }
  more(collection,last){
    return this.afs.collection(collection, ref =>
      ref.orderBy('date', 'asc').startAfter(last.date)).valueChanges();
  }
  delete(collection,id){
    return this.afs.collection(collection).doc(id).delete()
  }
}
