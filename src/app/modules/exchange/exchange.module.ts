import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExchangeRoutingModule } from './exchange-routing.module';
import { ExchangeComponent } from 'src/app/modules/exchange/pages/main/exchange.component';
import { AllOfertsComponent } from 'src/app/modules/exchange/pages/all-oferts/all-oferts.component';
import { MyOfertsComponent } from 'src/app/modules/exchange/pages/my-oferts/my-oferts.component';
import { AcceptedOfertsComponent } from 'src/app/modules/exchange/pages/accepted-oferts/accepted-oferts.component';
import { MatSnackBarModule, MatDialogModule, MatOptionModule, MatInputModule, MatButtonModule, MatStepperModule, MatIconModule, MatTabsModule, MatDividerModule, MatSlideToggleModule, MatTableModule, MatToolbarModule, MatCheckboxModule, MatPaginatorModule, MatSortModule, MatProgressSpinnerModule, MatRadioButton, MatRadioModule } from '@angular/material';
import { ModalConfirmComponent } from 'src/app/shared/components/modal-confirm/modal-confirm.component';
import { SuccessfulTransactionComponent } from 'src/app/modules/exchange/components/successful-transaction/successful-transaction.component';
import { UnsuccessfulTransactionComponent } from 'src/app/modules/exchange/components/unsuccessful-transaction/unsuccessful-transaction.component';
import { RatingPanelComponent } from 'src/app/modules/exchange/components/rating-panel/rating-panel.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import { MatSelectModule } from "@angular/material/select";
import { NewBuyComponent } from 'src/app/modules/exchange/pages/new-ofert/new-buy/new-buy.component';
import { NewChangeComponent } from 'src/app/modules/exchange/pages/new-ofert/new-change/new-change.component';
import { AdvancedFilterComponent } from 'src/app/modules/exchange/components/advanced-filter/advanced-filter.component';
import { ExchangeDashboardComponent } from 'src/app/modules/exchange/pages/dashboard/exchange-dashboard.component';
import { MainModule } from '../main/main.module';
import { ViewTransactionComponent } from 'src/app/modules/exchange/pages/transaction/view-transaction.component';
import { OfertPreviewComponent } from 'src/app/modules/exchange/components/ofert-preview/ofert-preview.component';
import { NewSellComponent } from 'src/app/modules/exchange/pages/new-ofert/new-sell/new-sell.component';


@NgModule({
  declarations: [
    ExchangeComponent,
    RatingPanelComponent,
    MyOfertsComponent,
    AllOfertsComponent,
    AcceptedOfertsComponent,
    SuccessfulTransactionComponent,
    UnsuccessfulTransactionComponent,
    NewBuyComponent,
    NewChangeComponent,
    AdvancedFilterComponent,
    ExchangeDashboardComponent,
    ViewTransactionComponent,
    OfertPreviewComponent,
    NewSellComponent    
  
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
    SuccessfulTransactionComponent,UnsuccessfulTransactionComponent,RatingPanelComponent,OfertPreviewComponent,AdvancedFilterComponent]
  
})
export class ExchangeModule { }
