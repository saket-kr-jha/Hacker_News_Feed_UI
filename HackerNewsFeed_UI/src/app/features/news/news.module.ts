import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NewsFeedComponent } from './components/news-feed/news-feed.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    NewsFeedComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule
  ],
  exports: [
    NewsFeedComponent
  ]
})
export class NewsModule { }
