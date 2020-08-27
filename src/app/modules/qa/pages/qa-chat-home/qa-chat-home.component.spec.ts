import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QaChatHomeComponent } from './qa-chat-home.component';

describe('QaChatHomeComponent', () => {
  let component: QaChatHomeComponent;
  let fixture: ComponentFixture<QaChatHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QaChatHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QaChatHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
