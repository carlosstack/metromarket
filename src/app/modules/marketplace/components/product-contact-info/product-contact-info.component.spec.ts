import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductContactInfoComponent } from './product-contact-info.component';

describe('ProductContactInfoComponent', () => {
  let component: ProductContactInfoComponent;
  let fixture: ComponentFixture<ProductContactInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductContactInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductContactInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
