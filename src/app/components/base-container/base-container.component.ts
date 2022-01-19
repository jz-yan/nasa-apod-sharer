import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApodSharerService } from 'src/app/services/apod-sharer.service';
import { FEEDTYPE } from 'src/app/constants';
import { NASAImage } from 'src/app/interfaces';

@Component({
  selector: 'app-base-container',
  templateUrl: './base-container.component.html',
  styleUrls: ['./base-container.component.scss']
})
export class BaseContainerComponent implements OnInit {
  forYouLabel = "For You";
  likedPostsLabel = "Liked Posts";

  feedReg = FEEDTYPE.REGULAR;
  feedLiked = FEEDTYPE.LIKED;

  // array of posts corresponding to regular feed
  feedImages: NASAImage[] = [];
  // array of posts that have been liked
  likedImages: any[] = [];
  // When to show skeleton loader (when images haven't loaded in yet from apod api)
  mediaLoaded: boolean = false;

  constructor(public apodService: ApodSharerService) {}

  // When initialized, get liked posts from local storage and retrieve initial posts from apod service
  ngOnInit(): void {
    this.likedImages = this.apodService.getLikedImages();
    this.getMediaFeed(this.apodService.getInitialAPOD());
  }

  // Retrieve initial posts from apod service
  getMediaFeed(service: Observable<Object>): void {
    service.subscribe({
      next: (res: any) => {
        let newImages: NASAImage[] = res;

        // Looping through images from api call to add liked property and checking if it is already liked
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
        
        // Sort by date descending
        newImages.sort((a, b) => (a.date < b.date) ? 1 : -1);
        // Remove skeleton loader once everything is finished
        this.mediaLoaded = true;

        // Adding new posts to regular feed
        this.feedImages = this.feedImages.concat(newImages);
      },
      error: (err: any) => {
        console.log(err)
      }
    })
  }

  // Method called when like button clicked on posts either in regular or liked feeds
  updateLikedList(image: NASAImage) {
    // Find image in regular feed and update liked property
    let foundIndex = this.feedImages.findIndex(x => x.date === image.date);
    this.feedImages[foundIndex].liked = !this.feedImages[foundIndex].liked;

    // If post has been liked, add to liked feed and toggle liked property to true
    if (image.liked) {
      this.likedImages.push(image);
    }
    // If post has been unliked, remove from liked feed
    else {
      this.likedImages = this.likedImages.filter(({ date }) => date !== image.date); 
    }

    // Saving liked media to localStorage
    this.apodService.saveLikedImages(this.likedImages);
  }

  getApodService() {
    return this.apodService;
  }

  // Called when infinite scroll triggered to add more posts to regular feed
  updateFeed() {
    this.getMediaFeed(this.apodService.getScrollingImages());
  }
}
