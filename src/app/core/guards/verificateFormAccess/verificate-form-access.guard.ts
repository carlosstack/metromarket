import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanLoad } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { take, map, tap } from 'rxjs/operators';
import { UserService } from 'src/app/shared/services/user.service';
import { Route } from '@angular/compiler/src/core';

  @Injectable()
  export class VerificateFormAccessGuard implements CanActivate {
    constructor(private userService: UserService, private router: Router, private afsAuth: AngularFireAuth) {
    }
    canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
      return this.userService.getOneUser(this.afsAuth.auth.currentUser.uid).pipe(take(1))
      .pipe(map(user=> !!user))
      .pipe(tap(verified=>{
        if(verified){
          this.router.navigate(['/app/myAccount']);
          return false
        }else{
          return true
        }
      }))
    }
  }
  
 
    
