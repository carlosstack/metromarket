import { Component, OnInit } from '@angular/core';
import { ProductService } from "../../../services/product.service";
import { AuthService } from "../../../services/auth.service";

@Component({
  selector: 'app-my-products',
  templateUrl: './my-products.component.html',
  styleUrls: ['./my-products.component.css']
})
export class MyProductsComponent implements OnInit {

  public products;

  constructor(private auth: AuthService, private service:ProductService) { }

  ngOnInit() {

    this.auth.isAuth().subscribe(user => {

      this.service.getAll().subscribe(products => {

        this.products = products.filter(product => product.owner_id == `${user.uid}`);

      })

    })

  }

  limit(text:string){
  return text.substring(0,70) + '...';
  }

}
