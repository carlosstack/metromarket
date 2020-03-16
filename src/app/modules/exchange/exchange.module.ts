import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExchangeRoutingModule } from './exchange-routing.module';
import { ExchangeComponent } from 'src/app/components/exchange/exchange.component';
import { ToolbarExchangeComponent } from 'src/app/components/exchange/tools/toolbar-exchange/toolbar-exchange.component';
import { AllOfertsComponent } from 'src/app/components/exchange/all-oferts/all-oferts.component';
import { MyOfertsComponent } from 'src/app/components/exchange/my-oferts/my-oferts.component';
import { AcceptedOfertsComponent } from 'src/app/components/exchange/accepted-oferts/accepted-oferts.component';
import { NewOfertComponent } from 'src/app/components/exchange/new-ofert/new-ofert.component';
import { LoadingExchangeComponent } from 'src/app/components/exchange/tools/loading-exchange/loading-exchange.component';
import { MatSnackBarModule, MatDialogModule, MatOptionModule, MatInputModule, MatButtonModule, MatStepperModule, MatIconModule, MatTabsModule, MatDividerModule, MatSlideToggleModule, MatTableModule, MatSidenavModule, MatToolbarModule, MatCheckboxModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { ModalConfirmComponent } from 'src/app/components/exchange/tools/modal-confirm/modal-confirm.component';
import { SuccessfulTransactionComponent } from 'src/app/components/exchange/tools/view-transaction/successful-transaction/successful-transaction.component';
import { UnsuccessfulTransactionComponent } from 'src/app/components/exchange/tools/view-transaction/unsuccessful-transaction/unsuccessful-transaction.component';
import { RatingComponent } from 'src/app/components/exchange/tools/view-transaction/rating/rating.component';
import { RatingPanelComponent } from 'src/app/components/exchange/tools/view-transaction/rating-panel/rating-panel.component';
import { LoadingComponent } from 'src/app/components/main/loading/loading.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import { MatSelectModule } from "@angular/material/select";
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper/typings/stepper';
import { NewSellComponent } from 'src/app/components/exchange/new-ofert/new-sell/new-sell.component';
import { NewBuyComponent } from 'src/app/components/exchange/new-ofert/new-buy/new-buy.component';
import { NewChangeComponent } from 'src/app/components/exchange/new-ofert/new-change/new-change.component';
import { ExchangeTransactionModule } from '../exchange-transaction/exchange-transaction.module';
import { AdvancedFilterComponent } from 'src/app/components/exchange/tools/advanced-filter/advanced-filter.component';
import { ExchangeDashboardComponent } from 'src/app/components/exchange/exchange-dashboard/exchange-dashboard.component';


@NgModule({
  declarations: [
    ExchangeComponent,
    ToolbarExchangeComponent,
    MyOfertsComponent,
    AllOfertsComponent,
    AcceptedOfertsComponent,
    NewOfertComponent,
    LoadingExchangeComponent,
    ModalConfirmComponent,
    SuccessfulTransactionComponent,
    UnsuccessfulTransactionComponent,
    RatingPanelComponent,
    LoadingComponent,
    NewSellComponent,
    NewBuyComponent,
    NewChangeComponent,
    AdvancedFilterComponent,
    ExchangeDashboardComponent
    
  
 ],
  imports: [
    CommonModule,
    ExchangeRoutingModule,
    ExchangeTransactionModule,
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
    MatSortModule


    
  ],
  entryComponents: [ ModalConfirmComponent,
    SuccessfulTransactionComponent,UnsuccessfulTransactionComponent,RatingPanelComponent]
  
})
export class ExchangeModule { }
