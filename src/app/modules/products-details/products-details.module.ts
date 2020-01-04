import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsDetailsRoutingModule } from './products-details-routing.module';
import { ProductDetailsComponent } from 'src/app/components/marketplace/tools/product-details/product-details.component';
import { CarouselImgProductsComponent } from 'src/app/components/marketplace/tools/carousel-img-products/carousel-img-products.component';


@NgModule({
  declarations: [ ProductDetailsComponent,
    CarouselImgProductsComponent
  ],
  imports: [
    CommonModule,
    ProductsDetailsRoutingModule

  ]
})
export class ProductsDetailsModule { }
