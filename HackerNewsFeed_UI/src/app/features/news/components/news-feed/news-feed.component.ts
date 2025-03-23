import { Component, OnInit } from '@angular/core';
import { INewsFeed } from '../../interface/news-feed';
import { HackerNewsFeedService } from '../../../../core/services/hacker-news-feed.service';

@Component({
  selector: 'app-news-feed',
  standalone: false,
  templateUrl: './news-feed.component.html',
  styleUrl: './news-feed.component.css',
})
export class NewsFeedComponent implements OnInit {
  stories: INewsFeed[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  searchedItem: string = '';
  isLoading: boolean = false;
  constructor(private hackerNewsFeedService: HackerNewsFeedService) {}

  ngOnInit(): void {
    this.getLatestStories();
  }

  getLatestStories() {
    this.isLoading = true;
    this.hackerNewsFeedService.getTopStories().subscribe({
      next: (data) => {
        this.stories = data;
        this.isLoading = false; 
      },
      error: (error) => {
        console.log('Error Fetching Stories', error);
        this.isLoading = false;
        this.stories = [];
      },
    });
  }

  get searchedStories() {
    return this.stories
      .filter((story) =>
        story.title.toLowerCase().includes(this.searchedItem.toLowerCase())
      )
      .slice(
        (this.currentPage - 1) * this.itemsPerPage,
        this.currentPage * this.itemsPerPage
      );
  }

  get totalPages(): number {
    return Math.ceil(this.stories.length / this.itemsPerPage);
  }

  getPageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
  }
}
