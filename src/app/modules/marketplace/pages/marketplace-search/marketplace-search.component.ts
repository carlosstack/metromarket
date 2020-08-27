import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/shared/services/product.service';
import { ProductInterface } from 'src/app/shared/models/product';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-marketplace-search',
  templateUrl: '../content/content.component.html',
  styleUrls: ['../content/content.component.css']
})
export class MarketplaceSearchComponent implements OnInit {

  constructor(private porductService: ProductService, private route: ActivatedRoute, private router: Router) { }

  public products: ProductInterface[];
  queryArray:string[];
  query:string;
  public pageTitle='';

  ngOnInit() {

    this.route.queryParams.subscribe(queryParams => {
      // do something with the query params
    });
  
    
    this.route.params.subscribe(routeParams => {

      this.products =[]
      this.query = routeParams.q
      this.query = this.query.trim()
      this.pageTitle = "Resultados de: " + this.query;
      this.queryArray = this.query.split(' ');
      
      this.queryArray.forEach(word => {
        this.porductService.searchProducts(word,null,null).subscribe((products) => {

          if (this.products) {
            this.products = this.products.concat(products)
            this.filterDuplicates()
            this.products = this.products.sort((a, b) => b.date - a.date);
          } else {
            this.products = products;
          }

        })
      });
    });
  }

  @HostListener("window:scroll", [])
  onScroll(): void {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      // you're at the bottom of the page
      console.log('in the bottom')
      if (this.products) {
        this.queryArray.forEach(word => {
          this.porductService.searchProducts(word,null,this.products[this.products.length-1]).subscribe((products) => {
    
            if (this.products) {
              this.products = this.products.concat(products)
              this.filterDuplicates()
              this.products = this.products.sort((a, b) => b.date - a.date);
            } else {
              this.products = products;
            }
    
          })
        });
      }


    }
  }

  nextPage(last){

    this.products =[]
    this.queryArray.forEach(word => {
      this.porductService.searchProducts(word,null,last).subscribe((products) => {

        if (this.products) {
          this.products = this.products.concat(products)
          this.filterDuplicates()
          this.products = this.products.sort((a, b) => b.date - a.date);
        } else {
          this.products = products;
        }

      })
    });
    
  }
  prevPage(first){
    this.products =[]
    this.queryArray.forEach(word => {
      this.porductService.searchProducts(word,first,null).subscribe((products) => {

        if (this.products) {
          this.products = this.products.concat(products)
          this.filterDuplicates()
          this.products = this.products.sort((a, b) => b.date - a.date);
        } else {
          this.products = products;
        }

      })
    });
  }

  filterDuplicates() {
    //errors here duplicate products are show 
    var products = [];
    for (let index = 0; index < this.products.length; index++) {
      if (index == 0) {
        products.push(this.products[index])
      } else {
        var duplicate = false;
        products.forEach(product => {
          if (this.products[index].id == product.id) {
            duplicate = true;
          }
        });
        if (!duplicate) {
          products.push(this.products[index])
        }

      }
    }
    this.products = products;
  }



}
