import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangeGoBackBtnComponent } from './exchange-go-back-btn.component';

describe('ExchangeGoBackBtnComponent', () => {
  let component: ExchangeGoBackBtnComponent;
  let fixture: ComponentFixture<ExchangeGoBackBtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExchangeGoBackBtnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExchangeGoBackBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
