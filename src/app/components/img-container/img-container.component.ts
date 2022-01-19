import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { DeviceDetectorService } from 'ngx-device-detector';
import { DialogMedia, NASAImage } from 'src/app/interfaces';
import { MediaComponentComponent } from '../media-component/media-component.component';
  
@Component({
  selector: 'app-img-container',
  templateUrl: './img-container.component.html',
  styleUrls: ['./img-container.component.scss']
})
export class ImgContainerComponent implements OnInit {
  // Post to display
  @Input() nasaImage: NASAImage = {} as NASAImage;
  // Emits post when liked or unliked
  @Output() onLikeImage: EventEmitter<NASAImage> = new EventEmitter();
  // Data for either media or description dialog modal
  data: DialogMedia = {} as DialogMedia;

  constructor(private sanitizer: DomSanitizer, private deviceService: DeviceDetectorService, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  // Emit post when liked or unliked
  onLike() {
    this.onLikeImage.emit(this.nasaImage);
  }

  // Sanitizes YouTube url's to display in iframe
  sanitizeVideo() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.nasaImage.url);
  }

  // Change button colour when liked or unliked
  toggleLike(): string {
    return this.nasaImage.liked ? 'accent' : 'primary';
  }

  // Opens modal that will either display the media or just the title and description
  openModal(): void {
    this.dialog.open(MediaComponentComponent, { data: this.data });
  }

  // Checks whether device is mobile or if media type is a video
  mobileOrVideo(): boolean {
    return this.deviceService.isMobile() || this.nasaImage.media_type === 'video';
  }

  // Fill in data accordingly to display dialog with only title and description
  openOnlyExplanation(): void {
    this.data = {
      title: this.nasaImage.title,
      url: this.nasaImage.url,
      explanation: this.nasaImage.explanation,
      media_type: this.nasaImage.media_type,
    };

    this.openModal();
  }

  // Fill in data accordingly to display dialog with just the media
  openOnlyMedia(): void {
    this.data = {
      title: this.nasaImage.title,
      url: this.nasaImage.url,
      explanation: '',
      media_type: this.nasaImage.media_type,
    };

    this.openModal();
  }

  // Get tooltip/aria label for favouriting post
  get likePostMessage() {
    return (this.nasaImage.liked ? 'Unlike' : 'Like') + ' this post';
  }

  // Get tooltip/aria label for viewing media dialog
  get mediaDialogMessage() {
    return 'View this post';
  }

  // Get tooltip/aria label for viewing explanation dialog
  get explanationDialogMessage() {
    return 'View explanation for this post';
  }

  // Get tooltip/aria label for opening post in new tab
  get shareMessage() {
    return 'Open this post in a new tab';
  }
}
