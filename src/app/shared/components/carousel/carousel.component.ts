import { Component, OnInit, Input } from '@angular/core';
  
@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})


export class CarouselComponent implements OnInit {

  images = [];
  
  @Input() height: string;
  @Input() width: string;

  constructor() { }

  ngOnInit(): void {


    this.images[0] ='../../../../../assets/shop-images/1588800099586-home-slider_desktop2.jpg';
    this.images[1]='../../../../../assets/shop-images/1588876211865-home-slider_desktop.jpg';
    this.images[2]='../../../../../assets/shop-images/1588883839335-home-slider_desktop.jpg';
  }

}
