import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingMarketplaceComponent } from './loading-marketplace.component';

describe('LoadingMarketplaceComponent', () => {
  let component: LoadingMarketplaceComponent;
  let fixture: ComponentFixture<LoadingMarketplaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadingMarketplaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingMarketplaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
