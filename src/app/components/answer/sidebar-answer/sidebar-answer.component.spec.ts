import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarAnswerComponent } from './sidebar-answer.component';

describe('SidebarAnswerComponent', () => {
  let component: SidebarAnswerComponent;
  let fixture: ComponentFixture<SidebarAnswerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarAnswerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
