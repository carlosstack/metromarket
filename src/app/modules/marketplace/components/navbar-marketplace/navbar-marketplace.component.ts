import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-marketplace',
  templateUrl: './navbar-marketplace.component.html',
  styleUrls: ['./navbar-marketplace.component.css']
})
export class NavbarMarketplaceComponent implements OnInit {

  constructor(private router:Router) { }
  public query;

  ngOnInit(): void {
  }

  search(){
    if(this.query.trim()){
      this.router.navigateByUrl(`/app/shop/s/(shop:search/${this.query})`);
    }
    
  }
}
