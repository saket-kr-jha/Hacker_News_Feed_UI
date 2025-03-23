import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewsModule } from './features/news/news.module'; 
import { LoadingInterceptor } from './core/interceptors/loading.interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NewsModule
  ],
  providers: [
    provideHttpClient(withInterceptors([LoadingInterceptor])), // Register the interceptor
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
