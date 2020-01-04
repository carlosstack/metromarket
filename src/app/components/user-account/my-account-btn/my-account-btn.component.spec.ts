import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAccountBtnComponent } from './my-account-btn.component';

describe('MyAccountBtnComponent', () => {
  let component: MyAccountBtnComponent;
  let fixture: ComponentFixture<MyAccountBtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyAccountBtnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAccountBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
