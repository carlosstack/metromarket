import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptedOfertsComponent } from './accepted-oferts.component';

describe('AcceptedOfertsComponent', () => {
  let component: AcceptedOfertsComponent;
  let fixture: ComponentFixture<AcceptedOfertsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcceptedOfertsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptedOfertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
