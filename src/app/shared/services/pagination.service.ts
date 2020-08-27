import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/take';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { WhereFilterOp } from '@firebase/firestore-types';

@Injectable()
export class PaginationService {

  // Source data
  private _done = new BehaviorSubject(false);
  private _error = new BehaviorSubject(false);
  private _empty = new BehaviorSubject(false);
  private _loading = new BehaviorSubject(false);
  private _data = new BehaviorSubject([]);

  private query;

  // Observable data
  data: Observable<any>;
  done: Observable<boolean> = this._done.asObservable();
  loading: Observable<boolean> = this._loading.asObservable();
  error: Observable<boolean> = this._error.asObservable();
  empty: Observable<boolean> = this._empty.asObservable();
  opts;

  constructor(private afs: AngularFirestore) { 
    this.restart();
  }
  // Initial query sets options and defines the Observable
  // passing opts will override the defaults

  init(path: string, field: string, opts?: any) {

    this.restart();

    this.query = {
      path,
      field,
      reverse: false,
      prepend: false,
      ...opts
    }
    this.opts = opts;

    var first;

    if (this.query.group) {
      if (this.query.where) {
        first = this.afs.collectionGroup(this.query.path, ref => {
          return ref
            .orderBy(this.query.field, this.query.reverse ? 'desc' : 'asc')
            .where(this.query.whereField, this.query.operator as WhereFilterOp, this.query.value)
            .limit(this.query.limit)
        })

      } else if (this.query.startAt) {
        first = this.afs.collectionGroup(this.query.path, ref => {
          return ref
            .orderBy(this.query.field)
            .startAt(this.query.text)
            .endAt(this.query.text + "\uf8ff")
            .limit(this.query.limit)
        })

      } else {
        first = this.afs.collectionGroup(this.query.path, ref => {
          return ref
            .orderBy(this.query.field, this.query.reverse ? 'desc' : 'asc')
            .limit(this.query.limit)
        })

      }
    } else {
      if (this.query.where) {
        first = this.afs.collection(this.query.path, ref => {
          return ref
            .orderBy(this.query.field, this.query.reverse ? 'desc' : 'asc')
            .where(this.query.whereField, this.query.operator as WhereFilterOp, this.query.value)
            .limit(this.query.limit)
        })

      } else if (this.query.startAt) {
        first = this.afs.collection(this.query.path, ref => {
          return ref
            .orderBy(this.query.field)
            .startAt(this.query.text).endAt(this.query.text + '\uf8ff')
            .limit(this.query.limit)
        })
      }
      else {
        first = this.afs.collection(this.query.path, ref => {
          return ref
            .orderBy(this.query.field, this.query.reverse ? 'desc' : 'asc')
            .limit(this.query.limit)
        })

      }
    }

    this.mapAndUpdate(first, true)

    // Create the observable array for consumption in components
    this.data = this._data.asObservable()
      .scan((acc, val) => {
        return this.query.prepend ? val.concat(acc) : acc.concat(val)
      })
  }

  restart() {
    this._data = new BehaviorSubject([]);
    
    this._done = new BehaviorSubject(false);
    this.done = this._done.asObservable();

    this._error = new BehaviorSubject(false);
    this.error = this._error.asObservable();

    this._empty = new BehaviorSubject(false);
    this.empty = this._empty.asObservable();

    this._loading = new BehaviorSubject(false);
    this.loading = this._loading.asObservable();
  }
  retry() {
    const cursor = this.getCursor()
    if (cursor) {
      this.more()
    } else {
      this.init(this.query.path, this.query.field, this.opts)
    }
  }


  // Retrieves additional data from firestore
  more() {

    const cursor = this.getCursor()

    var more;

    if (this.query.group) {
      if (this.query.where) {
        more = this.afs.collectionGroup(this.query.path, ref => {
          return ref
            .orderBy(this.query.field, this.query.reverse ? 'desc' : 'asc')
            .where(this.query.whereField, this.query.operator as WhereFilterOp, this.query.value)
            .limit(this.query.limit).startAfter(cursor)
        })

      } else {
        more = this.afs.collectionGroup(this.query.path, ref => {
          return ref
            .orderBy(this.query.field, this.query.reverse ? 'desc' : 'asc')
            .limit(this.query.limit).startAfter(cursor)
        })

      }
    } else {
      if (this.query.where) {
        more = this.afs.collection(this.query.path, ref => {
          return ref
            .orderBy(this.query.field, this.query.reverse ? 'desc' : 'asc')
            .where(this.query.whereField, this.query.operator as WhereFilterOp, this.query.value)
            .limit(this.query.limit).startAfter(cursor)
        })

      } else {
        more = this.afs.collection(this.query.path, ref => {
          return ref
            .orderBy(this.query.field, this.query.reverse ? 'desc' : 'asc')
            .limit(this.query.limit).startAfter(cursor)
        })

      }
    }

    this.mapAndUpdate(more, false)
  }


  // Determines the doc snapshot to paginate query 
  private getCursor() {
    const current = this._data.value
    if (current.length) {
      return this.query.prepend ? current[0].doc : current[current.length - 1].doc
    }
    return null
  }


  // Maps the snapshot to usable format the updates source
  private mapAndUpdate(col: AngularFirestoreCollection<any>, first) {

    if (this._done.value || this._loading.value) { return };

    // loading
    this._loading.next(true)

    // Map snapshot with doc ref (needed for cursor)
    return col.snapshotChanges()
      .do(arr => {
        let values = arr.map(snap => {
          const data = snap.payload.doc.data()
          const doc = snap.payload.doc
          return { ...data, doc }
        })

        // If prepending, reverse the batch order
        values = this.query.prepend ? values.reverse() : values

        // update source with new values, done loading
        this._data.next(values)
        this._loading.next(false)


        // error loading values, mark error
        if (values.length == 0 && first) {
          this._error.next(true)
        }
        // no more values, mark done
        if (!values.length && !first) {
          this._done.next(true)
        }
        // no values, mark empty
        if (!values && first) {
          this._empty.next(true)
        }

      })
      .take(1)
      .subscribe()

  }

}