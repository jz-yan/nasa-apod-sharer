import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApodSharerService } from 'src/app/apod-sharer.service';
import { FEEDTYPE } from 'src/app/constants';
import { NASAImage } from 'src/app/interfaces';

@Component({
  selector: 'app-base-container',
  templateUrl: './base-container.component.html',
  styleUrls: ['./base-container.component.scss']
})
export class BaseContainerComponent implements OnInit {
  feedReg = FEEDTYPE.REGULAR;
  feedLiked = FEEDTYPE.LIKED;

  feedImages: NASAImage[] = [];
  likedImages: any[] = [];
  mediaLoaded: boolean = false;

  constructor(public apodService: ApodSharerService) {}

  ngOnInit(): void {
    this.likedImages = this.apodService.getLikedImages();
    this.getMediaFeed(this.apodService.getInitialAPOD(), true);
  }

  getMediaFeed(service: Observable<Object>, isInitialCall: boolean): void {
    service.subscribe({
      next: (res: any) => {
        let newImages: NASAImage[] = res;

        for (let i = 0; i < newImages.length; i++) {
          
          newImages[i].liked = false;

          for (let j = 0; j < this.likedImages.length; j++) {
            if (newImages[i].date === this.likedImages[j].date) {
              newImages[i].liked = true;
              break;
            }
          }

          if (!newImages[i].copyright) {
            newImages[i].copyright = 'NASA Public Domain';
          }
        }
        
        newImages.sort((a, b) => (a.date < b.date) ? 1 : -1);
        this.mediaLoaded = true;

        if (isInitialCall) {
          this.feedImages = newImages;
        }
        else {
          this.feedImages = this.feedImages.concat(newImages);
        }
      },
      error: (err: any) => {
        console.log(err)
      }
    })
  }

  updateLikedList(image: NASAImage) {
    // If image is in liked feed, remove from liked feed and toggle like button to false
    if (image.liked) {
      this.likedImages.push(image);

      let foundIndex = this.feedImages.findIndex(x => x.date === image.date);
      this.feedImages[foundIndex].liked = true;
    }
    // Else, add image to liked feed
    else {
      this.likedImages = this.likedImages.filter(({ date }) => date !== image.date); 

      let foundIndex = this.feedImages.findIndex(x => x.date === image.date);
      this.feedImages[foundIndex].liked = false;
    }

    // Saving liked media
    this.apodService.saveLikedImages(this.likedImages);
  }

  getApodService() {
    return this.apodService;
  }

  updateFeed() {
    this.getMediaFeed(this.apodService.getScrollingImages(), false);
  }
}
