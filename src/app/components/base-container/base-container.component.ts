import { Component, OnInit } from '@angular/core';
import { ApodSharerService } from 'src/app/services/apod-sharer/apod-sharer.service';
import { FEED_TYPE, LIKED_EMPTY, REGULAR_EMPTY } from 'src/app/constants';
import { NASAImage } from 'src/app/interfaces';
import { LikedMediaService } from 'src/app/services/liked-media/liked-media.service';
import { DialogModalService } from 'src/app/services/dialog-modal/dialog-modal.service';

@Component({
  selector: 'app-base-container',
  templateUrl: './base-container.component.html',
  styleUrls: ['./base-container.component.scss']
})
export class BaseContainerComponent implements OnInit {
  public forYouLabel = "For You";
  public likedPostsLabel = "Liked Posts";

  feedReg = FEED_TYPE.REGULAR;
  feedLiked = FEED_TYPE.LIKED;

  // Open, close menu
  public openMenu: boolean = false;

  // Scroll to top message
  public scrollTopMsg: string = "Scroll to top of feed";
  // Refresh feed message
  public refreshMsg: string = "Refresh feed contents";
  // Switch lighting message
  public lightingMsg: string = "Change lighting mode";

  // array of posts corresponding to regular feed
  public feedImages: NASAImage[] = [];
  // array of posts that have been liked
  public likedImages: NASAImage[] = [];
  // When to show skeleton loader (when images haven't loaded in yet from apod api)
  public mediaLoaded: boolean = false;
  // When to show skeleton loader (when additional images haven't loaded in yet)
  public scrollingLoaded: boolean = true;

  // Empty message for For You feed
  public forYouEmpty: string = REGULAR_EMPTY;
  // Empty message for Liked feed
  public likedEmpty: string = LIKED_EMPTY;

  constructor(
    private apodService: ApodSharerService,
    private likedMedService: LikedMediaService,
    private dialogService: DialogModalService
  ) {}

  // When initialized, get liked posts from local storage and retrieve initial posts from apod service
  ngOnInit(): void {
    this.likedImages = this.likedMedService.getLikedImages();
    
    // Get initial images
    this.getImages();
  }

  getImages(isInitial: boolean = true): void {
   this.apodService.getMedia(isInitial)
   .subscribe({
      next: (data: NASAImage[]) => {
         this.feedImages = this.feedImages.concat(data);

         if (isInitial) {
            // Apply liked media
            this.applyLikedMedia();
         }

         this.mediaLoaded = true;
         this.scrollingLoaded = true;
       },
       error: (error: Error) => {
         this.dialogService.openErrorModal(error);
       }
     })
 }

  applyLikedMedia(): void {
     for (let i = 0; i < this.feedImages.length; i++) {
        if (this.likedImages.some(e => e.date === this.feedImages[i].date)) {
           this.feedImages[i].liked = true;
        }
     }
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
    this.likedMedService.saveLikedImages(this.likedImages);
  }

  getApodService() {
    return this.apodService;
  }

  // Called when infinite scroll triggered to add more posts to regular feed
  updateFeed() {
    this.scrollingLoaded = false;
    this.getImages(false);
  }

  toggleMenu() {
    this.openMenu = !this.openMenu;
  }

  returnToTop() {
    window.scrollTo({top: 0, behavior: 'smooth'});
    this.openMenu = !this.openMenu;
  }

  refreshFeed() {
    this.returnToTop();
    this.mediaLoaded = false;
    
    this.getImages();
  }
}
