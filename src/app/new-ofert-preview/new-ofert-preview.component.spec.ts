import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewOfertPreviewComponent } from './new-ofert-preview.component';

describe('NewOfertPreviewComponent', () => {
  let component: NewOfertPreviewComponent;
  let fixture: ComponentFixture<NewOfertPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewOfertPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewOfertPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
