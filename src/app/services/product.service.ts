import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentData } from "@angular/fire/firestore";
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { ProductInterface} from '../models/product' ;
import { map } from 'rxjs/operators';
import { UserInterface } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private afs: AngularFirestore, private authService: AuthService,private router: Router) {

  }
  private elementsCollection: AngularFirestoreCollection<ProductInterface>;
  private elements: Observable<ProductInterface[]>;
  private elementDoc: AngularFirestoreDocument<ProductInterface>;
  private element: Observable<ProductInterface>;

  private usersCollection: AngularFirestoreCollection<UserInterface>;
  private userDoc: AngularFirestoreDocument<UserInterface>;
  
  //actual date
  private date = new Date();
  //Data collection
  private collection = 'marketplace-products';
  
  getAll() {

    this.elementsCollection = this.afs.collection<ProductInterface>(this.collection,ref =>
    ref.orderBy('date','desc'));
    this.elements = this.elementsCollection.valueChanges();

    return this.elements;
  }

  add(element: ProductInterface) {

    this.authService.isAuth().subscribe(user => {
      element.date=Date.now();
      element.owner_name=user.displayName;
      element.owner_phone_number=user.phoneNumber;
      element.owner_id = user.uid;
      this.elementsCollection = this.afs.collection<ProductInterface>(this.collection);
      this.elementsCollection.get();
      this.elementsCollection.add(element).then((res) => {

        this.elementDoc = this.afs.doc<ProductInterface>(this.collection+`/${res.id}`);
      
        this.elementDoc.update({
          id:res.id
        });
      // this go to the product details page
      //  this.router.navigate([`/exchange/transaction/my-elements/${res.id}`]);
       
      });

    })

  }

  getOne(idElement: string) {

    this.elementDoc = this.afs.doc<ProductInterface>(this.collection+`/${idElement}`);

    return this.element = this.elementDoc.snapshotChanges().pipe(map(action => {

      if (action.payload.exists == false) {
        return null;
      } else {
        const data = action.payload.data() as ProductInterface;
        data.id = action.payload.id;
        return data;
      }
    }))

  }

  update(idElement: string){
    this.elementDoc = this.afs.doc<ProductInterface>(this.collection+`/${idElement}`);
    this.elementDoc.update({  
    })

  }

  delete(idElement: string) {
    this.elementDoc = this.afs.doc<ProductInterface>(this.collection+`/${idElement}`);
    return this.elementDoc;
  }

}

