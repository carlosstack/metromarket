import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewTransactionComponent } from 'src/app/components/exchange/tools/view-transaction/view-transaction.component';

const routes: Routes = [

  {
    path: '', component: ViewTransactionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExchangeTransactionRoutingModule { }
