import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerActivityComponent } from './answer-activity.component';

describe('AnswerActivityComponent', () => {
  let component: AnswerActivityComponent;
  let fixture: ComponentFixture<AnswerActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnswerActivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnswerActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
