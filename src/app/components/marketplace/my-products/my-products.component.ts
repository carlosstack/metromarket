import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from "../../../services/product.service";
import { AuthService } from "../../../services/auth.service";
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { OfertInterface } from 'src/app/models/ofert';
import { Router } from '@angular/router';
import { ModalConfirmComponent } from '../../exchange/tools/modal-confirm/modal-confirm.component';

@Component({
  selector: 'app-my-products',
  templateUrl: './my-products.component.html',
  styleUrls: ['./my-products.component.css']
})
export class MyProductsComponent implements OnInit {


  displayedColumns: string[] = ['photo', 'title', 'price', 'status', 'actions'];
  dataSource: MatTableDataSource<OfertInterface>;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  public products;
  public userUID;

  constructor(private dialog: MatDialog, private router: Router, private auth: AuthService, private service: ProductService) { }

  ngOnInit() {


    this.products =[]

    this.auth.isAuth().subscribe(user => {

      this.userUID = user.uid
      this.service.getMyProducts(this.userUID).subscribe(products => {
        this.products = products;
        this.dataSource = new MatTableDataSource(this.products);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      })

    })

  }





  optionSelected(option, product) {
    console.log(option)
    switch (option.value) {
      case 'open':
        this.router.navigateByUrl(`/app/marketplace/m/(marketplace:product/${product.id})`);
        break;
      case 'edit':
        this.router.navigateByUrl(`/app/marketplace/m/(marketplace:edit/${product.id})`);
        break;
      case 'pause':
        this.pause(product)
        break;
      case 'active':
        this.active(product)
        break;
      case 'delete':
        this.delete(product.id)
        break;
    }

  }

  openEdit(id) {
    this.router.navigateByUrl(`/app/exchange/e/(exchange:edit/${id})`);

  }
  delete(id) {
    const dialogRef = this.dialog.open(ModalConfirmComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.service.delete(id);
      }
    });
  }
  pause(product) {
    const dialogRef = this.dialog.open(ModalConfirmComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.service.changeStatus(product, 'Pausado');
      }
    });

  }
  active(product) {
    const dialogRef = this.dialog.open(ModalConfirmComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.service.changeStatus(product, 'Activo');
      }
    });

  }


}
