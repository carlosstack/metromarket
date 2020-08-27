import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QachatTopQuestionsComponent } from './qachat-top-questions.component';

describe('QachatTopQuestionsComponent', () => {
  let component: QachatTopQuestionsComponent;
  let fixture: ComponentFixture<QachatTopQuestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QachatTopQuestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QachatTopQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
