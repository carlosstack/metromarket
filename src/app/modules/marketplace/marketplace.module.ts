import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarketplaceRoutingModule } from './marketplace-routing.module';
import { MarketplaceComponent } from 'src/app/modules/marketplace/pages/main/marketplace.component';
import { ContentComponent } from 'src/app/modules/marketplace/pages/content/content.component';
import { LoadingMarketplaceComponent } from 'src/app/modules/marketplace/components/loading-marketplace/loading-marketplace.component';
import { MyProductsComponent } from 'src/app/modules/marketplace/pages/my-products/my-products.component';
import { NewProductComponent } from 'src/app/modules/marketplace/pages/new-product/new-product.component';
import { MainModule } from '../main/main.module';
import { MatDialogModule, MatCardModule, MatFormFieldModule, MatSnackBarModule, MatOptionModule, MatSelectModule, MatInputModule, MatButtonModule, MatStepperModule, MatIconModule, MatDividerModule, MatTabsModule, MatSlideToggleModule, MatTableModule, MatToolbarModule, MatCheckboxModule, MatPaginatorModule, MatSortModule, MatProgressSpinnerModule, MatListModule, MatRadioModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductDetailsComponent } from 'src/app/modules/marketplace/pages/product-details/product-details.component';
import { CarouselImgProductsComponent } from 'src/app/modules/marketplace/components/carousel-img-products/carousel-img-products.component';
import { ProductContactInfoComponent } from 'src/app/modules/marketplace/components/product-contact-info/product-contact-info.component';
import { ModalConfirmComponent } from 'src/app/shared/components/modal-confirm/modal-confirm.component';
import { MarketplaceSearchComponent } from 'src/app/modules/marketplace/pages/marketplace-search/marketplace-search.component';
import { MarketplaceCategoryComponent } from 'src/app/modules/marketplace/pages/marketplace-category/marketplace-category.component';
import { EditProductComponent } from 'src/app/modules/marketplace/pages/edit-product/edit-product.component';
import { ShopHomeComponent } from 'src/app/modules/marketplace/pages/shop-home/shop-home.component';
import { NgbCarouselModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarMarketplaceComponent } from 'src/app/modules/marketplace/components/navbar-marketplace/navbar-marketplace.component';
import { SidebarMarketplaceComponent } from 'src/app/modules/marketplace/components/sidebar-marketplace/sidebar-marketplace.component';


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
    EditProductComponent,
    ShopHomeComponent,
    NavbarMarketplaceComponent,
    SidebarMarketplaceComponent

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
    MatRadioModule,
    NgbCarouselModule,
    NgbTooltipModule
  ],
  entryComponents:[ProductContactInfoComponent,ModalConfirmComponent]
})
export class MarketplaceModule { }
