import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FEEDTYPE } from 'src/app/constants';
import { NASAImage } from 'src/app/interfaces';

@Component({
  selector: 'app-home-container',
  templateUrl: './home-container.component.html',
  styleUrls: ['./home-container.component.scss']
})
export class HomeContainerComponent implements OnInit {
  // Type of feed: regular or liked
  @Input() FeedType: FEEDTYPE = FEEDTYPE.REGULAR;
  // Array of posts to display
  @Input() FeedImages: NASAImage[] = [];
  // Boolean to show skeleton loader, only applicable for regular feed
  @Input() MediaLoaded: boolean = true;
  // Boolean to show additional skeleton loader, only applicable for regular feed
  @Input() ScrollingLoaded: boolean = true;
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
    if (this.FeedType === FEEDTYPE.REGULAR) {
      this.onAppendMedia.emit();
    }
  }
}