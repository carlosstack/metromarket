import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from "./pages/main/main.component";
import { VerificationFormComponent } from 'src/app/modules/main/pages/home/verification-form/verification-form.component';
import { AppsComponent } from 'src/app/modules/main/pages/apps/apps.component';

const routes: Routes = [
  {
    path: '', component: MainComponent
    , children: [
      { path: '', component: AppsComponent },
      { path: 'exchange', loadChildren: () => import(`../../modules/exchange/exchange.module`).then(m => m.ExchangeModule) },
      { path: 'shop', loadChildren: () => import(`../../modules/marketplace/marketplace.module`).then(m => m.MarketplaceModule) },
      { path: 'myAccount', loadChildren: () => import(`../../modules/user-account/user-account.module`).then(m => m.UserAccountModule) },
      { path: 'qa', loadChildren: () => import(`../../modules/qa/qa.module`).then(m => m.QaModule) },
      { path: 'verificate', component: VerificationFormComponent },
      { path: '**', redirectTo: '' }
    ]
  },
  { path: '**', redirectTo: '' }

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
