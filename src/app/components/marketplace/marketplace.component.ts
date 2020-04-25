import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-marketplace',
  templateUrl: './marketplace.component.html',
  styleUrls: ['./marketplace.component.css']
})
export class MarketplaceComponent implements OnInit {

  constructor(private router:Router) { }

  public query;

  ngOnInit() {
  }

  search(){
    if(this.query.trim()){
      this.router.navigateByUrl(`/app/marketplace/m/(marketplace:search/${this.query})`);
    }
    
  }

}
