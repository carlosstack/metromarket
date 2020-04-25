import { Component, OnInit, Input, HostListener } from '@angular/core';
import { ProductService } from "../../../services/product.service";
import { AuthService } from "../../../services/auth.service";
import { ProductInterface } from 'src/app/models/product';
@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {


  public products;
  public loadingData = false;

  constructor(private auth: AuthService, private service: ProductService) { }

  ngOnInit() {


    this.service.getAll(null, null).subscribe(products => {

      this.products = products;
    })



  }
  @HostListener("window:scroll", [])
  onScroll(): void {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      // you're at the bottom of the page
      console.log('in the bottom')
      if (this.products) {
        this.service.getAll(null, this.products[this.products.length - 1]).subscribe((products) => {
          if (products.length > 0) {
            this.products = this.products.concat(products)
          }

        })
      }


    }
  }

  limit(text: string) {
    return text.substring(0, 70) + '...';
  }
  nextPage(last) {
    this.service.getAll(null, last).subscribe(products => {

      this.products = products;
    })

  }
  prevPage(first) {
    this.service.getAll(first, null).subscribe(products => {

      this.products = products;
    })
  }


}
