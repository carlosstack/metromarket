import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEbookComponent } from './new-ebook.component';

describe('NewEbookComponent', () => {
  let component: NewEbookComponent;
  let fixture: ComponentFixture<NewEbookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewEbookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewEbookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
