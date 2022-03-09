import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { editNewMedia, NASAImage } from '../../interfaces';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { DialogModalService } from '../dialog-modal/dialog-modal.service';
import { DIALOG_TYPE } from 'src/app/constants';

@Injectable({
  providedIn: 'root'
})
export class ApodSharerService {
  // URL of apod api
  apodURL: string = 'https://api.nasa.gov/planetary/apod';
  
  // API key
  apiKey: string  = 'fqHuCTIVc03J3sidHAr5QsxiB8P9FAS9ffY5v7y9';
  // Start date for query parameter
  startDate: Date = new Date();
  // End date for query parameter
  endDate: Date = new Date();

  // Initial number of posts to display
  initialInterval: number = 7;
  // Number of subsequent posts to get from api after each infinite scroll call
  scrollInterval: number = 3;

  constructor(private httpClient: HttpClient, private dialogService: DialogModalService) { }

  // Returns date in ISO format yyyy-mm-dd as a string
  getISODate(currDate: Date): string {
    return currDate.toISOString().split('T')[0];
  }

  // Get next date based on interval
  getNextDate(currDate: Date, interval: number): Date {
    let newDate: Date = new Date();

    newDate.setDate(currDate.getDate());
    newDate.setMonth(currDate.getMonth());
    newDate.setFullYear(currDate.getFullYear());

    newDate.setDate(newDate.getDate() - interval);
    return newDate;
  }

  // Call GET with provided query parameters
  getMediaByURL(url: string, startDate: Date, endDate: Date): Observable<any> {
    let params = new HttpParams().set('api_key', this.apiKey).set('start_date', this.getISODate(startDate)).set('end_date', this.getISODate(endDate));
    return this.httpClient.get(url, { params: params });
  }

  getApod(isInitial: boolean = true) {
    if (isInitial) {
      return this.getInitialAPOD();
    }

    return this.getScrollingImages();
  }

  // Get initial posts
  getInitialAPOD() {
    this.startDate = this.getNextDate(this.endDate, this.initialInterval);

    return this.getMediaByURL(this.apodURL, this.startDate, this.endDate);
  }

  // Get infinite scroll posts
  getScrollingImages() {
    this.endDate = this.getNextDate(this.startDate, 1);

    this.startDate = this.getNextDate(this.endDate, this.scrollInterval);

    return this.getMediaByURL(this.apodURL, this.startDate, this.endDate);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // Open error modal with error message
      this.dialogService.openErrorModal(error);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getMedia(isInitial: boolean = true): Observable<NASAImage[]> {
    return this.getApod(isInitial)
      .pipe(
        map((response: NASAImage[]) => {
          // Sorting by date descending
          response.sort((a, b) => (a.date < b.date) ? 1 : -1);
          return response.map((i) => editNewMedia(i));
        }),
        catchError(this.handleError<any>('getImages'))
      );
  }
}
