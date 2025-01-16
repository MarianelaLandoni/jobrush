import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from 'core/services/auth-service/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getAuthToken();
  const authReqWithHeaders = req.clone({
    setHeaders: {
       Authorization: `Bearer ${token}`
    },
  });

  return next(authReqWithHeaders);
};
