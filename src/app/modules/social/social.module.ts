import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SocialRoutingModule } from './social-routing.module';
import { SocialComponent } from 'src/app/components/social/social.component';
import { LoadingComponent } from 'src/app/components/main/loading/loading.component';
import { InternetErrorComponent } from 'src/app/components/main/internet-error/internet-error.component';


@NgModule({
  declarations: [ SocialComponent,    
   ],
  imports: [
    CommonModule,
    SocialRoutingModule
  ]
})
export class SocialModule { }
