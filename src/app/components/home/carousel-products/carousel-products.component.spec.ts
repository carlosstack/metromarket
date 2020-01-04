import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselProductsComponent } from './carousel-products.component';

describe('CarouselProductsComponent', () => {
  let component: CarouselProductsComponent;
  let fixture: ComponentFixture<CarouselProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarouselProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
