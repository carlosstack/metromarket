import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketplaceCategoryComponent } from './marketplace-category.component';

describe('MarketplaceCategoryComponent', () => {
  let component: MarketplaceCategoryComponent;
  let fixture: ComponentFixture<MarketplaceCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketplaceCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketplaceCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
