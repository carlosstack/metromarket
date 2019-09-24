import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-confirm',
  templateUrl: './modal-confirm.component.html',
  styleUrls: ['./modal-confirm.component.css']
})
export class ModalConfirmComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ModalConfirmComponent>) { }

    public answer:boolean=true;

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
