import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfertPreviewComponent } from './ofert-preview.component';

describe('OfertPreviewComponent', () => {
  let component: OfertPreviewComponent;
  let fixture: ComponentFixture<OfertPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfertPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfertPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
