import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExchangeComponent } from "./pages/main/exchange.component";
import { AllOfertsComponent } from 'src/app/modules/exchange/pages/all-oferts/all-oferts.component';
import { AcceptedOfertsComponent } from 'src/app/modules/exchange/pages/accepted-oferts/accepted-oferts.component';
import { ViewTransactionComponent } from 'src/app/modules/exchange/pages/transaction/view-transaction.component';
import { ExchangeDashboardComponent } from 'src/app/modules/exchange/pages/dashboard/exchange-dashboard.component';
import { NewBuyComponent } from 'src/app/modules/exchange/pages/new-ofert/new-buy/new-buy.component';
import { NewChangeComponent } from 'src/app/modules/exchange/pages/new-ofert/new-change/new-change.component';
import { NewSellComponent } from 'src/app/modules/exchange/pages/new-ofert/new-sell/new-sell.component';

const routes: Routes = [


  {
    path: 'e', component: ExchangeComponent, 
    children: [
      { path: '', component: AllOfertsComponent, outlet: 'exchange' },
      { path: 'dashboard', component: ExchangeDashboardComponent, outlet: 'exchange' },
      { path: 'accepted', component: AcceptedOfertsComponent, outlet: 'exchange' },
      { path: 'buy', component: NewBuyComponent, outlet: 'exchange' },
      { path: 'sell', component: NewSellComponent, outlet: 'exchange' },
      { path: 'change', component: NewChangeComponent, outlet: 'exchange' },
      { path: 'transaction/:uid/:id', component: ViewTransactionComponent, outlet: 'exchange' },
      { path: '**', redirectTo: '' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExchangeRoutingModule { }
