import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DIALOG_IMAGE, DIALOG_VIDEO, TEST_IMG, TEST_VIDEO } from 'src/app/test-data';

import { ImgContainerComponent } from './img-container.component';

describe('ImgContainerComponent', () => {
  let component: ImgContainerComponent;
  let fixture: ComponentFixture<ImgContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, MatDialogModule, BrowserAnimationsModule ],
      declarations: [ ImgContainerComponent ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        { provide: CUSTOM_ELEMENTS_SCHEMA, useValue: {} }
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImgContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeAll(() => {
   jest.spyOn(console, 'error').mockImplementation(() => {});
 });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit the display media when onLike() is called', () => {
     component.nasaImage = TEST_IMG;
     jest.spyOn(component.onLikeImage, 'emit');

     component.onLike();

     expect(component.onLikeImage.emit).toHaveBeenCalledWith(component.nasaImage);
  });

  it.each`
   dialogType      | isMedia   | compMedia
   ${DIALOG_IMAGE} | ${true}   | ${TEST_IMG}
   ${DIALOG_VIDEO} | ${false}  | ${TEST_VIDEO}
  `("Testing openDialog", async ({dialogType, isMedia, compMedia}) => {
      component.nasaImage = compMedia;
      jest.spyOn(component.dialogService, "openModal");

      component.openDialog(isMedia);

      expect(component.dialogService.openModal).toHaveBeenCalledWith(dialogType);
  });

  it.each`
   likedColour  | mediaLiked
   ${'accent'}  | ${true}
   ${'primary'} | ${false}
  `("Testing toggleLikeColour", async ({likedColour, mediaLiked}) => {
      component.nasaImage = TEST_IMG;
      component.nasaImage.liked = mediaLiked;

      expect(component.toggleLikeColour).toBe(likedColour);
  });

  it('Testing sanitize video', () => {
      component.nasaImage = TEST_VIDEO;
      jest.spyOn(component.sanitizerService, 'bypassSecurityTrustResourceUrl');

      component.sanitizeVideo;

      expect(component.sanitizerService.bypassSecurityTrustResourceUrl).toHaveBeenCalledWith(component.nasaImage.url);
  });

  it.each`
   likedToolTip          | mediaLiked
   ${'Unlike this post'} | ${true}
   ${'Like this post'}   | ${false}
  `("Testing likePostMessage", async ({likedToolTip, mediaLiked}) => {
      component.nasaImage = TEST_IMG;
      component.nasaImage.liked = mediaLiked;

      expect(component.likePostMessage).toBe(likedToolTip);
  });

  it('Testing mediaDialogMessage', () => {
     expect(component.mediaDialogMessage).toBe('View this post');
  });

  it('Testing explanationDialogMessage', () => {
     expect(component.explanationDialogMessage).toBe('View explanation for this post');
  });

  it('Testing shareMessage', () => {
     expect(component.shareMessage).toBe('Open this post in a new tab');
  });

  it('Testing isMobile', () => {
     jest.spyOn(component.deviceService, "isMobile");

     component.isMobile;

     expect(component.deviceService.isMobile).toHaveBeenCalled();
  })

  it.each`
      typeIsImage | mediaType
      ${true}     | ${TEST_IMG}
      ${false}    | ${TEST_VIDEO}
  `("Testing isImage", ({typeIsImage, mediaType}) => {
      component.nasaImage = mediaType;

      expect(component.isImage).toBe(typeIsImage);
  });
});