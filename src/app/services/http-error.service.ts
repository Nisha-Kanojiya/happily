import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';

export class HttpErrorInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMsg = '';
          if (error.error instanceof ErrorEvent) {
            console.log('this is client side error');
            errorMsg = `Error: ${error.error.message}`;
          } else {
            Swal.fire({
              position: 'center',
              icon: 'error',
              // tslint:disable-next-line:max-line-length
              title: 'Refreshing page is taking too long.  Please click on OK, move out of this page, and return to try again.  Or try closing browser and re-opening the website.  Sorry for the inconvenience.',
              showConfirmButton: true,
              // timer: 2000
            });
            console.log('this is server side error');
            errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
          }
          console.log(errorMsg);
          return throwError(errorMsg);
        })
      );
  }
}
