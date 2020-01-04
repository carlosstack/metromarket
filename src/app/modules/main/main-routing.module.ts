import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from "../../components/main/main.component";
import { RegisterFormComponent } from 'src/app/components/home/register-form/register-form.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent
    , children: [
     

      { path: 'social', loadChildren: () => import(`../../modules/social/social.module`).then(m => m.SocialModule) },
      { path: 'exchange', loadChildren: () => import(`../../modules/exchange/exchange.module`).then(m => m.ExchangeModule) },
      { path: 'marketplace', loadChildren: () => import(`../../modules/marketplace/marketplace.module`).then(m => m.MarketplaceModule) }
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
