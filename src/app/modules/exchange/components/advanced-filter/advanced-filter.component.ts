import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-advanced-filter',
  templateUrl: './advanced-filter.component.html',
  styleUrls: ['./advanced-filter.component.css']
})
export class AdvancedFilterComponent implements OnInit {

  formGroup:FormGroup;

  constructor(private formBuilder:FormBuilder,public dialogRef: MatDialogRef<AdvancedFilterComponent>) { }

  ngOnInit() {
    this.buildForm()
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  
  buildForm() {
    
    this.formGroup= this.formBuilder.group({
      amountMin: ['', [Validators.min(1), Validators.pattern(/^[0-9]\d*$/)]],
      amountMax: ['', [Validators.min(1), Validators.pattern(/^[0-9]\d*$/)]],
      type: [''],
      rateMax: ['', [Validators.min(1), Validators.pattern(/^[0-9]\d*$/)]],
    });
  }

  apply(){
    this.formGroup.get('vggg')
  }
  invalidForm(){
    if(this.formGroup.get('rateMax').value || this.formGroup.get('type').value || this.formGroup.get('amountMax').value || this.formGroup.get('amountMin').value){
      return false
    }else{
      return true
    }
  }

}
