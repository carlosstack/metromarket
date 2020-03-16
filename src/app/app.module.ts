import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';


//Main
import { AppComponent } from './app.component';




import { environment } from "../environments/environment";
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { FormsModule } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import {MatToolbarModule} from '@angular/material/toolbar';

import { MatSidenavModule } from "@angular/material";
import { HomeComponent } from './components/home/home.component';
import { NavbarHomeComponent } from './components/home/navbar-home/navbar-home.component';
import { RegisterFormComponent } from './components/home/register-form/register-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarHomeComponent,
    RegisterFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    FormsModule,
    AngularFireStorageModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    MatToolbarModule,
    MatSidenavModule,
    BrowserAnimationsModule    



  ], 
  exports:[],
  entryComponents: [],
  providers: [AngularFireAuth, AngularFirestore],

  bootstrap: [AppComponent],
  
})
export class AppModule { }
