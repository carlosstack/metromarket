import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductDetailsComponent } from 'src/app/components/marketplace/tools/product-details/product-details.component';


const routes: Routes = [
  { 
    path: '', component: ProductDetailsComponent 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsDetailsRoutingModule { }
