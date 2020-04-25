import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase';
import { UserInterface } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private afsAuth: AngularFireAuth) { }

  getCurrentUID(){
    return this.afsAuth.auth.currentUser.uid
  }
  getCurrentEmail(){
    return this.afsAuth.auth.currentUser.email
  }
  registerUser(email: string, pass: string) { 

    return new Promise((resolve,reject)=>{
      this.afsAuth.auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
      this.afsAuth.auth.createUserWithEmailAndPassword(email,pass)
      .then( userData => resolve(userData), 
      err => reject(err));
    })


  }
  loginUser(email: string, pass: string) {

    return new Promise((resolve, reject) => {
      this.afsAuth.auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
      this.afsAuth.auth.signInWithEmailAndPassword(email, pass)
        .then(userData => resolve(userData), 
        err => reject(err));
    });
  }

  logoutUser() {
    return this.afsAuth.auth.signOut().then((res)=>{
      return res
    }).catch((e)=>{
      return null
    })
   }

  isAuth(){
    return this.afsAuth.authState.pipe(map(auth=>auth));
  }
  isVerificate(){
    if(this.afsAuth.auth.currentUser){
      return this.afsAuth.auth.currentUser.emailVerified
    }
    return null
  }
  
  sendEmailVerification(){
    this.afsAuth.auth.currentUser.sendEmailVerification().then((res)=>{
      return res
    }).catch((e)=>{
      return null
    })
  }

  sendPasswordResetEmail(){
    this.afsAuth.auth.sendPasswordResetEmail(this.afsAuth.auth.currentUser.email).then((res)=>{
      return res
    }).catch((e)=>{
      return null
    })
  }

  updateUser(user:UserInterface){
    this.afsAuth.auth.currentUser.updateProfile({
      displayName:user.firstName+' '+user.lastName,
      photoURL:user.photoUrl,
    }).then((res)=>{
      return res
    }).catch((e)=>{
      return null
    })
  }

  

}
