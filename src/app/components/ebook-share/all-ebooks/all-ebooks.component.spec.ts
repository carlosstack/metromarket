import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllEbooksComponent } from './all-ebooks.component';

describe('AllEbooksComponent', () => {
  let component: AllEbooksComponent;
  let fixture: ComponentFixture<AllEbooksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllEbooksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllEbooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
