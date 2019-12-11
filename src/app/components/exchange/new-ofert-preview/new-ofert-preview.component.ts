import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-new-ofert-preview',
  templateUrl: './new-ofert-preview.component.html',
  styleUrls: ['./new-ofert-preview.component.css']
})
export class NewOfertPreviewComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<NewOfertPreviewComponent>) { }

  ngOnInit() {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
