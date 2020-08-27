import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyQachatCommentsComponent } from './my-qachat-comments.component';

describe('MyQachatCommentsComponent', () => {
  let component: MyQachatCommentsComponent;
  let fixture: ComponentFixture<MyQachatCommentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyQachatCommentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyQachatCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
