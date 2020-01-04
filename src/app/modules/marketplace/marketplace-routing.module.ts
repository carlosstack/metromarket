import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MarketplaceComponent } from "../../components/marketplace/marketplace.component";
import { NewProductComponent } from 'src/app/components/marketplace/new-product/new-product.component';
import { ContentComponent } from 'src/app/components/marketplace/content/content.component';
import { MyProductsComponent } from 'src/app/components/marketplace/my-products/my-products.component';

const routes: Routes = [
  {
    path: 'm',
    component: MarketplaceComponent,
    children:[
      {path:'new',component: NewProductComponent, outlet:'marketplace'},
      {path:'products',component: ContentComponent, outlet:'marketplace'},
      {path:'my-products',component: MyProductsComponent, outlet:'marketplace'},
    ]
  }, 
  { path: 'products/:id', loadChildren: () => import(`../../modules/products-details/products-details.module`).then(m => m.ProductsDetailsModule)}

  
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarketplaceRoutingModule { }
