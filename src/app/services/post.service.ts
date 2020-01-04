import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentData } from "@angular/fire/firestore";
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { PostInterface} from '../models/Post' ;
import { map } from 'rxjs/operators';
import { UserInterface } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private afs: AngularFirestore, private authService: AuthService,private router: Router) {

  }
  private elementsCollection: AngularFirestoreCollection<PostInterface>;
  private elements: Observable<PostInterface[]>;
  private elementDoc: AngularFirestoreDocument<PostInterface>;
  private element: Observable<PostInterface>;

  private usersCollection: AngularFirestoreCollection<UserInterface>;
  private userDoc: AngularFirestoreDocument<UserInterface>;
  
  //actual date
  private date = new Date();
  //Data collection
  private collection = 'posts';
  
  getAll() {

    this.elementsCollection = this.afs.collection<PostInterface>(this.collection,ref =>
    ref.orderBy('date','desc'));
    this.elements = this.elementsCollection.valueChanges();

    return this.elements;
  }

  add(element: PostInterface) {

    this.authService.isAuth().subscribe(user => {
      element.date=Date.now();
      element.owner_name=user.displayName;
      element.owner_id = user.uid;
      element.owner_photo_url = user.photoURL;
      this.elementsCollection = this.afs.collection<PostInterface>(this.collection);
      this.elementsCollection.get();
      this.elementsCollection.add(element).then((res) => {

        this.elementDoc = this.afs.doc<PostInterface>(this.collection+`/${res.id}`);
      
        this.elementDoc.update({
          id:res.id
        });

      // action before add post to collection
      //true if was successfull
      //false if not

      if(res){
        return true
      }else{
        return false;
      }
      });

    })

  }

  getOne(idElement: string) {

    this.elementDoc = this.afs.doc<PostInterface>(this.collection+`/${idElement}`);

    return this.element = this.elementDoc.snapshotChanges().pipe(map(action => {

      if (action.payload.exists == false) {
        return null;
      } else {
        const data = action.payload.data() as PostInterface;
        data.id = action.payload.id;
        return data;
      }
    }))

  }

  update(idElement: string){
    this.elementDoc = this.afs.doc<PostInterface>(this.collection+`/${idElement}`);
    this.elementDoc.update({  
    })

  }

  delete(idElement: string) {
    this.elementDoc = this.afs.doc<PostInterface>(this.collection+`/${idElement}`);
    return this.elementDoc;
  }

}

