import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QachatSearchComponent } from './qachat-search.component';

describe('QachatSearchComponent', () => {
  let component: QachatSearchComponent;
  let fixture: ComponentFixture<QachatSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QachatSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QachatSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
