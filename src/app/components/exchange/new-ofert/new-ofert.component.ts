import { Component, OnInit } from '@angular/core';
import { NormalOfertService } from '../../../services/normal-ofert.service';
import { OfertInterface } from '../../../models/ofert';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ConstantsService } from "../../../services/constants.service";
export interface constant {
  name: string;
  ab: string;
}

@Component({
  selector: 'app-new-ofert',
  templateUrl: './new-ofert.component.html',
  styleUrls: ['./new-ofert.component.css']
})


export class NewOfertComponent implements OnInit {

  private ofert: OfertInterface = {
    destino: '',
    frecuency: null,
    divisaMonto: '$',
    divisaTasa: 'Bss',
    entrega: '',
    monto: 0,
    origen: '',
    tasa: 0,
    tipo: '',
    username: '',
    id: '',
    status: 'new',
    acceptedBy: null

  }


  /*----constants------*/


  operations_types: string[] = [
    'Unica', 'Fija'
  ];


  formGroupTypeAndFrecuency: FormGroup;
  formGroupBuyAndSellUniqueOfert: FormGroup;
  formGroupChangeUniqueOfert: FormGroup;
  formGroupBuyAndSellFixedOfert: FormGroup;



  formGroupMultiStep:FormGroup;


  formGroupFrecuency: FormGroup;
  formGroupType: FormGroup;
  formGroupAmountAndRateUnique: FormGroup;
  formGroupAmountAndRateFixed: FormGroup;
  formGroupAmountUniqueChange: FormGroup;


  public constants;


  constructor(private normalOfert: NormalOfertService, private formBuilder: FormBuilder, private constService: ConstantsService) { }



  public ngOnInit() {

    this.buildFormFrecuency();
    this.buildFormtype();

    this.constService.getExchangeNewOfertComponentConstants().subscribe(constants => {
      this.constants = constants;
    });

    this.formGroupMultiStep  = this.formBuilder.group({});
      

  }


  buildFormFrecuency() {
    this.formGroupFrecuency = this.formBuilder.group({
      frecuency: ['', Validators.required],
    });
  }
  buildFormtype() {
    this.formGroupType = this.formBuilder.group({
      type: ['', Validators.required],
    });

  }
  buildFormUniqueAmountAndRate() {
    this.formGroupAmountAndRateUnique = this.formBuilder.group({
      amount: ['', [Validators.required, Validators.min(1), Validators.pattern(/^[0-9]\d*$/)]],
      currencyAmount: ['$', [Validators.required]],
      rate: ['', [Validators.required, Validators.min(1), Validators.pattern(/^[0-9]\d*$/)]],
    });
  }

  buildFormFixedAmountAndRate() {
    this.formGroupBuyAndSellUniqueOfert = this.formBuilder.group({
      currencyAmount: ['$', [Validators.required]],
      amount: ['', [Validators.required, Validators.min(1), Validators.pattern(/^[0-9]\d*$/)]],
      rate: ['', [Validators.required, Validators.min(1), Validators.pattern(/^[0-9]\d*$/)]],
    });
  }

  buildFormUniqueChangeAmountAndRate() {
    this.formGroupChangeUniqueOfert = this.formBuilder.group({
      to: ['', Validators.required],
      from: ['', Validators.required],
      fromCurrency: ['$', [Validators.required]],
      toCurrency: ['$', [Validators.required]],
      toChange: ['', [Validators.required, Validators.min(1), Validators.pattern(/^[0-9]\d*$/)]],
      toReceive: ['', [Validators.required, Validators.min(1), Validators.pattern(/^[0-9]\d*$/)]],
    });
  }



  addOfert() {
    document.getElementById('loading').style.display = 'block';
    this.normalOfert.addOfert(this.ofert);

  }


  setStepControl() {

    if (this.formGroupFrecuency.get('frecuency').value == 'Unica') {

      if (this.formGroupType.get('type').value == 'Compro' || 'Vendo') {

        console.log('entre a build multistep');

        this.formGroupMultiStep  = this.formBuilder.group({
          amount: ['', [Validators.required, Validators.min(1), Validators.pattern(/^[0-9]\d*$/)]],
          currencyAmount: ['$', [Validators.required]],
          rate: ['', [Validators.required, Validators.min(1), Validators.pattern(/^[0-9]\d*$/)]],
        });

      } else if (this.formGroupType.get('type').value == 'Cambio') {

        this.formGroupMultiStep = this.formGroupChangeUniqueOfert;

      }

    } else if (this.formGroupFrecuency.get('frecuency').value == 'Fija') {

      this.formGroupMultiStep = this.formGroupBuyAndSellFixedOfert;

    }
  }

}



