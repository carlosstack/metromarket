import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from 'src/app/components/main/main.component';
import { NavbarComponent } from 'src/app/components/main/navbar/navbar.component';
import { MatToolbarModule, MatDivider, MatDividerModule } from '@angular/material';


@NgModule({
  declarations: [ 
    MainComponent,
    NavbarComponent

    
   ],
  imports: [
    CommonModule,
    MainRoutingModule,
    MatToolbarModule,
    MatDividerModule

  ],
  exports:[]
})
export class MainModule { }
