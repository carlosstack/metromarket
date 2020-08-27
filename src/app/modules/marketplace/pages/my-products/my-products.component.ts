import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ProductService } from "../../../../shared/services/product.service";
import { AuthService } from "../../../../shared/services/auth.service";
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { OfertInterface } from 'src/app/shared/models/ofert';
import { Router } from '@angular/router';
import { ModalConfirmComponent } from '../../../../shared/components/modal-confirm/modal-confirm.component';

@Component({
  selector: 'app-my-products',
  templateUrl: './my-products.component.html',
  styleUrls: ['./my-products.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class MyProductsComponent implements OnInit {


  displayedColumns: string[] = ['photo', 'title', 'status', 'actions'];
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


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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
