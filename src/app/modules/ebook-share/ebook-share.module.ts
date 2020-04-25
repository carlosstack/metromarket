import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EbookShareRoutingModule } from './ebook-share-routing.module';
import { EbookShareComponent } from 'src/app/components/ebook-share/ebook-share.component';
import { AllEbooksComponent } from 'src/app/components/ebook-share/all-ebooks/all-ebooks.component';
import { NewEbookComponent } from 'src/app/components/ebook-share/new-ebook/new-ebook.component';
import { MyEbooksComponent } from 'src/app/components/ebook-share/my-ebooks/my-ebooks.component';
import { EbookPageComponent } from 'src/app/components/ebook-share/ebook-page/ebook-page.component';



@NgModule({
  declarations: [
    EbookShareComponent,
    AllEbooksComponent,
    NewEbookComponent,
    MyEbooksComponent,
    EbookPageComponent,
  ],
  imports: [
    CommonModule,
    EbookShareRoutingModule
  ]
})
export class EbookShareModule { }
