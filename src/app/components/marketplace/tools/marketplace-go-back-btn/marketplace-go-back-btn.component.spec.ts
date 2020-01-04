import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketplaceGoBackBtnComponent } from './marketplace-go-back-btn.component';

describe('MarketplaceGoBackBtnComponent', () => {
  let component: MarketplaceGoBackBtnComponent;
  let fixture: ComponentFixture<MarketplaceGoBackBtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketplaceGoBackBtnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketplaceGoBackBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
