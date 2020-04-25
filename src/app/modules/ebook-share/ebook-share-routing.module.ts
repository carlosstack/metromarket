import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EbookShareComponent } from 'src/app/components/ebook-share/ebook-share.component';
import { NewEbookComponent } from 'src/app/components/ebook-share/new-ebook/new-ebook.component';
import { MyEbooksComponent } from 'src/app/components/ebook-share/my-ebooks/my-ebooks.component';
import { AllEbooksComponent } from 'src/app/components/ebook-share/all-ebooks/all-ebooks.component';
import { EbookPageComponent } from 'src/app/components/ebook-share/ebook-page/ebook-page.component';

const routes: Routes = [
    {
      path: 'es',
      component: EbookShareComponent,
      children:[
        {path:'new',component: NewEbookComponent, outlet:'ebook'},
        {path:'all',component: AllEbooksComponent, outlet:'ebook'},
        {path:'my-ebooks',component: MyEbooksComponent, outlet:'ebook'},
        {path:'ebook-page/:id',component: EbookPageComponent, outlet:'ebook'},
        { path:'**', redirectTo:'all'}
      ]
    }, 
    { path:'**', redirectTo:'es'}
  
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EbookShareRoutingModule { }
