import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {Router} from '@angular/router';
import HttpStatusCode from '../utils/http-status-codes';

export const UNAVAILABLE = 'unavailable';

@Injectable({
    providedIn: 'root',
})
export class HttpErrorInterceptor implements HttpInterceptor {

    constructor(private router: Router) {
    }

  public intercept(request: HttpRequest<undefined>, next: HttpHandler): Observable<HttpEvent<undefined>> {
        return next.handle(request)
            .pipe(catchError(
                (err: HttpErrorResponse) => {
                    if (err.status === HttpStatusCode.HTTP_502_BAD_GATEWAY
                        || err.status === HttpStatusCode.HTTP_503_SERVICE_UNAVAILABLE
                        || err.status === HttpStatusCode.NO_STATE) {

                        this.router.navigate([UNAVAILABLE]);
                        return throwError(() => err);
                    }
                    return throwError(() => err);
                }));
    }
}
