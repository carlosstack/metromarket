import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanLoad } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { take, map, tap } from 'rxjs/operators';
import { NormalOfertService } from 'src/app/services/normal-ofert.service';
import { UserService } from 'src/app/services/user.service';
import { Route } from '@angular/compiler/src/core';

@Injectable()
export class AccessWithoutVerificateGuard implements CanActivate {
  constructor(private userService:UserService,private router: Router, private afsAuth: AngularFireAuth) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.userService.getOneUser(this.afsAuth.auth.currentUser.uid).pipe(take(1))
    .pipe(map(user=> !!user))
    .pipe(tap(verified=>{
      if(verified){
       
        return true
      }else{
        this.router.navigate(['/app/verificate']);
        return false
      }
    }))
  }
  }
  