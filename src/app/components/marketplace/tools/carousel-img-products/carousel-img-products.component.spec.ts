import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselImgProductsComponent } from './carousel-img-products.component';

describe('CarouselImgProductsComponent', () => {
  let component: CarouselImgProductsComponent;
  let fixture: ComponentFixture<CarouselImgProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarouselImgProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselImgProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
