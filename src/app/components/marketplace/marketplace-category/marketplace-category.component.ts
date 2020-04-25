import { Component, OnInit, HostListener } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductInterface } from 'src/app/models/product';

@Component({
  selector: 'app-marketplace-category',
  templateUrl: '../content/content.component.html',
  styleUrls: ['../content/content.component.css']
})
export class MarketplaceCategoryComponent implements OnInit {

  constructor(private porductService: ProductService, private route: ActivatedRoute) { }

  public products: ProductInterface[];
  category: string;

  ngOnInit() {
    this.route.queryParams.subscribe(queryParams => {
      // do something with the query params
    });
  
    this.route.params.subscribe(routeParams => {
      this.category = routeParams.category
      this.porductService.searchCategory(this.category,null,null).subscribe((products) => {
        this.products = products;
      });
    });
  }

  @HostListener("window:scroll", [])
  onScroll(): void {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      // you're at the bottom of the page
      console.log('in the bottom')
      if (this.products) {
        this.porductService.searchCategory(this.category,null, this.products[this.products.length - 1]).subscribe((products) => {
          if (products.length > 0) {
            this.products = this.products.concat(products)
          }

        })
      }


    }
  }

  nextPage(last){
    this.porductService.searchCategory(this.category,null,last).subscribe(products => {

      this.products = products;
    })

  }
  prevPage(first){
    this.porductService.searchCategory(this.category,first,null).subscribe(products => {

      this.products = products;
    })
  }

}
