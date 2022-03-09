import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FEED_TYPE } from 'src/app/constants';
import { NASAImage } from 'src/app/interfaces';

@Component({
  selector: 'app-home-container',
  templateUrl: './home-container.component.html',
  styleUrls: ['./home-container.component.scss']
})
export class HomeContainerComponent implements OnInit {
  // Type of feed: regular or liked
  @Input() FeedType: FEED_TYPE = FEED_TYPE.REGULAR;
  // Array of posts to display
  @Input() FeedImages: NASAImage[] = [];
  // Message for when feed is empty
  @Input() EmptyMsg: string = "";
  // Emits post that has been liked or unliked
  @Output() onSelectLike: EventEmitter<NASAImage> = new EventEmitter();
  // Emits when more posts are needed to be displayed, aka when infinite scroll is triggered
  @Output() onAppendMedia: EventEmitter<{}> = new EventEmitter();
  
  constructor() {}
  
  ngOnInit(): void {}

  // Emitting post that has been liked or unliked
  likedImage(image: NASAImage) {
    this.onSelectLike.emit(image);
  }

  // Emitting when more posts are needed to be displayed
  onScroll() {
    if (this.FeedType === FEED_TYPE.REGULAR) {
      this.onAppendMedia.emit();
    }
  }

  get feedImagesEmpty(): boolean {
    return this.FeedImages.length == 0;
  }
}
