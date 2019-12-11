import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarOfertsComponent } from './navbar-oferts.component';

describe('NavbarOfertsComponent', () => {
  let component: NavbarOfertsComponent;
  let fixture: ComponentFixture<NavbarOfertsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarOfertsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarOfertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
