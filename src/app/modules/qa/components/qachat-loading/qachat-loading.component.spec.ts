import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QachatLoadingComponent } from './qachat-loading.component';

describe('QachatLoadingComponent', () => {
  let component: QachatLoadingComponent;
  let fixture: ComponentFixture<QachatLoadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QachatLoadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QachatLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
