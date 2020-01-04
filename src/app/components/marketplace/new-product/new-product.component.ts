import { Component, OnInit } from '@angular/core';
import { ProductService } from "../../../services/product.service";
import { ProductInterface } from "../../../models/product";

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {

  constructor(private service: ProductService) { }

  product: ProductInterface ={
    name:'',
    description:'',
    price: null,
    category: 'Sin categoria',
    date:null,
    id: null,
    owner_id:null,
    owner_name:null,
    owner_phone_number:null
  
  };

  ngOnInit() {
  }

  add(){
    this.service.add(this.product);
  }






  
}