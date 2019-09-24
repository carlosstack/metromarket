import { NgModule } from '@angular/core';
import { ContentComponent } from './content/content.component';
import { Routes, RouterModule } from '@angular/router';
import { UserAccountComponent } from './user-account/user-account.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { NewProductComponent } from './new-product/new-product.component';
import { NewOfertComponent } from './new-ofert/new-ofert.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { AllOfertsComponent } from './exchange/all-oferts/all-oferts.component';
import { MyOfertsComponent } from './exchange/my-oferts/my-oferts.component';
import { AcceptedOfertsComponent } from './exchange/accepted-oferts/accepted-oferts.component';
import { ViewTransactionComponent } from "./view-transaction/view-transaction.component";
import { SuccessfulTransactionComponent } from './successful-transaction/successful-transaction.component';
import { UnsuccessfulTransactionComponent } from './unsuccessful-transaction/unsuccessful-transaction.component';
import { RatingPanelComponent } from './rating-panel/rating-panel.component';
import { NotificationsComponent } from './notifications/notifications.component';
import {AuthGuard} from './auth.guard';
import { from } from 'rxjs';

const routes: Routes = [
  { path: 'login', component: RegisterFormComponent },
  { path: 'exchange/all-oferts', component: AllOfertsComponent,canActivate: [AuthGuard] },
  { path: 'exchange/my-oferts', component: MyOfertsComponent ,canActivate: [AuthGuard]},
  { path: 'exchange/accepted-oferts', component: AcceptedOfertsComponent,canActivate:[AuthGuard] },
  { path: 'myaccount', component: UserAccountComponent,canActivate:[AuthGuard] },
  { path: 'exchange/new-ofert', component: NewOfertComponent ,canActivate:[AuthGuard]},
  { path: 'exchange/transaction/:type/:id', component: ViewTransactionComponent,canActivate:[AuthGuard]},
  { path: '**', redirectTo: 'exchange/all-oferts'},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]

})
export class AppRoutingModule { }
