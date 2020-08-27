const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();
const FieldValue = require('firebase-admin').firestore.FieldValue;
const increment = FieldValue.increment(1);
const decrement = FieldValue.increment(-1);

//this function increment the answers count when an answer document is create
exports.updateAnswersCountToQuestion = functions.firestore.document('questions-answers/{qid}/answers/{aid}')
    .onCreate((snapshot, context) => {
        const qid = snapshot.data().qid
        const quid = snapshot.data().quid;
        db.doc(`users-questions/${quid}/questions/${qid}`).update({ answers: increment });
    });
//this functions increment the comments count when an comment document is create 
exports.updateCommentCountToAnswer = functions.firestore.document('qachat/answers/{id}/answer/comments/{cid}')
    .onCreate((snapshot, context) => {
        const id = snapshot.data().docID;
        const pid = snapshot.data().parentID;
        db.doc(`questions-answers/${pid}/answers/${id}`).update({ commentsCount: increment });
    });
exports.updateCommentCountToQuestion = functions.firestore.document('qachat/questions/{id}/question/comments/{cid}')
    .onCreate((snapshot, context) => {
        const id = snapshot.data().docID;
        const uid = snapshot.data().docUID;
        db.doc(`users-questions/${uid}/questions/${id}`).update({ commentsCount: increment });
    });
//this function concat the tags array whit new tags when a question document is created
exports.updateTags = functions.firestore.document('users-questions/{uid}/questions/{id}')
    .onCreate((snapshot, context) => {
        const tags = snapshot.data().tags;
        tags.forEach(tag => {
            db.doc(`qachat/tags/list/${tag}`).set({ tag: tag, count: increment }, { merge: true });

        });

    });