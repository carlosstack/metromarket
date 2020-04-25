import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ProductInterface } from 'src/app/models/product';
import { Route } from '@angular/compiler/src/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  public product:ProductInterface;
  constructor(private productService:ProductService,private route:ActivatedRoute) { }

  ngOnInit() {
    var id = this.route.snapshot.params['id']
    this.productService.getOne(id).subscribe((product)=>{
      this.product = product
    })
  }

}
