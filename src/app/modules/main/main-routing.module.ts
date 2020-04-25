import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from "../../components/main/main.component";
import { VerificationFormComponent } from 'src/app/components/home/verification-form/verification-form.component';

const routes: Routes = [
  {
    path: '', component: MainComponent
    , children: [
      { path: 'exchange', loadChildren: () => import(`../../modules/exchange/exchange.module`).then(m => m.ExchangeModule) },
      { path: 'marketplace', loadChildren: () => import(`../../modules/marketplace/marketplace.module`).then(m => m.MarketplaceModule) },
      { path: 'ebookShare', loadChildren: () => import(`../../modules/ebook-share/ebook-share.module`).then(m => m.EbookShareModule) },
      { path: 'answers', loadChildren: () => import(`../../modules/qa/qa.module`).then(m => m.QaModule) },
      { path: 'myAccount', loadChildren: () => import(`../../modules/user-account/user-account.module`).then(m => m.UserAccountModule) },
      { path: 'verificate', component: VerificationFormComponent },
      { path: '**', redirectTo: 'exchange' }
    ]
  },
  { path: '**', redirectTo: '' }

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
