import {HttpClient, HttpHandler} from '@angular/common/http';
import HttpStatusCode from '../utils/http-status-codes';
import {BaseHttpHandler} from './http.handler';
import {Injectable} from '@angular/core';

export interface HttpError {
  status: HttpStatusCode;
  error: any | null;
}

@Injectable({
  providedIn: 'root',
})
export class HttpService extends HttpClient {

  constructor(handler: HttpHandler) {
    super(handler);
  }

  public static handleHttpError<T extends BaseHttpHandler>(context: T, err: HttpError): void {
    switch (err.status) {
      case HttpStatusCode.HTTP_400_BAD_REQUEST: {
        context.onHttp400(err.error);
        break;
      }
      case HttpStatusCode.HTTP_401_UNAUTHORIZED: {
        context.onHttp401(err.error);
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

  public static handleHttpSuccess<T extends BaseHttpHandler>(context: T, status?: number, title?: string, message?: string): void {
    switch (status) {
      case HttpStatusCode.HTTP_200_OK: {
        context.onHttp200(title || '', message || '');
        break;
      }
      case HttpStatusCode.HTTP_201_CREATED: {
        context.onHttp201(title || '', message || '');
        break;
      }
      default: {
        context.onHttpSuccess(title || '', message || '');
        break;
      }
    }
  }

}
