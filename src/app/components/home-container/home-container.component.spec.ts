import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FEED_TYPE } from 'src/app/constants';
import { EMPTY_FEED, SINGLE_FEED } from 'src/app/test-data';

import { HomeContainerComponent } from './home-container.component';

describe('HomeContainerComponent', () => {
  let component: HomeContainerComponent;
  let fixture: ComponentFixture<HomeContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, MatDialogModule ],
      declarations: [ HomeContainerComponent ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        { provide: CUSTOM_ELEMENTS_SCHEMA, useValue: {} }
     ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeAll(() => {
      jest.spyOn(console, 'error').mockImplementation(() => {});
   });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit an image', () => {
   jest.spyOn(component.onSelectLike, 'emit');

   component.likedImage(component.FeedImages[0]);

   expect(component.onSelectLike.emit).toHaveBeenCalledWith(component.FeedImages[0]);
  })

  it.each`
      calledTimes | feedType
      ${1}        | ${FEED_TYPE.REGULAR}
      ${0}        | ${FEED_TYPE.LIKED}
  `("should call onAppendMedia() '$calledTimes' times when FeedType is '$feedType'", async({calledTimes, feedType}) => {
      jest.spyOn(component.onAppendMedia, 'emit');
      component.FeedType = feedType;

      component.onScroll();

      expect(component.onAppendMedia.emit).toHaveBeenCalledTimes(calledTimes);
  });

  it.each`
      feedIsEmpty    | feedData
      ${true}        | ${EMPTY_FEED}
      ${false}       | ${SINGLE_FEED}
  `("feedImagesEmpty should return '$feedIsEmpty' when FeedImages is '$feedData'", async ({feedIsEmpty, feedData}) => {
      component.FeedImages = feedData;

      expect(component.feedImagesEmpty).toBe(feedIsEmpty);
  });
});
