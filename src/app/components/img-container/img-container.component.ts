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
  @Input() nasaImage: NASAImage = {} as NASAImage;
  @Output() onLikeImage: EventEmitter<NASAImage> = new EventEmitter();

  data: DialogMedia = {} as DialogMedia;

  constructor(private sanitizer: DomSanitizer, private deviceService: DeviceDetectorService, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  onLike() {
    this.nasaImage.liked = !this.nasaImage.liked;
    this.onLikeImage.emit(this.nasaImage);
  }

  sanitizeVideo() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.nasaImage.url);
  }

  toggleLike(): string {
    return this.nasaImage.liked ? 'accent' : 'primary';
  }

  openModal(): void {
    this.dialog.open(MediaComponentComponent, { data: this.data });
  }

  mobileOrVideo(): boolean {
    return this.deviceService.isMobile() || this.nasaImage.media_type === 'video';
  }

  openOnlyExplanation(): void {
    this.data = {
      title: this.nasaImage.title,
      url: this.nasaImage.url,
      explanation: this.nasaImage.explanation,
      media_type: this.nasaImage.media_type,
    };

    this.openModal();
  }

  openOnlyMedia(): void {
    this.data = {
      title: this.nasaImage.title,
      url: this.nasaImage.url,
      explanation: '',
      media_type: this.nasaImage.media_type,
    };

    this.openModal();
  }
}
