import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingPanelComponent } from './rating-panel.component';

describe('RatingPanelComponent', () => {
  let component: RatingPanelComponent;
  let fixture: ComponentFixture<RatingPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RatingPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
