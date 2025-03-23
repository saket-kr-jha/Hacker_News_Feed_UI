import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { LoaderService } from '../services/loader.service';

export const LoadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loaderService = inject(LoaderService); // Inject the LoaderService

  loaderService.show(); // Show loader when the request starts

  return next(req).pipe(
    finalize(() => {
      loaderService.hide(); // Hide loader when the request completes
    })
  );
};