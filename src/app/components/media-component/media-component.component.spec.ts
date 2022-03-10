import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DIALOG_ERROR, DIALOG_IMAGE, DIALOG_VIDEO } from 'src/app/test-data';

import { PopupModalComponent } from './media-component.component';

describe('PopupModalComponent', () => {
  let component: PopupModalComponent;
  let fixture: ComponentFixture<PopupModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, MatDialogModule ],
      declarations: [ PopupModalComponent ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        { provide: CUSTOM_ELEMENTS_SCHEMA, useValue: {} },
     ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupModalComponent);
    component = fixture.componentInstance;
    component.data = DIALOG_IMAGE;
    fixture.detectChanges();
  });

  beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('should create', () => {
   expect(component).toBeTruthy();
  });

  it.each`
      typeIsImage | dialogData
      ${true}     | ${DIALOG_IMAGE}
      ${false}    | ${DIALOG_VIDEO}
      ${false}    | ${DIALOG_ERROR}
  `("Testing isImage", ({typeIsImage, dialogData}) => {
      component.data = dialogData;

      expect(component.isImage).toBe(typeIsImage);
  });
});