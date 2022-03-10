import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EMPTY_FEED, SINGLE_FEED, TEST_IMG } from 'src/app/test-data';

import { BaseContainerComponent } from './base-container.component';

describe('BaseContainerComponent', () => {
  let component: BaseContainerComponent;
  let fixture: ComponentFixture<BaseContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, MatDialogModule ],
      declarations: [ BaseContainerComponent ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        { provide: CUSTOM_ELEMENTS_SCHEMA, useValue: {} },
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

   beforeAll(() => {
      jest.spyOn(console, 'error').mockImplementation(() => {});
   });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

//   it('Testing getImages', () => {
//    component.scrollingLoaded = false;
//    jest.spyOn(component.apodService, 'getMedia').mockImplementation(() => SINGLE_FEED);
//    component.applyLikedMedia = jest.fn();

//    component.getImages();
//    fixture.detectChanges();

//    // expect(component.applyLikedMedia).toHaveBeenCalled();
//    expect(component.mediaLoaded).toBe(true);
//    expect(component.scrollingLoaded).toBe(true);
//   })

  it('Testing applyLikedMedia when feed images is not empty', () => {
   component.likedImages = SINGLE_FEED;
   component.feedImages = SINGLE_FEED;

   component.applyLikedMedia();

   expect(component.feedImages[0].liked).toBe(true);
  })

  it('Testing applyLikedMedia when feed images is empty', () => {
   component.likedImages = EMPTY_FEED;
   component.feedImages = SINGLE_FEED;

   component.applyLikedMedia();

   expect(component.feedImages[0].liked).toBe(false);
  })

  it.each`
   timesPushCalled | timesFilterCalled | likedList     | media
   ${1}            | ${0}              | ${EMPTY_FEED} | ${TEST_IMG}
  `('Testing updateLikedList', async ({timesPushCalled, timesFilterCalled, likedList, media}) => {
   component.feedImages = SINGLE_FEED;
   component.likedImages = likedList;

   jest.spyOn(component.likedMedService, "saveLikedImages");
   component.likedImages.push = jest.fn();
   component.likedImages.filter = jest.fn();

   component.updateLikedList(media);

   expect(component.likedImages.push).toHaveBeenCalledTimes(timesPushCalled);
   expect(component.likedImages.filter).toHaveBeenCalledTimes(timesFilterCalled);
   expect(component.likedMedService.saveLikedImages).toHaveBeenCalled();
   
  });

  it('Testing updateFeed', () => {
   component.scrollingLoaded = true;

   component.getImages = jest.fn();

   component.updateFeed();

   expect(component.scrollingLoaded).toBe(false);
   expect(component.getImages).toHaveBeenCalledWith(false);
  });

  it('toggleMenu should be called when menu button is clicked', () => {
   component.openMenu = false;

   component.toggleMenu();

   expect(component.openMenu).toBe(true);
  });

  it('returnToTop should be called when Return to Top button is clicked', () => {
     component.openMenu = false;
     jest.spyOn(window, "scrollTo");

     component.returnToTop();

     expect(window.scrollTo).toHaveBeenCalledWith({top: 0, behavior: 'smooth'});
     expect(component.openMenu).toBe(true);
  })

  it('refreshFeed should be called when Refresh button is clicked', () => {
   component.openMenu = false;

   component.returnToTop = jest.fn();
   component.getImages = jest.fn();

   component.refreshFeed();

   expect(component.mediaLoaded).toBe(false);
   expect(component.returnToTop).toHaveBeenCalled();
   expect(component.getImages).toHaveBeenCalled();
  });
});
