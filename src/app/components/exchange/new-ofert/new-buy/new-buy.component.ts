import { Component, OnInit, Input } from '@angular/core';
import { NormalOfertService } from 'src/app/services/normal-ofert.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConstantsService } from 'src/app/services/constants.service';
import { OfertInterface } from "../../../../models/ofert";
import { AuthService } from 'src/app/services/auth.service';




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

  constructor(private authService:AuthService,private normalOfertService: NormalOfertService, private formBuilder: FormBuilder, private constService: ConstantsService) { }

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
      amountMin: ['', [Validators.required, Validators.min(1), Validators.pattern(/^[0-9]\d*$/)]],
      amountMax: [''],
      rate: ['', [Validators.required, Validators.min(1), Validators.pattern(/^[0-9]\d*$/)]],
    });
  }

  buildFormBanks() {
    this.formGroupBanks = this.formBuilder.group({
      to: ['', [Validators.required, Validators.maxLength(2)]],
      from: ['', Validators.required],
    });
  }

  getAmountName() {
    if (this.range) {
      //esto pone el monto máximo a que sea requerido por el form.
      this.formGroupAmountAndRate.get('amountMax').setValidators([Validators.required, Validators.min(1), Validators.pattern(/^[0-9]\d*$/)]);
      this.formGroupAmountAndRate.get('amountMax').updateValueAndValidity();
      return 'Monto mínimo';
    } else {

      //esto pone el monto máximo lo resetea para que no sea requerido en caso de desactivar la opcion rango.
      this.formGroupAmountAndRate.get('amountMax').clearValidators();
      this.formGroupAmountAndRate.get('amountMax').updateValueAndValidity();
      return 'Monto';
    }

  }

  getSlideToggleForRangeName() {
    if (!this.range) {
      return 'Activar rango!';
    } else {
      return 'Rango activado!';
    }
  }


  addOfert() {
    this.setValuesToOfert();
    this.normalOfertService.addOfert(this.ofert);
  }

  setValuesToOfert() {


    this.authService.isAuth().subscribe(user => {

    console.log(this.formGroupBanks.get('to').value);
    this.ofert.phoneNumber = user.phoneNumber
    this.ofert.amountMin = this.formGroupAmountAndRate.get('amountMin').value;
    this.ofert.amountMax = this.formGroupAmountAndRate.get('amountMax').value;
    this.ofert.rate = this.formGroupAmountAndRate.get('rate').value;
    this.ofert.currencyAmount = this.formGroupAmountAndRate.get('amountCurrency').value;
    this.ofert.dateDelivery='';
    this.ofert.acceptedBy='';
  

    this.getDataFromPayForm(this.formGroupBanks.get('to').value);

    this.ofert.from = this.formGroupBanks.get('from').value;
    this.ofert.type = this.type;
    this.ofert.status = 'new';
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
