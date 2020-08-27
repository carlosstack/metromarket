import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductInterface } from 'src/app/shared/models/product';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-shop-home',
  templateUrl: './shop-home.component.html',
  styleUrls: ['./shop-home.component.css']
})
export class ShopHomeComponent implements OnInit {

  images=[];
  public query;

  constructor(private router:Router, private productService:ProductService) { }

  recentProducts:ProductInterface[];
  ngOnInit(): void {

    this.images[0]='../../../../../assets/shop-images/laptop.jpg';

    this.productService.getRecent(6).subscribe(products => {
      this.recentProducts = products;
    })
  
  }

  search(){
    if(this.query.trim()){
      this.router.navigateByUrl(`/app/shop/s/(shop:search/${this.query})`);
    }
    
  }
}


