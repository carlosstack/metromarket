import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSellComponent } from './new-sell.component';

describe('NewSellComponent', () => {
  let component: NewSellComponent;
  let fixture: ComponentFixture<NewSellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewSellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
