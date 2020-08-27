import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewChangeComponent } from './new-change.component';

describe('NewChangeComponent', () => {
  let component: NewChangeComponent;
  let fixture: ComponentFixture<NewChangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewChangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
