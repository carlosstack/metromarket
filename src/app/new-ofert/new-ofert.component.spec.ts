import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewOfertComponent } from './new-ofert.component';

describe('NewOfertComponent', () => {
  let component: NewOfertComponent;
  let fixture: ComponentFixture<NewOfertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewOfertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewOfertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
