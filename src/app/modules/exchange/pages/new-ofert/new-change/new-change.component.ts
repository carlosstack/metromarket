import { Component, OnInit, Input } from '@angular/core';
import { NormalOfertService } from 'src/app/shared/services/normal-ofert.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConstantsService } from 'src/app/shared/services/constants.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { OfertInterface } from 'src/app/shared/models/ofert';
import { OfertPreviewComponent } from '../../../components/ofert-preview/ofert-preview.component';
import { MatDialog } from '@angular/material/dialog';
import { ModalConfirmComponent } from '../../../../../shared/components/modal-confirm/modal-confirm.component';

@Component({
  selector: 'app-new-change',
  templateUrl: './new-change.component.html',
  styleUrls: ['./new-change.component.css']
})
export class NewChangeComponent implements OnInit {

  private ofert: OfertInterface = {};

  public type ='CAMBIO';

  public constants;

  formGroupAmountAndRate: FormGroup;
  formGroupBanks: FormGroup;


  constructor(public dialog: MatDialog,private authService:AuthService,private normalOfertService: NormalOfertService, private formBuilder: FormBuilder, private constService: ConstantsService) { }

  ngOnInit() {

    this.constService.getExchangeNewOfertComponentConstants().subscribe(constants => {
      this.constants = constants;
    });

    this.buildFormAmountAndRate();
    this.buildFormBanks();

  }

  buildFormAmountAndRate() {
    this.formGroupAmountAndRate = this.formBuilder.group({
      amountToChangeCurrency: ['$', [Validators.required]],
      amountToReceiveCurrency: ['$', [Validators.required]],
      amountToChange: ['', [Validators.required, Validators.min(1), Validators.pattern(/^[0-9]\d*$/)]],
      amountToReceive: ['', [Validators.required, Validators.min(1), Validators.pattern(/^[0-9]\d*$/)]],
    });
  }


  buildFormBanks() {
    this.formGroupBanks = this.formBuilder.group({
      to: ['', [Validators.required, Validators.maxLength(3)]],
      from: ['', Validators.required],
    });
  }

  openDialogPreview(): void {
    this.authService.isAuth().subscribe((user) => {
      this.setValuesToOfert();
      const dialogRef = this.dialog.open(ModalConfirmComponent, {
        width: '300px',
      });

      dialogRef.afterClosed().subscribe(result => {

        if (result) {
          this.addOfert()
        }
      });
    })

  }
  addOfert() {
    this.normalOfertService.addOfert(this.ofert);  
  }

  setValuesToOfert() {
    this.authService.isAuth().subscribe(user => {


    this.ofert.amountToSend = this.formGroupAmountAndRate.get('amountToChange').value;
    this.ofert.amountToReceive = this.formGroupAmountAndRate.get('amountToReceive').value;

    this.ofert.currencyAmountToSend = this.formGroupAmountAndRate.get('amountToChangeCurrency').value;
    this.ofert.currencyAmountToReceive = this.formGroupAmountAndRate.get('amountToReceiveCurrency').value;

    this.ofert.rate= parseFloat((((this.ofert.amountToSend/this.ofert.amountToReceive)*100)-100).toPrecision(3)) 
    
    if(this.ofert.rate<0){
      this.ofert.rate = this.ofert.rate*(-1)
    }

    this.ofert.currencyRate = '%';

    this.getDataFromPayForm(this.formGroupBanks.get('to').value);

    this.ofert.from = this.formGroupBanks.get('from').value;
    this.ofert.type = this.type;
    this.ofert.statusOwner = 'NEW';
    this.ofert.status ='NEW';
    })
  }

  showMe(i) {
    console.log('look this: ', i);
  }

  getDataFromPayForm(data) {

    this.ofert.payForms=[{}];
    this.ofert.payFormsAb=[{}];

    for (let index = 0; index < data.length; index++) {

      this.ofert.payForms[index] = data[index].name;
      this.ofert.payFormsAb[index] = data[index].ab;
      
    }
  }

}
