import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingExchangeComponent } from './loading-exchange.component';

describe('LoadingExchangeComponent', () => {
  let component: LoadingExchangeComponent;
  let fixture: ComponentFixture<LoadingExchangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadingExchangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingExchangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
