import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../../../services/user.service';
import { UserInterface } from '../../../../../models/user';
import { AuthService } from '../../../../../services/auth.service';
import { RatingInterface } from '../../../../../models/rating';
import { AngularFirestore } from '@angular/fire/firestore';
import { OfertInterface } from '../../../../../models/ofert';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SuccessfulData } from '../view-transaction.component';
import { NormalOfertService } from 'src/app/services/normal-ofert.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-successful-transaction',
  templateUrl: './successful-transaction.component.html',
  styleUrls: ['./successful-transaction.component.css']
})
export class SuccessfulTransactionComponent implements OnInit {

  constructor(private _snackBar: MatSnackBar, private formBuilder: FormBuilder, private ofertService: NormalOfertService, public dialogRef: MatDialogRef<SuccessfulTransactionComponent>, @Inject(MAT_DIALOG_DATA) public data: SuccessfulData, private afs: AngularFirestore, private route: ActivatedRoute, private userService: UserService, private authService: AuthService, private router: Router) { }

  public partner: UserInterface;
  public value: number = 0;
  public comment: string = '';
  public rating: RatingInterface = {};
  public submit: boolean = false;
  public ofert: OfertInterface;
  public type: string;
  public ofertId: string;
  public idUser: string;

  formGroupRating: FormGroup;

  ngOnInit() {
    this.idUser = this.data.idUser;
    this.ofert = this.data.ofert;

    this.buildFormRating();

    this.rating.userUID = this.idUser;
    this.userService.getOneUser(this.idUser).subscribe(partner => {
      this.partner = partner;

      this.authService.isAuth().subscribe(user => {
        this.rating.partnerName = user.displayName;
        this.rating.partnerUID = user.uid;

      });

    });

  }
  buildFormRating() {
    this.formGroupRating = this.formBuilder.group({
      type: ['', [Validators.required]],
      comment: ['', [Validators.required]],
    });
  }

  setValue(value: number) {
    this.value = value;
  }

  onSubmit() {
    this.submit = true
    const ofert = this.ofert;

    this.rating.comment = this.formGroupRating.get('comment').value;
    this.rating.date = Date.now();
    this.rating.ofertID = this.ofert.id;
    this.rating.excuse = 'SUCCESFULL';
    this.rating.type = this.formGroupRating.get('type').value;
    this.rating.partnerUID = this.idUser;
    this.rating.status = 'COMPLETED';

    if (this.ofert.acceptedByUID == this.idUser) {
      ofert.statusOwner = 'COMPLETED'
      this.rating.partnerName = this.ofert.acceptedBy;
      this.rating.userUID = this.ofert.acceptedByUID;
    } else if (this.ofert.ownerUID == this.idUser) {
      ofert.statusAcceptedBy = 'COMPLETED'
      this.rating.partnerName = this.ofert.owner;
      this.rating.userUID = this.ofert.ownerUID;
    }

    //run a bath to save the review and then close the dialog
    this.userService.addRatingPartner(this.rating, ofert).then(() => {
      this.dialogRef.close()
      this.showAlert('Calificación agregada exitosamente!', this._snackBar)
    }).catch(() => {
      this.showAlert('Ha ocurrido un error, intentalo nuevamente.', this._snackBar);
      this.submit = false;
    })



  }


  showAlert(txt: string, _snackBar) {

    _snackBar.open(txt, 'X', {
      duration: 3000,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
      panelClass: 'notif'
    });
  }
}