import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EbookShareComponent } from './ebook-share.component';

describe('EbookShareComponent', () => {
  let component: EbookShareComponent;
  let fixture: ComponentFixture<EbookShareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EbookShareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EbookShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
