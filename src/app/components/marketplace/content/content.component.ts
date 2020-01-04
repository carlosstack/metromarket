import { Component, OnInit } from '@angular/core';
import { ProductService } from "../../../services/product.service";
import { AuthService } from "../../../services/auth.service";
@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  public products;

  constructor(private auth: AuthService, private service:ProductService) { }

  ngOnInit() {

    this.auth.isAuth().subscribe(user => {

      this.service.getAll().subscribe(products => {

        this.products = products;
      })

    })

  }

  limit(text:string){
  return text.substring(0,70) + '...';
  }


}
