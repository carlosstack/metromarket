import { Component, OnInit } from '@angular/core';
import { NormalOfertService } from 'src/app/services/normal-ofert.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConstantsService } from 'src/app/services/constants.service';

@Component({
  selector: 'app-new-buy',
  templateUrl: './new-buy.component.html',
  styleUrls: ['./new-buy.component.css']
})
export class NewBuyComponent implements OnInit {

  public constants;

  formGroupAmountAndRate: FormGroup;
  formGroupBanks: FormGroup;


  constructor(private normalOfert: NormalOfertService, private formBuilder: FormBuilder, private constService: ConstantsService) { }

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
      to: ['', Validators.required],
      from: ['', Validators.required],
    });
  }
}
