import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Router} from '@angular/router';
import {catchError} from 'rxjs/internal/operators';
import HttpStatusCode from '../utils/http-status-codes';

export const NOT_FOUND = 'not-found';

@Injectable({
    providedIn: 'root'
})
export class HttpNotFoundInterceptor implements HttpInterceptor {

    constructor(private router: Router) {
    }

    intercept(request: HttpRequest<undefined>, next: HttpHandler): Observable<HttpEvent<undefined>> {
        return next.handle(request)
            .pipe(catchError(
                (err: HttpErrorResponse) => {
                    if (err.status === HttpStatusCode.HTTP_404_NOT_FOUND) {
                        this.router.navigate([NOT_FOUND]);
                        return throwError(err);
                    }
                    return throwError(err);
                }));
    }
}
