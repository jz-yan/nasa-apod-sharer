import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeContainerComponent } from './components/home-container/home-container.component';
import { ImgContainerComponent } from './components/img-container/img-container.component';
import { HttpClientModule } from '@angular/common/http';

import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BaseContainerComponent } from './components/base-container/base-container.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MediaComponentComponent } from './components/media-component/media-component.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@NgModule({
  declarations: [
    AppComponent,
    HomeContainerComponent,
    ImgContainerComponent,
    BaseContainerComponent,
    MediaComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatCardModule,
    MatTabsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDividerModule,
    MatDialogModule,
    MatTooltipModule,
    MatToolbarModule,

    BrowserAnimationsModule,
    InfiniteScrollModule,
    MatIconModule,
    NgxSkeletonLoaderModule.forRoot(),
  ],
  providers: [
    MatDatepickerModule,
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
