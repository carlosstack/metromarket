import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangeDashboardComponent } from './exchange-dashboard.component';

describe('ExchangeDashboardComponent', () => {
  let component: ExchangeDashboardComponent;
  let fixture: ComponentFixture<ExchangeDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExchangeDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExchangeDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
