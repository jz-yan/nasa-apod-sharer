import { Injectable } from '@angular/core';
import { NASAImage } from 'src/app/interfaces';

@Injectable({
  providedIn: 'root'
})
export class LikedMediaService {

  constructor() { }

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
  get getLikedImages(): NASAImage[] {
    let likedImages: NASAImage[] = JSON.parse(localStorage.getItem("likedImages") || "[]");

    return likedImages;
  }
}
