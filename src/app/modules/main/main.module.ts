import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgbModule, NgbDropdownModule, NgbTooltipModule, NgbPopoverModule, NgbCarouselModule} from '@ng-bootstrap/ng-bootstrap';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './pages/main/main.component';
import { NavbarComponent } from 'src/app/shared/components/navbar/navbar.component';
import { MatToolbarModule, MatDividerModule, MatStepperModule, MatSlideToggleModule, MatSelectModule, MatButtonModule, MatInputModule, MatProgressSpinnerModule, MatIconModule, MatCheckboxModule, MatOptionModule, MatSnackBarModule, MatFormFieldModule, MatTableModule, MatPaginatorModule, MatSortModule, MatDialogModule, MatTreeModule } from '@angular/material';
import { VerificationFormComponent } from 'src/app/modules/main/pages/home/verification-form/verification-form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RatingComponent } from 'src/app/modules/exchange/components/rating/rating.component';
import { FooterComponent } from 'src/app/shared/components/footer/footer.component';
import { UploaderComponent } from 'src/app/shared/components/uploader/uploader.component';
import { DropzoneDirective } from 'src/app/shared/directives/dropzone/dropzone.directive';
import { UploadTaskComponent } from 'src/app/shared/components/upload-task/upload-task.component';
import { ModalConfirmComponent } from 'src/app/shared/components/modal-confirm/modal-confirm.component';
import { SidebarComponent } from 'src/app/shared/components/sidebar/sidebar.component';
import { NotificationsComponent } from 'src/app/shared/components/notifications/notifications.component';
import { AppsComponent } from 'src/app/modules/main/pages/apps/apps.component';
import { MessengerComponent } from 'src/app/shared/components/messenger/messenger.component';
import { CarouselComponent } from 'src/app/shared/components/carousel/carousel.component';
import { LoadingComponent } from 'src/app/shared/components/loading/loading.component';


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
    SidebarComponent,
    NotificationsComponent,
    AppsComponent,
    MessengerComponent,
    CarouselComponent,
    LoadingComponent

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
    NgbModule,
    NgbDropdownModule,
    NgbTooltipModule,
    NgbPopoverModule,
    NgbCarouselModule,
    MatTreeModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,

  ],
  exports: [
    RatingComponent, 
    UploaderComponent,
    DropzoneDirective,
    UploadTaskComponent,
    ModalConfirmComponent,
    MessengerComponent,
    CarouselComponent,
    LoadingComponent]
})
export class MainModule { }
