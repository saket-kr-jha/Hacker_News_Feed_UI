import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // 
import { AppComponent } from './app.component';
import { NewsFeedComponent } from './features/news/components/news-feed/news-feed.component';
import { LoaderComponent } from './shared/components/loader/loader.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([]),
        HttpClientTestingModule, // 
      ],
      declarations: [AppComponent, NewsFeedComponent, LoaderComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'HackerNewsFeed_UI'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('HackerNewsFeed_UI');
  });

  it('should render title inside NewsFeedComponent', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    await fixture.whenStable();
  
    const compiled = fixture.nativeElement as HTMLElement;
    const newsFeedElement = compiled.querySelector('app-news-feed');
    
    expect(newsFeedElement).toBeTruthy(); 
  });
  
});
