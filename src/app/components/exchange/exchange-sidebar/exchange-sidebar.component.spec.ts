import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangeSidebarComponent } from './exchange-sidebar.component';

describe('ExchangeSidebarComponent', () => {
  let component: ExchangeSidebarComponent;
  let fixture: ComponentFixture<ExchangeSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExchangeSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExchangeSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
