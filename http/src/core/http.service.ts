import {HttpClient, HttpErrorResponse, HttpHandler} from '@angular/common/http';
import HttpStatusCode from '../utils/http-status-codes';
import {BaseHttpHandler} from './http.handler';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService extends HttpClient {

  constructor(handler: HttpHandler) {
    super(handler);
  }

  // tslint:disable-next-line:no-any
  public static handleHttpError(context: any, err: HttpErrorResponse): void {
    if (context instanceof BaseHttpHandler) {
      switch (err.status) {
        case HttpStatusCode.HTTP_400_BAD_REQUEST: {
          context.onHttp400(err.error);
          break;
        }
        case HttpStatusCode.HTTP_402_PAYMENT_REQUIRED: {
          context.onHttp402(err.error);
          break;
        }
        case HttpStatusCode.HTTP_403_FORBIDDEN: {
          context.onHttp403(err.error);
          break;
        }
        case HttpStatusCode.HTTP_404_NOT_FOUND: {
          context.onHttp404(err.error);
          break;
        }
        case HttpStatusCode.HTTP_413_REQUEST_ENTITY_TOO_LARGE: {
          context.onHttp413(err.error);
          break;
        }
        case HttpStatusCode.HTTP_500_INTERNAL_SERVER_ERROR: {
          context.onHttpError(err.error, false);
          break;
        }
        case HttpStatusCode.HTTP_502_BAD_GATEWAY: {
          context.onHttpError(err.error, false);
          break;
        }
        case HttpStatusCode.HTTP_503_SERVICE_UNAVAILABLE: {
          context.onHttpError(err.error, false);
          break;
        }
        default: {
          context.onHttpError(err.error);
          break;
        }
      }
    }
  }

  // tslint:disable-next-line:no-any
  public static handleHttpSuccess(context: any, status: number = null, title?: string, message?: string, interpolateParams?: Object): void {
    if (context instanceof BaseHttpHandler) {
      switch (status) {
        case HttpStatusCode.HTTP_200_OK: {
          context.onHttp200(title, message, interpolateParams);
          break;
        }
        case HttpStatusCode.HTTP_201_CREATED: {
          context.onHttp201(title, message, interpolateParams);
          break;
        }
        default: {
          context.onHttpSuccess(title, message, interpolateParams);
          break;
        }
      }
    }
  }

}