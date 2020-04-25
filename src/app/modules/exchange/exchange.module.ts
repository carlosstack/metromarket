import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExchangeRoutingModule } from './exchange-routing.module';
import { ExchangeComponent } from 'src/app/components/exchange/exchange.component';
import { AllOfertsComponent } from 'src/app/components/exchange/all-oferts/all-oferts.component';
import { MyOfertsComponent } from 'src/app/components/exchange/my-oferts/my-oferts.component';
import { AcceptedOfertsComponent } from 'src/app/components/exchange/accepted-oferts/accepted-oferts.component';
import { NewOfertComponent } from 'src/app/components/exchange/new-ofert/new-ofert.component';
import { LoadingExchangeComponent } from 'src/app/components/exchange/tools/loading-exchange/loading-exchange.component';
import { MatSnackBarModule, MatDialogModule, MatOptionModule, MatInputModule, MatButtonModule, MatStepperModule, MatIconModule, MatTabsModule, MatDividerModule, MatSlideToggleModule, MatTableModule, MatToolbarModule, MatCheckboxModule, MatPaginatorModule, MatSortModule, MatProgressSpinnerModule, MatRadioButton, MatRadioModule } from '@angular/material';
import { ModalConfirmComponent } from 'src/app/components/exchange/tools/modal-confirm/modal-confirm.component';
import { SuccessfulTransactionComponent } from 'src/app/components/exchange/tools/view-transaction/successful-transaction/successful-transaction.component';
import { UnsuccessfulTransactionComponent } from 'src/app/components/exchange/tools/view-transaction/unsuccessful-transaction/unsuccessful-transaction.component';
import { RatingPanelComponent } from 'src/app/components/exchange/tools/view-transaction/rating-panel/rating-panel.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import { MatSelectModule } from "@angular/material/select";
import { NewBuyComponent } from 'src/app/components/exchange/new-ofert/new-buy/new-buy.component';
import { NewChangeComponent } from 'src/app/components/exchange/new-ofert/new-change/new-change.component';
import { AdvancedFilterComponent } from 'src/app/components/exchange/tools/advanced-filter/advanced-filter.component';
import { ExchangeDashboardComponent } from 'src/app/components/exchange/exchange-dashboard/exchange-dashboard.component';
import { AppModule } from 'src/app/app.module';
import { MainModule } from '../main/main.module';
import { ViewTransactionComponent } from 'src/app/components/exchange/tools/view-transaction/view-transaction.component';
import { OfertPreviewComponent } from 'src/app/components/exchange/tools/ofert-preview/ofert-preview.component';


@NgModule({
  declarations: [
    ExchangeComponent,
    RatingPanelComponent,
    MyOfertsComponent,
    AllOfertsComponent,
    AcceptedOfertsComponent,
    NewOfertComponent,
    LoadingExchangeComponent,
    SuccessfulTransactionComponent,
    UnsuccessfulTransactionComponent,
    NewBuyComponent,
    NewChangeComponent,
    AdvancedFilterComponent,
    ExchangeDashboardComponent,
    ViewTransactionComponent,
    OfertPreviewComponent
    
  
 ],
  imports: [
    CommonModule,
    ExchangeRoutingModule,
    MainModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatOptionModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatStepperModule,
    MatIconModule,
    MatDividerModule,
    MatTabsModule,
    MatSlideToggleModule,
    MatTableModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule
    
  ],
  entryComponents: [ ModalConfirmComponent,
    SuccessfulTransactionComponent,UnsuccessfulTransactionComponent,RatingPanelComponent,OfertPreviewComponent]
  
})
export class ExchangeModule { }
