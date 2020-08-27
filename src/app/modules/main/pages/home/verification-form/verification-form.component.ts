import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../../shared/services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user.service';
import { UserVerificationInterface } from 'src/app/shared/models/user';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-verification-form',
  templateUrl: './verification-form.component.html',
  styleUrls: ['./verification-form.component.css']
})
export class VerificationFormComponent implements OnInit {

  formGroupPersonal: FormGroup;
  formGroupIdentity: FormGroup;
  formGroupAddress: FormGroup;

  public loading: boolean = null
  private dniImgFile;
  private dniImgUploadURL: string;
  public dniImgUploadComplete:boolean = false;
  private currentUserUid;
  
  uploadPercent: Observable<number>;
 

  constructor(private storage: AngularFireStorage,private _snackBar: MatSnackBar, private formBuilder: FormBuilder, private authService: AuthService, private userService: UserService) { }

  ngOnInit() {

    this.authService.isAuth().subscribe((user)=>{
      this.currentUserUid = user.uid
    })

    this.buildFormPersonal();
    this.buildFormIdentity();
    this.buildFormAddress();
  }

  buildFormPersonal() {
    this.formGroupPersonal = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      gender: ['', [Validators.required]],
    });
  }

  getVerificationStatus() {
    return this.authService.isVerificate()
  }

  sendEmailVerification() {
    this.authService.sendEmailVerification()
  }


  buildFormIdentity() {
    this.formGroupIdentity = this.formBuilder.group({
      dni: ['', [Validators.required, Validators.pattern(/^[0-9]\d*$/), Validators.min(100000)]],
      DNICapture: ['', [Validators.required]],
    });
  }
  buildFormAddress() {
    this.formGroupAddress = this.formBuilder.group({
      address: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9]\d*$/), Validators.min(1000000000)]],
    });
  }

  onUpload(e) {
   
    var path = `users-verification/dni/${this.authService.getCurrentUID()}`
    var file = e.target.files[0];
    const ref = this.storage.ref(path);
    const task = this.storage.upload(path, file);
    this.uploadPercent = task.percentageChanges();
    ref.getDownloadURL().subscribe((URL) => {
      this.dniImgUploadURL = URL;
      console.log(URL)
    });
    task.then((r)=>{
      this.dniImgUploadComplete = true;
    })

  }
  

  verifyAccount() {

    this.loading = true

    var user: UserVerificationInterface = ({
      uid: this.currentUserUid,
      dni: this.formGroupIdentity.get('dni').value.toString(),
      dniCaptureURL: this.dniImgUploadURL,
      firstName: this.formGroupPersonal.get('firstName').value.toString(),
      lastName: this.formGroupPersonal.get('lastName').value.toString(),
      gender: this.formGroupPersonal.get('gender').value.toString(),
      address: this.formGroupAddress.get('address').value.toString(),
      phone_number: this.formGroupAddress.get('phoneNumber').value.toString()

    });

    this.loading = this.userService.addUserVerification(user, this._snackBar);

  }

}
