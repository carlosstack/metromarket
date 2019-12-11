import { NgModule } from '@angular/core';
import { ContentComponent } from './components/marketplace/content/content.component';
import { Routes, RouterModule } from '@angular/router';
import { UserAccountComponent } from './components/main/user-account/user-account.component';
import { ProductDetailsComponent } from './components/marketplace/product-details/product-details.component';
import { NewProductComponent } from './components/marketplace/new-product/new-product.component';
import { NewOfertComponent } from './components/exchange/new-ofert/new-ofert.component';
import { RegisterFormComponent } from './components/home/register-form/register-form.component';
import { AllOfertsComponent } from './components/exchange/all-oferts/all-oferts.component';
import { MyOfertsComponent } from './components/exchange/my-oferts/my-oferts.component';
import { AcceptedOfertsComponent } from './components/exchange/accepted-oferts/accepted-oferts.component';
import { ViewTransactionComponent } from "./components/exchange/view-transaction/view-transaction.component";
import { SuccessfulTransactionComponent } from './components/exchange/successful-transaction/successful-transaction.component';
import { UnsuccessfulTransactionComponent } from './components/exchange/unsuccessful-transaction/unsuccessful-transaction.component';
import { RatingPanelComponent } from './components/main/rating-panel/rating-panel.component';
import { NotificationsComponent } from './components/main/notifications/notifications.component';
import {AuthGuard} from './auth.guard';
import { from } from 'rxjs';

import { MainComponent } from "./components/main/main.component";
import { MarketplaceComponent } from './components/marketplace/marketplace.component';
import { ExchangeComponent } from './components/exchange/exchange.component';
import { ExchangeSidebarComponent } from './components/exchange/exchange-sidebar/exchange-sidebar.component';
import { SidebarComponent } from './components/main/sidebar/sidebar.component';
import { MarketplaceSidebarComponent } from './components/marketplace/marketplace-sidebar/marketplace-sidebar.component';
import { SocialComponent } from './components/social/social.component';
import { AnswerComponent } from './components/answer/answer.component';
import { SidebarAnswerComponent } from './components/answer/sidebar-answer/sidebar-answer.component';

const routes: Routes = [
  { path: 'general', component: MainComponent,canActivate:[AuthGuard]},
  { path: 'marketplace', component:MarketplaceComponent,canActivate:[AuthGuard]},
  { path: 'exchange', component:ExchangeComponent,canActivate:[AuthGuard]},
  { path: 'login', component: RegisterFormComponent },
  { path: 'social', component: SocialComponent },
  { path: 'QA', component: AnswerComponent },
  { path: 'products', component: ContentComponent },
  { path: 'exchange/all-oferts', component: AllOfertsComponent,canActivate: [AuthGuard] },
  { path: 'exchange/my-oferts', component: MyOfertsComponent ,canActivate: [AuthGuard]},
  { path: 'exchange/accepted-oferts', component: AcceptedOfertsComponent,canActivate:[AuthGuard] },
  { path: 'myaccount', component: UserAccountComponent,canActivate:[AuthGuard] },
  { path: 'exchange/new-ofert', component: NewOfertComponent ,canActivate:[AuthGuard]},
  { path: 'exchange/transaction/:type/:id', component: ViewTransactionComponent,canActivate:[AuthGuard]},
  { path: 'sidebar', component: SidebarComponent, outlet: 'sidebar'  ,canActivate:[AuthGuard]},
  { path: 'sidebar-exchange', component: ExchangeSidebarComponent  , outlet: 'sidebar' ,canActivate:[AuthGuard]},
  { path: 'sidebar-marketplace', component: MarketplaceSidebarComponent  , outlet: 'sidebar' ,canActivate:[AuthGuard]},
  { path: 'sidebar-answer', component: SidebarAnswerComponent  , outlet: 'sidebar' ,canActivate:[AuthGuard]},
  { path: '**', redirectTo: '/social(sidebar:sidebar)'},
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]

})
export class AppRoutingModule { }
