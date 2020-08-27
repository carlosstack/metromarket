import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from "../environments/environment";
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule, MatStepperModule, MatSlideToggleModule, MatSelectModule, MatButtonModule, MatInputModule, MatTabsModule, MatProgressSpinnerModule, MatIconModule, MatCheckboxModule, MatOptionModule, MatSnackBarModule } from "@angular/material";
import { HomeComponent } from './modules/main/pages/home/home.component';
import { RegisterFormComponent } from './modules/main/pages/home/register-form/register-form.component';
import { LoginFormComponent } from './modules/main/pages/home/login-form/login-form.component';
import { AccessWithoutVerificateGuard } from './core/guards/appAccessWithoutVerificate/access-without-verificate.guard';
import { AuthGuard } from './core/guards/auth/auth.guard';
import { VerificateFormAccessGuard } from './core/guards/verificateFormAccess/verificate-form-access.guard';
import { LoginGuard } from './core/guards/login/login.guard';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterFormComponent,
    LoginFormComponent,],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireStorageModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    MatToolbarModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    MatStepperModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatButtonModule,
    MatInputModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatCheckboxModule,
    MatSelectModule,
    MatOptionModule,
    MatSnackBarModule,
    NgbModule

  ],
  exports: [],
  entryComponents: [],
  providers: [AngularFireAuth, AngularFirestore, AccessWithoutVerificateGuard, AuthGuard, VerificateFormAccessGuard, LoginGuard],

  bootstrap: [AppComponent],

})
export class AppModule { }
