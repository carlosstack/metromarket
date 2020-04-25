import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from 'src/app/components/main/main.component';
import { NavbarComponent } from 'src/app/components/main/navbar/navbar.component';
import { MatToolbarModule, MatDivider, MatDividerModule, MatStepperModule, MatSlideToggleModule, MatSelectModule, MatButtonModule, MatInputModule, MatTabsModule, MatProgressSpinnerModule, MatIconModule, MatCheckboxModule, MatOptionModule, MatSnackBarModule, MatSidenavModule, MatFormFieldModule, MatTableModule, MatPaginatorModule, MatSortModule, MatDialog, MatDialogModule } from '@angular/material';
import { VerificationFormComponent } from 'src/app/components/home/verification-form/verification-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RatingComponent } from 'src/app/components/exchange/tools/view-transaction/rating/rating.component';
import { FooterComponent } from 'src/app/components/main/footer/footer.component';
import { UploaderComponent } from 'src/app/components/main/tools/uploader/uploader.component';
import { DropzoneDirective } from 'src/app/components/main/tools/directives/dropzone/dropzone.directive';
import { UploadTaskComponent } from 'src/app/components/main/tools/upload-task/upload-task.component';
import { ModalConfirmComponent } from 'src/app/components/exchange/tools/modal-confirm/modal-confirm.component';
import { SidebarComponent } from 'src/app/components/main/sidebar/sidebar.component';


@NgModule({
  declarations: [
    MainComponent,
    NavbarComponent,
    VerificationFormComponent,
    FooterComponent,
    RatingComponent,
    UploaderComponent,
    DropzoneDirective,
    UploadTaskComponent,
    ModalConfirmComponent,
    SidebarComponent

  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    MatToolbarModule,
    MatDividerModule,
    MatStepperModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatCheckboxModule,
    MatOptionModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot()

  ],
  exports: [RatingComponent, UploaderComponent,
    DropzoneDirective,
    UploadTaskComponent,ModalConfirmComponent],
  bootstrap: [MainComponent]
})
export class MainModule { }
