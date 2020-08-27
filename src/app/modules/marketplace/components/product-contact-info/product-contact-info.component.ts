import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserService } from 'src/app/shared/services/user.service';

interface UserData {
  userUID: string;

}

@Component({
  selector: 'app-product-contact-info',
  templateUrl: './product-contact-info.component.html',
  styleUrls: ['./product-contact-info.component.css']
})
export class ProductContactInfoComponent implements OnInit {

  constructor(private userService: UserService, public dialogRef: MatDialogRef<ProductContactInfoComponent>, @Inject(MAT_DIALOG_DATA) public data: UserData) { }

  user;
  copied;

  ngOnInit() {

    this.userService.getOneUser(this.data.userUID).subscribe((user) => {
      this.user = user;
    })
  }

  goBack() {
    this.dialogRef.close();
  }

  copy(id_elemento) {
    // Crea un campo de texto "oculto"
    var aux = document.createElement("input");

    // Asigna el contenido del elemento especificado al valor del campo
    aux.setAttribute("value", document.getElementById(id_elemento).innerHTML);

    // Añade el campo a la página
    document.body.appendChild(aux);

    // Selecciona el contenido del campo
    aux.select();

    // Copia el texto seleccionado
    this.copied = document.execCommand("copy");

    // Elimina el campo de la página
    document.body.removeChild(aux);
  }

}
