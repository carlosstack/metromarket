import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarExchangeComponent } from './toolbar-exchange.component';

describe('ToolbarExchangeComponent', () => {
  let component: ToolbarExchangeComponent;
  let fixture: ComponentFixture<ToolbarExchangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolbarExchangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarExchangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
