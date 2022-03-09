import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedLoaderComponent } from './feed-loader.component';

describe('FeedLoaderComponent', () => {
  let component: FeedLoaderComponent;
  let fixture: ComponentFixture<FeedLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeedLoaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
