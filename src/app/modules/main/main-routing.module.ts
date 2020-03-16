import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from "../../components/main/main.component";

const routes: Routes = [
  {
    path: '',
    component: MainComponent
    , children: [
     

      { path: 'social', loadChildren: () => import(`../../modules/social/social.module`).then(m => m.SocialModule) },
      { path: 'exchange', loadChildren: () => import(`../../modules/exchange/exchange.module`).then(m => m.ExchangeModule) },
      { path: 'marketplace', loadChildren: () => import(`../../modules/marketplace/marketplace.module`).then(m => m.MarketplaceModule) },
      { path: 'myAccount', loadChildren: () => import(`../../modules/user-account/user-account.module`).then(m => m.UserAccountModule) }

      ,{
        path: '**',
        redirectTo: 'social',
        pathMatch: 'full'
      }
    ]
  }

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
