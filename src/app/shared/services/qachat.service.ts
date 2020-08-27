import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { QuestionInterface } from '../models/question';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AnswerInterface } from '../models/answer';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class QachatService {

  constructor(private afs: AngularFirestore, private router: Router) { }
  addQuestion(question: QuestionInterface) {
    return this.afs.collection('users-questions').doc(question.ownerUID).collection('questions').add(question).then(questionDoc => {
      questionDoc.update({
        id: questionDoc.id
      }).then((_) => {
        this.router.navigateByUrl(`/app/qa/a/(qa:question-page/${question.ownerUID}/${questionDoc.id})`);
      })
    })
  }



  getQuestion(id, uid) {
    var ofertDoc = this.afs.doc<QuestionInterface>(`users-questions/${uid}/questions/${id}`);
    return ofertDoc.snapshotChanges().pipe(map(action => {

      if (action.payload.exists == false) {
        return null;
      } else {
        const data = action.payload.data() as QuestionInterface;
        data.id = action.payload.id;
        return data;
      }
    }))

  }

  addVoteToQuestion(id, value, uid) {
    const increment = firebase.firestore.FieldValue.increment(1);
    const decrement = firebase.firestore.FieldValue.increment(-1);

    const batch = this.afs.firestore.batch();
    const questionRef = this.afs.doc<QuestionInterface>(`users-questions/${uid}/questions/${id}`).ref;

    var votes = {}
    votes[`${uid}`] = value;

    if (value) {
      batch.update(questionRef, { votesCount: increment })
    } else {
      batch.update(questionRef, { votesCount: decrement })
    }
    console.log(votes)
    batch.update(questionRef, { votes })

    return batch.commit();
  }

  //answers
  addAnswer(answer: AnswerInterface) {

    const increment = firebase.firestore.FieldValue.increment(1);
    const batch = this.afs.firestore.batch();
    const id = this.afs.createId();

    answer.id = id;

    const answerRef = this.afs.collection('questions-answers').doc(answer.qid).collection('answers').doc(id).ref;
    const questionRef = this.afs.collection('users-questions').doc(answer.quid).collection('questions').doc(answer.qid).ref;

    batch.set(answerRef, answer);
    return batch.commit();

  }

  getAnswers(qid: string) {
    return this.afs.collection(`questions-answers/${qid}/answers`, ref =>
      ref.orderBy('date', 'desc')).valueChanges();
  }



  deleteAnswer(qid, id) {
    return this.afs.collection('questions-answers').doc(qid).collection('answers').doc(id).delete();
  }

  addVoteToAnswer(qid, id, value, uid) {

    const increment = firebase.firestore.FieldValue.increment(1);
    const decrement = firebase.firestore.FieldValue.increment(-1);

    const batch = this.afs.firestore.batch();
    const answerRef = this.afs.collection('questions-answers').doc(qid).collection('answers').doc(id).ref;

    var votes = {}
    votes[`${uid}`] = value;

    if (value) {
      batch.update(answerRef, { votesCount: increment })
    } else {
      batch.update(answerRef, { votesCount: decrement })
    }
    console.log(votes)
    batch.update(answerRef, { votes })

    return batch.commit();
  }

  
}
