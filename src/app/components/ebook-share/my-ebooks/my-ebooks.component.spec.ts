import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyEbooksComponent } from './my-ebooks.component';

describe('MyEbooksComponent', () => {
  let component: MyEbooksComponent;
  let fixture: ComponentFixture<MyEbooksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyEbooksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyEbooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
