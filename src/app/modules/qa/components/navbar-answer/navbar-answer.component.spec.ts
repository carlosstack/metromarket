import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarAnswerComponent } from './navbar-answer.component';

describe('NavbarAnswerComponent', () => {
  let component: NavbarAnswerComponent;
  let fixture: ComponentFixture<NavbarAnswerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarAnswerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
