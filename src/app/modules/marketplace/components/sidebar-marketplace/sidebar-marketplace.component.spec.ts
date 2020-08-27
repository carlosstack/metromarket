import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarMarketplaceComponent } from './sidebar-marketplace.component';

describe('SidebarMarketplaceComponent', () => {
  let component: SidebarMarketplaceComponent;
  let fixture: ComponentFixture<SidebarMarketplaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarMarketplaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarMarketplaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
