import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { FeedLoaderComponent } from './feed-loader.component';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('FeedLoaderComponent', () => {
  let component: FeedLoaderComponent;
  let fixture: ComponentFixture<FeedLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, MatDialogModule ],
      declarations: [ FeedLoaderComponent ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        { provide: CUSTOM_ELEMENTS_SCHEMA, useValue: {} }
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeAll(() => {
   jest.spyOn(console, 'error').mockImplementation(() => {});
 });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

   it.each`
      isScrollingVisible | showLoading
      ${true}            | ${true}
      ${false}           | ${false}
   `("should return '$isScrollingVisible' when showLoading is '$showLoading'", async ({ isScrollingVisible, showLoading }) => {
      component.ShowLoading = showLoading;
      
      expect(component.isScrollingVisible).toBe(isScrollingVisible);
   });
});
