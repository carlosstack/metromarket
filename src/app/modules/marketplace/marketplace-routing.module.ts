import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MarketplaceComponent } from "../../components/marketplace/marketplace.component";
import { NewProductComponent } from 'src/app/components/marketplace/new-product/new-product.component';
import { ContentComponent } from 'src/app/components/marketplace/content/content.component';
import { MyProductsComponent } from 'src/app/components/marketplace/my-products/my-products.component';
import { ProductDetailsComponent } from 'src/app/components/marketplace/tools/product-details/product-details.component';
import { MarketplaceSearchComponent } from 'src/app/components/marketplace/marketplace-search/marketplace-search.component';
import { MarketplaceCategoryComponent } from 'src/app/components/marketplace/marketplace-category/marketplace-category.component';
import { EditProductComponent } from 'src/app/components/marketplace/edit-product/edit-product.component';

const routes: Routes = [
  {
    path: 'm',
    component: MarketplaceComponent,
    children:[
      {path:'new',component: NewProductComponent, outlet:'marketplace'},
      {path:'products',component: ContentComponent, outlet:'marketplace'},
      {path:'my-products',component: MyProductsComponent, outlet:'marketplace'},
      {path:'search/:q',component: MarketplaceSearchComponent, outlet:'marketplace'},
      {path:'category/:category',component: MarketplaceCategoryComponent, outlet:'marketplace'},
      {path:'edit/:id',component: EditProductComponent, outlet:'marketplace'},
      { path: 'product/:id', component:ProductDetailsComponent, outlet:'marketplace'}
    ]
  }, 
 
  { path:'**', redirectTo:'m'}

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarketplaceRoutingModule { }
