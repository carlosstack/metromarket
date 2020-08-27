import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyOfertsComponent } from './my-oferts.component';

describe('MyOfertsComponent', () => {
  let component: MyOfertsComponent;
  let fixture: ComponentFixture<MyOfertsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyOfertsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyOfertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
