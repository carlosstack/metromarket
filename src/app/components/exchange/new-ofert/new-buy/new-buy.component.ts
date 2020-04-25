import { Component, OnInit, Input } from '@angular/core';
import { NormalOfertService } from 'src/app/services/normal-ofert.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConstantsService } from 'src/app/services/constants.service';
import { OfertInterface } from "../../../../models/ofert";
import { AuthService } from 'src/app/services/auth.service';
import { OfertPreviewComponent } from '../../tools/ofert-preview/ofert-preview.component';
import { MatDialog } from '@angular/material/dialog';
import { ModalConfirmComponent } from '../../tools/modal-confirm/modal-confirm.component';




@Component({
  selector: 'app-new-buy',
  templateUrl: './new-buy.component.html',
  styleUrls: ['./new-buy.component.css']
})


export class NewBuyComponent implements OnInit {

  public constants;

  @Input() public type;

  formGroupAmountAndRate: FormGroup;
  formGroupBanks: FormGroup;

  public range;

  private ofert: OfertInterface = {};

  constructor(public dialog: MatDialog, private authService: AuthService, private normalOfertService: NormalOfertService, private formBuilder: FormBuilder, private constService: ConstantsService) { }

  ngOnInit() {

    this.constService.getExchangeNewOfertComponentConstants().subscribe(constants => {
      this.constants = constants;
    });

    this.buildFormAmountAndRate();
    this.buildFormBanks();

  }

  buildFormAmountAndRate() {
    this.formGroupAmountAndRate = this.formBuilder.group({
      amountCurrency: ['$', [Validators.required]],
      amount: ['', [Validators.required, Validators.min(1), Validators.pattern(/^[0-9]\d*$/)]],
      rate: ['', [Validators.required, Validators.min(1), Validators.pattern(/^[0-9]\d*$/)]],
    });
  }

  buildFormBanks() {
    this.formGroupBanks = this.formBuilder.group({
      to: ['', [Validators.required, Validators.maxLength(2)]],
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

      this.ofert.amountToSend = this.formGroupAmountAndRate.get('amount').value;
      this.ofert.currencyAmountToSend = this.formGroupAmountAndRate.get('amountCurrency').value;

      this.ofert.rate = this.formGroupAmountAndRate.get('rate').value;
      this.ofert.currencyRate = 'Bs';

      this.ofert.amountToReceive = this.ofert.amountToSend * this.ofert.rate
      this.ofert.currencyAmountToReceive = this.ofert.currencyRate

      this.ofert.acceptedBy = '';


      this.getDataFromPayForm(this.formGroupBanks.get('to').value);

      this.ofert.from = this.formGroupBanks.get('from').value;
      this.ofert.type = this.type;
      this.ofert.statusOwner = 'NEW';
      this.ofert.status = 'NEW';
    })
  }

  showMe(i) {
    console.log('look this: ', i);
  }

  getDataFromPayForm(data) {

    this.ofert.payForms = [{}];
    this.ofert.payFormsAb = [{}];

    for (let index = 0; index < data.length; index++) {

      this.ofert.payForms[index] = data[index].name;
      this.ofert.payFormsAb[index] = data[index].ab;

    }
  }


}
