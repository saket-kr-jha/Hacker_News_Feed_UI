import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HackerNewsFeedService } from './hacker-news-feed.service';
import { INewsFeed } from '../../features/news/interface/news-feed';

describe('HackerNewsFeedService', () => {
  let service: HackerNewsFeedService;
  let httpMock: HttpTestingController;

  const mockResponse = {
    data: [
      { title: 'Story 1', url: 'https://example.com/story1' },
      { title: 'Story 2', url: 'https://example.com/story2' },
    ],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HackerNewsFeedService],
    });

    service = TestBed.inject(HackerNewsFeedService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch top stories and return formatted data', () => {
    service.getTopStories().subscribe((stories: INewsFeed[]) => {
      expect(stories.length).toBe(2);
      expect(stories[0].title).toBe('Story 1');
      expect(stories[0].url).toBe('https://example.com/story1');
    });

    const req = httpMock.expectOne('http://localhost:5245/api/HackerNewsFeed/top');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should handle an empty response gracefully', () => {
    service.getTopStories().subscribe((stories: INewsFeed[]) => {
      expect(stories.length).toBe(0);
    });

    const req = httpMock.expectOne('http://localhost:5245/api/HackerNewsFeed/top');
    req.flush({ data: [] });
  });

  it('should handle missing "url" properties gracefully', () => {
    const mockResponseWithMissingUrls = {
      data: [{ title: 'Story without URL' }],
    };

    service.getTopStories().subscribe((stories: INewsFeed[]) => {
      expect(stories.length).toBe(1);
      expect(stories[0].title).toBe('Story without URL');
      expect(stories[0].url).toBe('#'); 
    });

    const req = httpMock.expectOne('http://localhost:5245/api/HackerNewsFeed/top');
    req.flush(mockResponseWithMissingUrls);
  });

  it('should throw an error on an invalid response format', () => {
    service.getTopStories().subscribe({
      next: () => fail('Expected an error, but got a response'),
      error: (error) => {
        expect(error.message).toContain('Invalid response format');
      },
    });

    const req = httpMock.expectOne('http://localhost:5245/api/HackerNewsFeed/top');
    req.flush({ invalidData: [] }); 
  });
});
