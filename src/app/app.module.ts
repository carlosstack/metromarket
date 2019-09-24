import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PaginationComponent } from './pagination/pagination.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ContentComponent } from './content/content.component';
import { AppRoutingModule } from './app-routing.module';
import { UserAccountComponent } from './user-account/user-account.component';
import { OptionsComponent } from './options/options.component';
import { BuysComponent } from './buys/buys.component';
import { SellsComponent } from './sells/sells.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { NewProductComponent } from './new-product/new-product.component';
import { NewOfertComponent } from './new-ofert/new-ofert.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { environment } from "../environments/environment";
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database';
import { FormsModule } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { NavbarOfertsComponent } from './navbar-oferts/navbar-oferts.component';
import { AllOfertsComponent } from '../app/exchange/all-oferts/all-oferts.component';
import { MyOfertsComponent } from '../app/exchange/my-oferts/my-oferts.component';
import { AcceptedOfertsComponent } from '../app/exchange/accepted-oferts/accepted-oferts.component';
import { ViewTransactionComponent } from './view-transaction/view-transaction.component';
import { RatingComponent } from './rating/rating.component';
import { NewOfertPreviewComponent } from './new-ofert-preview/new-ofert-preview.component';
import { SuccessfulTransactionComponent } from './successful-transaction/successful-transaction.component';
import { UnsuccessfulTransactionComponent } from './unsuccessful-transaction/unsuccessful-transaction.component';
import { LoadingComponent } from './loading/loading.component';
import { RatingPanelComponent } from './rating-panel/rating-panel.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { ModalConfirmComponent } from './modal-confirm/modal-confirm.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import {MatToolbarModule} from '@angular/material/toolbar';
import { AlertComponent } from './alert/alert.component';





@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PaginationComponent,
    SidebarComponent,
    ContentComponent,
    UserAccountComponent,
    OptionsComponent,
    BuysComponent,
    SellsComponent,
    ProductDetailsComponent,
    NewProductComponent,
    NewOfertComponent,
    RegisterFormComponent,
    NavbarOfertsComponent,
    AllOfertsComponent,
    MyOfertsComponent,
    AcceptedOfertsComponent,
    ViewTransactionComponent,
    RatingComponent,
    NewOfertPreviewComponent,
    SuccessfulTransactionComponent,
    UnsuccessfulTransactionComponent,
    LoadingComponent,
    RatingPanelComponent,
    NotificationsComponent,
    ModalConfirmComponent,
    AlertComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    FormsModule,
    AngularFireStorageModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    MatDialogModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    MatToolbarModule


  ], entryComponents: [ModalConfirmComponent,
    SuccessfulTransactionComponent,UnsuccessfulTransactionComponent,RatingPanelComponent, AlertComponent],
  providers: [AngularFireAuth, AngularFirestore],
  bootstrap: [AppComponent],
})
export class AppModule { }
