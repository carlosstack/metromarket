import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentData } from "@angular/fire/firestore";
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { ProductInterface } from '../models/product';
import { map } from 'rxjs/operators';
import { UserInterface } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private afs: AngularFirestore, private authService: AuthService, private router: Router) {

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


  getAll(first, last) {

    var ref = this.afs.collection<ProductInterface>(this.collection);

    if (first) {
      this.elementsCollection = this.afs.collection<ProductInterface>(this.collection, ref =>
        ref.orderBy('date', 'desc').limit(20).endBefore(first.date));
      this.elements = this.elementsCollection.valueChanges();
    } else if (last) {
      console.log('in last')
      this.elementsCollection = this.afs.collection<ProductInterface>(this.collection, ref =>
        ref.orderBy('date', 'desc').limit(20).startAfter(last.date));
      this.elements = this.elementsCollection.valueChanges();
    } else {
      this.elementsCollection = this.afs.collection<ProductInterface>(this.collection, ref =>
        ref.orderBy('date', 'desc').limit(20));
      this.elements = this.elementsCollection.valueChanges();
    }

    return this.elements;
  }

  getRecent(limit) {
    this.elementsCollection = this.afs.collection<ProductInterface>(this.collection, ref =>
      ref.orderBy('date', 'desc').limit(limit));
    this.elements = this.elementsCollection.valueChanges();
    return this.elements;
  }

  getMyProducts(id) {

    this.elementsCollection = this.afs.collection<ProductInterface>(this.collection, ref =>
      ref.orderBy('date', 'desc').where('owner_id', '==', id));
    this.elements = this.elementsCollection.valueChanges();


    return this.elements;
  }


  searchProducts(word: string, first, last) {
    word = word.trim().toLowerCase()
    if (word.length > 0) {

      if (first) {
        this.elementsCollection = this.afs.collection<ProductInterface>(this.collection, ref =>
          ref.orderBy('date', 'desc').where("productSearch", "array-contains", word).endBefore(first.date).limit(20));
        this.elements = this.elementsCollection.valueChanges();
      } else if (last) {
        this.elementsCollection = this.afs.collection<ProductInterface>(this.collection, ref =>
          ref.orderBy('date', 'desc').where("productSearch", "array-contains", word).startAfter(last.date).limit(20));
        this.elements = this.elementsCollection.valueChanges();
      } else {
        this.elementsCollection = this.afs.collection<ProductInterface>(this.collection, ref =>
          ref.orderBy('date', 'desc').where("productSearch", "array-contains", word).limit(20));
        this.elements = this.elementsCollection.valueChanges();
      }

      return this.elements;
    }
  }

  searchCategory(category, first, last) {
    if (first) {
      this.elementsCollection = this.afs.collection<ProductInterface>(this.collection, ref =>
        ref.orderBy('date', 'desc').where("category", "==", category).endBefore(first.date).limit(20));
      this.elements = this.elementsCollection.valueChanges();
    } else if (last) {
      this.elementsCollection = this.afs.collection<ProductInterface>(this.collection, ref =>
        ref.orderBy('date', 'desc').where("category", "==", category).startAfter(last.date).limit(20));
      this.elements = this.elementsCollection.valueChanges();

    } else {
      this.elementsCollection = this.afs.collection<ProductInterface>(this.collection, ref =>
        ref.orderBy('date', 'desc').where("category", "==", category).limit(20));
      this.elements = this.elementsCollection.valueChanges();

    }

    return this.elements;
  }

  add(element: ProductInterface) {

    this.authService.isAuth().subscribe(user => {
      element.date = Date.now();
      element.owner_id = user.uid;
      var cleanTitle = element.title.toLowerCase()
      cleanTitle = cleanTitle.trim()
      var arrayClean = []
      cleanTitle.split(' ').forEach(element => {
        if (element.length > 0) {
          arrayClean.push(element.trim())
        }
      });
      element.productSearch = arrayClean;

      this.elementsCollection = this.afs.collection<ProductInterface>(this.collection);
      this.elementsCollection.get();
      this.elementsCollection.add(element).then((res) => {

        this.elementDoc = this.afs.doc<ProductInterface>(this.collection + `/${res.id}`);

        this.elementDoc.update({
          id: res.id
        }).then(() => {
          this.router.navigateByUrl(`/app/marketplace/m/(marketplace:product/${res.id})`);

        });
        // this go to the product details page


      });

    })

  }

  getOne(idElement: string) {

    this.elementDoc = this.afs.doc<ProductInterface>(this.collection + `/${idElement}`);

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

  update(product: ProductInterface) {
    this.elementDoc = this.afs.doc<ProductInterface>(this.collection + `/${product.id}`);
    return this.elementDoc.update(product)
  }

  delete(idElement: string) {
    this.elementDoc = this.afs.doc<ProductInterface>(this.collection + `/${idElement}`);
    return this.elementDoc.delete();
  }

  changeStatus(product, status: string) {
    product.status = status;
    this.elementDoc = this.afs.doc<ProductInterface>(this.collection + `/${product.id}`);
    return this.elementDoc.update(product);
  }

}

