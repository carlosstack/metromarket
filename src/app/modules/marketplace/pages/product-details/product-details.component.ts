import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/shared/services/product.service';
import { ProductInterface } from 'src/app/shared/models/product';
import { ProductContactInfoComponent } from '../../components/product-contact-info/product-contact-info.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  public product:ProductInterface;

  constructor(private route: ActivatedRoute, private productService: ProductService,private dialog:MatDialog) { }

  ngOnInit() {
    var productID = this.route.snapshot.params['id'];
    this.productService.getOne(productID).subscribe((product)=>{
      this.product = product;
    });
  }

  openDialogContact(): void {
    const dialogRef = this.dialog.open(ProductContactInfoComponent, {
      width: '400px',
      data: {userUID:this.product.owner_id}
    });
  }

}
