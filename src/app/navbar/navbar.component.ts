import { Component, OnInit } from '@angular/core';
import { RouterLinkActive } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public isLogged:boolean=false;
  

  public title ="MetroMarket"
  

  toggleMenu = false;

  onToggleMenu() {
    if(this.toggleMenu === true){
       this.toggleMenu = false;
    }else{
      this.toggleMenu = true;
    }
  }
 
  constructor(private AuthService: AuthService, public afAuth: AngularFireAuth, private router: Router) { }

  ngOnInit() {
    this.getCurrentUser();
  
  }


  onLogout() {
    this.AuthService.logoutUser()
      .then((res) => {

        
    
        this.router.navigate(['login']);
        
      }).catch(err => console.log('err', err.mesage));

  }

  getCurrentUser(){

    this.AuthService.isAuth().subscribe(auth=> {
    if(auth){
      
        this.isLogged=true;
      }else{
  
        this.isLogged=false;
      }
    });
  }

}
