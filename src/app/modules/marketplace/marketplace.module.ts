import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarketplaceRoutingModule } from './marketplace-routing.module';
import { MarketplaceComponent } from 'src/app/components/marketplace/marketplace.component';
import { ContentComponent } from 'src/app/components/marketplace/content/content.component';
import { LoadingMarketplaceComponent } from 'src/app/components/marketplace/tools/loading-marketplace/loading-marketplace.component';
import { MyProductsComponent } from 'src/app/components/marketplace/my-products/my-products.component';
import { NewProductComponent } from 'src/app/components/marketplace/new-product/new-product.component';


@NgModule({
  declarations: [
    MarketplaceComponent, 
    LoadingMarketplaceComponent,
    MyProductsComponent,
    NewProductComponent,
    ContentComponent


  ],
  imports: [
    CommonModule,
    MarketplaceRoutingModule
  ]
})
export class MarketplaceModule { }
