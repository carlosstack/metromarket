import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnsuccessfulTransactionComponent } from './unsuccessful-transaction.component';

describe('UnsuccessfulTransactionComponent', () => {
  let component: UnsuccessfulTransactionComponent;
  let fixture: ComponentFixture<UnsuccessfulTransactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnsuccessfulTransactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnsuccessfulTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
