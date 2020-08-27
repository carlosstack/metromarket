import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarMarketplaceComponent } from './navbar-marketplace.component';

describe('NavbarMarketplaceComponent', () => {
  let component: NavbarMarketplaceComponent;
  let fixture: ComponentFixture<NavbarMarketplaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarMarketplaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarMarketplaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
