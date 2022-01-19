import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { NASAImage } from '../interfaces';

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

  constructor(private httpClient: HttpClient) { }

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
  getMediaByURL(url: string, startDate: Date, endDate: Date) {
    let params = new HttpParams().set('api_key', this.apiKey).set('start_date', this.getISODate(startDate)).set('end_date', this.getISODate(endDate));
    return this.httpClient.get(url, { params: params });
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

  // Save liked images in local storage
  saveLikedImages(likedImages: NASAImage[]): boolean {
    try {
      localStorage.setItem("likedImages", JSON.stringify(likedImages));
    } catch(e) {
      return false;
    }

    return true;
  }


  // Retrieve liked images from local storage
  getLikedImages(): NASAImage[] {
    let likedImages: NASAImage[] = JSON.parse(localStorage.getItem("likedImages") || "[]");

    return likedImages;
  }
}
