import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QachatTrendingTagsComponent } from './qachat-trending-tags.component';

describe('QachatTrendingTagsComponent', () => {
  let component: QachatTrendingTagsComponent;
  let fixture: ComponentFixture<QachatTrendingTagsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QachatTrendingTagsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QachatTrendingTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
