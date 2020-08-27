import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QachatTopAnswersComponent } from './qachat-top-answers.component';

describe('QachatTopAnswersComponent', () => {
  let component: QachatTopAnswersComponent;
  let fixture: ComponentFixture<QachatTopAnswersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QachatTopAnswersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QachatTopAnswersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
