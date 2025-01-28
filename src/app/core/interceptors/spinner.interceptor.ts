import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { SpinnerService } from 'core/services/spinner-service/spinner.service';
import { finalize } from 'rxjs';

export const spinnerInterceptor: HttpInterceptorFn = (req, next) => {
  const spinnerService = inject(SpinnerService);

  if (req.method === 'GET') {
    spinnerService.show();
  }

  return next(req).pipe(
    finalize(()=> spinnerService.hide())
  );
};
