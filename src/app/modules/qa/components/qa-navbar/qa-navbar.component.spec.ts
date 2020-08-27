import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QaNavbarComponent } from './qa-navbar.component';

describe('QaNavbarComponent', () => {
  let component: QaNavbarComponent;
  let fixture: ComponentFixture<QaNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QaNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QaNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
