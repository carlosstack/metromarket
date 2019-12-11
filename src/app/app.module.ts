import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';


//Main
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/main/navbar/navbar.component';
import { PaginationComponent } from './components/main/pagination/pagination.component';
import { SidebarComponent } from './components/main/sidebar/sidebar.component';
import { OptionsComponent } from './components/main/options/options.component';
import { UserAccountComponent } from './components/main/user-account/user-account.component';
import { RegisterFormComponent } from './components/home/register-form/register-form.component';

//Marketplace
import { ContentComponent } from './components/marketplace/content/content.component';
import { ProductDetailsComponent } from './components/marketplace/product-details/product-details.component';
import { NewProductComponent } from './components/marketplace/new-product/new-product.component';

//Exchange
import { NewOfertComponent } from './components/exchange/new-ofert/new-ofert.component';
//Answer

//Social




import { BuysComponent } from './components/marketplace/buys/buys.component';
import { SellsComponent } from './components/marketplace/sells/sells.component';


import { environment } from "../environments/environment";
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database';
import { FormsModule } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { NavbarOfertsComponent } from './components/exchange/navbar-oferts/navbar-oferts.component';
import { AllOfertsComponent } from './components/exchange/all-oferts/all-oferts.component';
import { MyOfertsComponent } from './components/exchange/my-oferts/my-oferts.component';
import { AcceptedOfertsComponent } from './components/exchange/accepted-oferts/accepted-oferts.component';
import { ViewTransactionComponent } from './components/exchange/view-transaction/view-transaction.component';
import { RatingComponent } from './components/main/rating/rating.component';
import { NewOfertPreviewComponent } from './components/exchange/new-ofert-preview/new-ofert-preview.component';
import { SuccessfulTransactionComponent } from './components/exchange/successful-transaction/successful-transaction.component';
import { UnsuccessfulTransactionComponent } from './components/exchange/unsuccessful-transaction/unsuccessful-transaction.component';
import { LoadingComponent } from './components/main/loading/loading.component';
import { RatingPanelComponent } from './components/main/rating-panel/rating-panel.component';
import { NotificationsComponent } from './components/main/notifications/notifications.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { ModalConfirmComponent } from './components/main/modal-confirm/modal-confirm.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import {MatToolbarModule} from '@angular/material/toolbar';
import { AlertComponent } from './components/main/alert/alert.component';



import { MatSidenavModule } from "@angular/material";
import { MainComponent } from './components/main/main.component';
import { ExchangeComponent } from './components/exchange/exchange.component';
import { MarketplaceComponent } from './components/marketplace/marketplace.component';
import { AnswerComponent } from './components/answer/answer.component';
import { MarketplaceSidebarComponent } from './components/marketplace/marketplace-sidebar/marketplace-sidebar.component';
import { ExchangeSidebarComponent } from './components/exchange/exchange-sidebar/exchange-sidebar.component';
import { SidebarAnswerComponent } from './components/answer/sidebar-answer/sidebar-answer.component';
import { SocialComponent } from './components/social/social.component';


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
    AlertComponent,
    MainComponent,
    ExchangeComponent,
    MarketplaceComponent,
    AnswerComponent,
    MarketplaceSidebarComponent,
    ExchangeSidebarComponent,
    SidebarAnswerComponent,
    SocialComponent
    
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
    MatToolbarModule,
    MatSidenavModule


  ], entryComponents: [ModalConfirmComponent,
    SuccessfulTransactionComponent,UnsuccessfulTransactionComponent,RatingPanelComponent, AlertComponent],
  providers: [AngularFireAuth, AngularFirestore],
  bootstrap: [AppComponent],
})
export class AppModule { }
