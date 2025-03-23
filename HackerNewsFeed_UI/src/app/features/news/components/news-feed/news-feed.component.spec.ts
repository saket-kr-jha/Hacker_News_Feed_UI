import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewsFeedComponent } from './news-feed.component';
import { HackerNewsFeedService } from '../../../../core/services/hacker-news-feed.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { INewsFeed } from '../../interface/news-feed';
import { LoaderComponent } from '../../../../shared/components/loader/loader.component'; 
import { FormsModule } from '@angular/forms'; 

describe('NewsFeedComponent', () => {
  let component: NewsFeedComponent;
  let fixture: ComponentFixture<NewsFeedComponent>;
  let hackerNewsFeedServiceMock: jasmine.SpyObj<HackerNewsFeedService>;

  const mockStories: INewsFeed[] = [
    { title: 'Story 1', url: 'http://example.com/1' },
    { title: 'Story 2', url: 'http://example.com/2' },
    { title: 'Story 3', url: 'http://example.com/3' },
  ];

  beforeEach(() => {
    // Create a spy object for HackerNewsFeedService
    hackerNewsFeedServiceMock = jasmine.createSpyObj('HackerNewsFeedService', ['getTopStories']);

    TestBed.configureTestingModule({
      declarations: [NewsFeedComponent, LoaderComponent],
      imports: [FormsModule],
      providers: [
        { provide: HackerNewsFeedService, useValue: hackerNewsFeedServiceMock },
        provideHttpClient(withInterceptorsFromDi()), // Provide HttpClient
        provideHttpClientTesting(), // Provide HttpClientTesting
      ],
    });

    fixture = TestBed.createComponent(NewsFeedComponent);
    component = fixture.componentInstance;
  });

  // Test Case 1: Component Creation
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  // Test Case 2: Fetch Stories on Initialization
  it('should fetch stories on initialization', () => {
    // Mock the getTopStories method to return mockStories
    hackerNewsFeedServiceMock.getTopStories.and.returnValue(of(mockStories));

    // Trigger ngOnInit
    fixture.detectChanges();

    // Verify that the service was called
    expect(hackerNewsFeedServiceMock.getTopStories).toHaveBeenCalled();

    // Verify that the stories are set correctly
    expect(component.stories).toEqual(mockStories);

    // Verify that isLoading is set to false after fetching data
    expect(component.isLoading).toBeFalse();
  });

  // Test Case 3: Handle Error When Fetching Stories
  it('should handle error when fetching stories', () => {
    // Mock the getTopStories method to return an error
    hackerNewsFeedServiceMock.getTopStories.and.returnValue(throwError(() => new Error('Failed to fetch stories')));

    // Trigger ngOnInit
    fixture.detectChanges();

    // Verify that the service was called
    expect(hackerNewsFeedServiceMock.getTopStories).toHaveBeenCalled();

    // Verify that stories array is empty
    expect(component.stories).toEqual([]);

    // Verify that isLoading is set to false after error
    expect(component.isLoading).toBeFalse();
  });

  // Test Case 4: Filter Stories Based on Search Query
  it('should filter stories based on search query', () => {
    // Set the stories array
    component.stories = mockStories;

    // Set the search query
    component.searchedItem = 'Story 1';

    // Call the searchedStories getter
    const filteredStories = component.searchedStories;

    // Verify that only matching stories are returned
    expect(filteredStories.length).toBe(1);
    expect(filteredStories[0].title).toBe('Story 1');
  });

  // Test Case 5: Return the Correct Total Number of Pages
  it('should return the correct total number of pages', () => {
    // Set the stories array
    component.stories = mockStories;
    component.itemsPerPage = 2;

    // Call the totalPages getter
    const totalPages = component.totalPages;

    // Verify that the total pages are calculated correctly
    expect(totalPages).toBe(2); // Math.ceil(3 / 2) = 2
  });

  // Test Case 6: Generate an Array of Page Numbers
  it('should generate an array of page numbers', () => {
    // Set the stories array
    component.stories = mockStories;
    component.itemsPerPage = 2;

    // Call the getPageNumbers method
    const pageNumbers = component.getPageNumbers();

    // Verify that the correct page numbers are generated
    expect(pageNumbers).toEqual([1, 2]);
  });

  // Test Case 7: Update the Current Page on Page Change
  it('should update the current page on page change', () => {
    // Set the initial page
    component.currentPage = 1;

    // Call the onPageChange method
    component.onPageChange(2);

    // Verify that the current page is updated
    expect(component.currentPage).toBe(2);
  });
});