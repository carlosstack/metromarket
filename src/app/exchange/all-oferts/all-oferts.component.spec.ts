import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllOfertsComponent } from './all-oferts.component';

describe('AllOfertsComponent', () => {
  let component: AllOfertsComponent;
  let fixture: ComponentFixture<AllOfertsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllOfertsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllOfertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
