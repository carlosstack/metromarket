import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-carousel-img-products',
  templateUrl: './carousel-img-products.component.html',
  styleUrls: ['./carousel-img-products.component.scss']
})
export class CarouselImgProductsComponent implements OnInit {

  @Input() galery: string[];

  constructor() { }

  ngOnInit() {
  }

  getSlideId(index){
    console.log('slide-'+index.toString())
    return ('slide-'+(index+1).toString())
  }

  
}
