import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { NASAImage } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class ApodSharerService {
  apodURL: string = 'https://api.nasa.gov/planetary/apod';
  
  apiKey: string  = 'fqHuCTIVc03J3sidHAr5QsxiB8P9FAS9ffY5v7y9';
  startDate: Date = new Date();
  endDate: Date = new Date();

  initialInterval: number = 7;
  scrollInterval: number = 3;

  constructor(private httpClient: HttpClient) { }

  getISODate(currDate: Date): string {
    return currDate.toISOString().split('T')[0];
  }

  getNextDate(currDate: Date, interval: number): Date {
    let newDate: Date = new Date();

    newDate.setDate(currDate.getDate());
    newDate.setMonth(currDate.getMonth());
    newDate.setFullYear(currDate.getFullYear());

    newDate.setDate(newDate.getDate() - interval);
    return newDate;
  }

  getMediaByURL(url: string, startDate: Date, endDate: Date) {
    let params = new HttpParams().set('api_key', this.apiKey).set('start_date', this.getISODate(startDate)).set('end_date', this.getISODate(endDate));
    return this.httpClient.get(url, { params: params });
  }

  getInitialAPOD() {
    this.startDate = this.getNextDate(this.endDate, this.initialInterval);

    return this.getMediaByURL(this.apodURL, this.startDate, this.endDate);
  }

  getScrollingImages() {
    this.endDate = this.getNextDate(this.startDate, 1);

    this.startDate = this.getNextDate(this.endDate, this.scrollInterval);

    return this.getMediaByURL(this.apodURL, this.startDate, this.endDate);
  }

  saveLikedImages(likedImages: NASAImage[]): boolean {
    try {
      localStorage.setItem("likedImages", JSON.stringify(likedImages));
    } catch(e) {
      return false;
    }

    return true;
  }

  getLikedImages(): NASAImage[] {
    let likedImages: NASAImage[] = JSON.parse(localStorage.getItem("likedImages") || "[]");

    return likedImages;
  }
}
