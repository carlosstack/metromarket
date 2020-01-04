import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExchangeTransactionRoutingModule } from './exchange-transaction-routing.module';
import { ViewTransactionComponent } from 'src/app/components/exchange/tools/view-transaction/view-transaction.component';
import { RatingComponent } from 'src/app/components/exchange/tools/view-transaction/rating/rating.component';
import { SuccessfulTransactionComponent } from 'src/app/components/exchange/tools/view-transaction/successful-transaction/successful-transaction.component';
import { UnsuccessfulTransactionComponent } from 'src/app/components/exchange/tools/view-transaction/unsuccessful-transaction/unsuccessful-transaction.component';
import { RatingPanelComponent } from 'src/app/components/exchange/tools/view-transaction/rating-panel/rating-panel.component';


@NgModule({
  declarations: [
    ViewTransactionComponent,
    RatingComponent
  ],
  imports: [
    CommonModule,
    ExchangeTransactionRoutingModule

  ],entryComponents:[]
})
export class ExchangeTransactionModule { }
