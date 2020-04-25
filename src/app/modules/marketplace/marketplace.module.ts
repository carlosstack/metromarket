import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarketplaceRoutingModule } from './marketplace-routing.module';
import { MarketplaceComponent } from 'src/app/components/marketplace/marketplace.component';
import { ContentComponent } from 'src/app/components/marketplace/content/content.component';
import { LoadingMarketplaceComponent } from 'src/app/components/marketplace/tools/loading-marketplace/loading-marketplace.component';
import { MyProductsComponent } from 'src/app/components/marketplace/my-products/my-products.component';
import { NewProductComponent } from 'src/app/components/marketplace/new-product/new-product.component';
import { MainModule } from '../main/main.module';
import { MatDialogModule, MatCardModule, MatFormFieldModule, MatSnackBarModule, MatOptionModule, MatSelectModule, MatInputModule, MatButtonModule, MatStepperModule, MatIconModule, MatDividerModule, MatTabsModule, MatSlideToggleModule, MatTableModule, MatToolbarModule, MatCheckboxModule, MatPaginatorModule, MatSortModule, MatProgressSpinnerModule, MatListModule, MatRadioModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductDetailsComponent } from 'src/app/components/marketplace/tools/product-details/product-details.component';
import { CarouselImgProductsComponent } from 'src/app/components/marketplace/tools/carousel-img-products/carousel-img-products.component';
import { ProductContactInfoComponent } from 'src/app/components/marketplace/tools/product-contact-info/product-contact-info.component';
import { ModalConfirmComponent } from 'src/app/components/exchange/tools/modal-confirm/modal-confirm.component';
import { MarketplaceSearchComponent } from 'src/app/components/marketplace/marketplace-search/marketplace-search.component';
import { MarketplaceCategoryComponent } from 'src/app/components/marketplace/marketplace-category/marketplace-category.component';
import { EditProductComponent } from 'src/app/components/marketplace/edit-product/edit-product.component';


@NgModule({
  declarations: [
    MarketplaceComponent, 
    LoadingMarketplaceComponent,
    MyProductsComponent,
    NewProductComponent,
    ContentComponent,
    ProductDetailsComponent,
    CarouselImgProductsComponent,
    ProductContactInfoComponent,
    MarketplaceSearchComponent,
    MarketplaceCategoryComponent,
    EditProductComponent

  ],
  imports: [
    CommonModule,
    MarketplaceRoutingModule,
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
    MatProgressSpinnerModule,
    MatListModule,
    MatRadioModule
  ],
  entryComponents:[ProductContactInfoComponent,ModalConfirmComponent]
})
export class MarketplaceModule { }
