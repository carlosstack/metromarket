import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanLoad, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from "@angular/fire/auth";
import { map, take, tap } from "rxjs/operators";
import { UserService } from 'src/app/services/user.service';

@Injectable()
export class AuthGuard implements CanLoad {
  constructor(private userService:UserService,private router: Router, private afsAuth: AngularFireAuth) {
  }
  canLoad(
    route: Route
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.afsAuth.authState
      .pipe(take(1))
      .pipe(map(authState => !!authState))
      .pipe(tap(auth => {
        if (auth) {
          return true
        } else {
          this.router.navigate(['/login']);
          return false
        }
      }))
  
  }
}

