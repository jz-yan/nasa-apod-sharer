import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-feed-loader',
  templateUrl: './feed-loader.component.html',
  styleUrls: ['./feed-loader.component.scss']
})
export class FeedLoaderComponent implements OnInit {
  @Input() ShowLoading: boolean = false;

  public numLoaders: number = 5;

  constructor() { }

  ngOnInit(): void {
  }

  get isScrollingVisible(): boolean {
    return this.ShowLoading;
  }
}
