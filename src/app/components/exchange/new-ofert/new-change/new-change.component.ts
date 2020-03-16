import { Component, OnInit, Input } from '@angular/core';
import { NormalOfertService } from 'src/app/services/normal-ofert.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConstantsService } from 'src/app/services/constants.service';
import { OfertChangeInterface } from "../../../../models/ofert";
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-new-change',
  templateUrl: './new-change.component.html',
  styleUrls: ['./new-change.component.css']
})
export class NewChangeComponent implements OnInit {

  private ofert: OfertChangeInterface = {};

  public type ='CAMBIO';

  public constants;

  formGroupAmountAndRate: FormGroup;
  formGroupBanks: FormGroup;


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
      amountToChangeCurrency: ['$', [Validators.required]],
      amountToReceiveCurrency: ['$', [Validators.required]],
      amountToChange: ['', [Validators.required, Validators.min(1), Validators.pattern(/^[0-9]\d*$/)]],
      amountToReceive: ['', [Validators.required, Validators.min(1), Validators.pattern(/^[0-9]\d*$/)]],
    });
  }

  buildFormBanks() {
    this.formGroupBanks = this.formBuilder.group({
      to: ['', Validators.required],
      from: ['', Validators.required],
    });
  }

  
  addOfert() {
    this.setValuesToOfert();
    this.normalOfertService.addOfertOfTypeChange(this.ofert);
  }

  setValuesToOfert() {
    this.authService.isAuth().subscribe(user => {

    this.ofert.phoneNumber = user.phoneNumber

    this.ofert.amountToChange = this.formGroupAmountAndRate.get('amountToChange').value;
    this.ofert.amountToReceive = this.formGroupAmountAndRate.get('amountToReceive').value;
    this.ofert.fromCurrency = this.formGroupAmountAndRate.get('amountToChangeCurrency').value;
    this.ofert.toCurrency = this.formGroupAmountAndRate.get('amountToReceiveCurrency').value;

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
