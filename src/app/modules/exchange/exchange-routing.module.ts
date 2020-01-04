import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExchangeComponent } from "../../components/exchange/exchange.component";
import { AllOfertsComponent } from 'src/app/components/exchange/all-oferts/all-oferts.component';
import { MyOfertsComponent } from 'src/app/components/exchange/my-oferts/my-oferts.component';
import { AcceptedOfertsComponent } from 'src/app/components/exchange/accepted-oferts/accepted-oferts.component';
import { NewOfertComponent } from 'src/app/components/exchange/new-ofert/new-ofert.component';
import { ViewTransactionComponent } from 'src/app/components/exchange/tools/view-transaction/view-transaction.component';

const routes: Routes = [
  {
    path: 'e',
    component: ExchangeComponent,
    children: [
      { path: 'my-oferts', component: MyOfertsComponent, outlet: 'exchange' },
      { path: 'all', component: AllOfertsComponent, outlet: 'exchange' },
      { path: 'accepted', component: AcceptedOfertsComponent, outlet: 'exchange' },
      { path: 'new', component: NewOfertComponent, outlet: 'exchange' },

    ],
  },
  {
    path: 'transaction/:type/:id', loadChildren: () => import(`../../modules/exchange-transaction/exchange-transaction.module`).then(m => m.ExchangeTransactionModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExchangeRoutingModule { }
