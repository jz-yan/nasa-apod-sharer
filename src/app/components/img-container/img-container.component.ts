import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DeviceDetectorService } from 'ngx-device-detector';
import { DIALOG_TYPE } from 'src/app/constants';
import { NASAImage } from 'src/app/interfaces';
import { DialogModalService } from 'src/app/services/dialog-modal/dialog-modal.service';
  
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

  constructor(public sanitizerService: DomSanitizer, public deviceService: DeviceDetectorService, public dialogService: DialogModalService) { }

  ngOnInit(): void {}

  // Emit post when liked or unliked
  onLike(): void {
    this.onLikeImage.emit(this.nasaImage);
  }

  openDialog(isMedia: boolean = true): void {
     this.dialogService.openModal({
      type: isMedia ? DIALOG_TYPE.IMAGE : DIALOG_TYPE.VIDEO,
      data: {
         explanation: this.nasaImage.explanation,
         title: this.nasaImage.title,
         url: this.nasaImage.url
      }
     });
  }

  // Change button colour when liked or unliked
  get toggleLikeColour(): string {
   return this.nasaImage.liked ? 'accent' : 'primary';
 }

  // Sanitizes YouTube url's to display in iframe
  get sanitizeVideo(): SafeResourceUrl {
   return this.sanitizerService.bypassSecurityTrustResourceUrl(this.nasaImage.url);
 }

  // Get tooltip/aria label for favouriting post
  get likePostMessage(): string {
    return (this.nasaImage.liked ? 'Unlike' : 'Like') + ' this post';
  }

  // Get tooltip/aria label for viewing media dialog
  get mediaDialogMessage(): string {
    return 'View this post';
  }

  // Get tooltip/aria label for viewing explanation dialog
  get explanationDialogMessage(): string {
    return 'View explanation for this post';
  }

  // Get tooltip/aria label for opening post in new tab
  get shareMessage(): string {
    return 'Open this post in a new tab';
  }

  // Checks whether device is mobile or if media type is a video
   get isMobile(): boolean {
      return this.deviceService.isMobile();
   }
  
  get isImage(): boolean {
     return this.nasaImage.media_type === 'image';
  }
}
