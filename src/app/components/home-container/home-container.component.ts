import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FEEDTYPE } from 'src/app/constants';
import { NASAImage } from 'src/app/interfaces';

@Component({
  selector: 'app-home-container',
  templateUrl: './home-container.component.html',
  styleUrls: ['./home-container.component.scss']
})
export class HomeContainerComponent implements OnInit {
  @Input() FeedType: FEEDTYPE = FEEDTYPE.REGULAR;
  @Input() FeedImages: NASAImage[] = [];
  @Input() MediaLoaded: boolean = true;
  @Output() onSelectLike: EventEmitter<NASAImage> = new EventEmitter();
  @Output() onAppendMedia: EventEmitter<{}> = new EventEmitter();
  
  tempImg: NASAImage = {} as NASAImage;
  data: any[] = [];
  feedImages: NASAImage[] = [];
  likedImages: any[] = [];

  constructor() {}
  
  ngOnInit(): void {
    if (this.FeedType == FEEDTYPE.LIKED) {
      console.log("Liked feed reached");
    }
    this.feedImages = this.FeedImages;
  }

  isRegularFeed(): boolean {
    return this.FeedType === FEEDTYPE.REGULAR;
  }

  likedImage(image: NASAImage) {
    if (this.FeedType === FEEDTYPE.LIKED) {
      this.feedImages = this.feedImages.filter((i) => i.url !== image.url);
    }
    
    this.tempImg = image;
    this.onSelectLike.emit(this.tempImg);
  }

  onScroll() {
    if (this.FeedType === FEEDTYPE.REGULAR) {
      this.onAppendMedia.emit();
    }
  }
}
