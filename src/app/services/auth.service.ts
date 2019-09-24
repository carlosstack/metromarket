import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afsAuth: AngularFireAuth) { }


  registerUser(email: string, pass: string) { 

    return new Promise((resolve,reject)=>{
      this.afsAuth.auth.setPersistence(firebase.auth.Auth.Persistence.SESSION);
      this.afsAuth.auth.createUserWithEmailAndPassword(email,pass)
      .then( userData => resolve(userData), 
      err => reject(err));
    })


  }
  loginUser(email: string, pass: string) {

    return new Promise((resolve, reject) => {
      this.afsAuth.auth.setPersistence(firebase.auth.Auth.Persistence.SESSION);
      this.afsAuth.auth.signInWithEmailAndPassword(email, pass)
        .then(userData => resolve(userData), 
        err => reject(err));
    });
  }

  logoutUser() {
    return this.afsAuth.auth.signOut();
   }

  isAuth(){
    return this.afsAuth.authState.pipe(map(auth=>auth));
  }
  

}
