import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { INewsFeed } from '../../features/news/interface/news-feed'; // Adjust the import path as needed

@Injectable({
  providedIn: 'root',
})
export class HackerNewsFeedService {
  private apiUrl = 'http://localhost:5245/api/HackerNewsFeed/top';

  constructor(private http: HttpClient) {}

  getTopStories(): Observable<INewsFeed[]> {
    return this.http.get<{ data: INewsFeed[] }>(this.apiUrl).pipe(
      map((response) => {
        if (response.data && Array.isArray(response.data)) {
          return response.data.map((story) => ({
            title: story.title,
            url: story.url || '#', // Handle stories without URLs
          }));
        } else {
          throw new Error('Invalid response format: Expected an array in the "data" property');
        }
      })
    );
  }
}