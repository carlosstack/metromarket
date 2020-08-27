import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MarketplaceComponent } from "./pages/main/marketplace.component";
import { NewProductComponent } from 'src/app/modules/marketplace/pages/new-product/new-product.component';
import { MyProductsComponent } from 'src/app/modules/marketplace/pages/my-products/my-products.component';
import { ProductDetailsComponent } from 'src/app/modules/marketplace/pages/product-details/product-details.component';
import { MarketplaceSearchComponent } from 'src/app/modules/marketplace/pages/marketplace-search/marketplace-search.component';
import { MarketplaceCategoryComponent } from 'src/app/modules/marketplace/pages/marketplace-category/marketplace-category.component';
import { EditProductComponent } from 'src/app/modules/marketplace/pages/edit-product/edit-product.component';
import { ShopHomeComponent } from 'src/app/modules/marketplace/pages/shop-home/shop-home.component';

const routes: Routes = [
  {
    path: 's', component: MarketplaceComponent,
    children: [
      { path: '', component: ShopHomeComponent, outlet: 'shop' },
      { path: 'new', component: NewProductComponent, outlet: 'shop' },
      { path: 'my-products', component: MyProductsComponent, outlet: 'shop' },
      { path: 'search/:q', component: MarketplaceSearchComponent, outlet: 'shop' },
      { path: 'category/:category', component: MarketplaceCategoryComponent, outlet: 'shop' },
      { path: 'edit/:id', component: EditProductComponent, outlet: 'shop' },
      { path: 'product/:id', component: ProductDetailsComponent, outlet: 'shop' },
    ]
  },
  { path: '**', redirectTo: 'm' }

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarketplaceRoutingModule { }
