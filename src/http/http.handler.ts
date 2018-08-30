import {Observable} from 'rxjs/internal/Observable';
import {AINotificationsService, NotificationTypes} from './utils';
import {hasOwnProp} from '../polyfills';
import {
  Http200Callback,
  Http201Callback,
  Http400Callback,
  Http402Callback,
  Http403Callback,
  Http404Callback,
  Http413Callback,
  HttpErrorCallback
} from './callbacks';
import {HttpSuccessCallback} from './callbacks/http-success.callback';

export abstract class BaseHttpHandler implements Http200Callback, Http201Callback, HttpSuccessCallback,
  Http400Callback, Http402Callback<any>, Http403Callback, Http404Callback, Http413Callback, HttpErrorCallback<any> {

  protected constructor() {
  }

  protected abstract getNotificationService(): AINotificationsService;

  protected abstract getTranslation(key: string | string[], interpolateParams?: {}): Observable<{ [name: string]: string }>;

  protected onSuccess(): void {
  }

  protected onError(error?: { error: string } | string): void {
  }


  public onHttp200(title: string, message: string): void {
    this.getTranslation([title, message]).subscribe(res => {
      this.getNotificationService().showAlert(res[title], res[message], NotificationTypes.SUCCESS);
    });
    this.onSuccess();
  }

  public onHttp201(title: string, message: string): void {
    this.getTranslation([title, message]).subscribe(res => {
      this.getNotificationService().showAlert(res[title], res[message], NotificationTypes.SUCCESS);
    });
    this.onSuccess();
  }

  public onHttpSuccess(title: string, message: string): void {
    this.getTranslation([title, message]).subscribe(res => {
      this.getNotificationService().showAlert(res[title], res[message], NotificationTypes.SUCCESS);
    });
    this.onSuccess();
  }

  public onHttp400(value: { [p: string]: string[] } | { error: string }): void {
    this.getTranslation(['MESSAGE.ERROR']).subscribe(res => {
      hasOwnProp(value, 'error')
        ? this.getNotificationService().showAlert(res['MESSAGE.ERROR'], (value as { error: string }).error, NotificationTypes.ERROR)
        : this.getNotificationService().showAlerts(value as { [p: string]: string[] }, NotificationTypes.ERROR);
    });
    hasOwnProp(value, 'error')
      ? this.onError(value as { error: string })
      : this.onError();
  }

  public onHttp402(value: { errors: string[]; data?: any }): void {
    this.onError();
  }

  public onHttp403(value: { error: string }) {
    this.getTranslation(['MESSAGE.ERROR']).subscribe(res => {
      this.getNotificationService().showAlert(res['MESSAGE.ERROR'], value.error, NotificationTypes.ERROR);
    });
    this.onError(value);
  }

  public onHttp404(value: { error: string }) {
    this.getTranslation(['MESSAGE.ERROR']).subscribe(res => {
      this.getNotificationService().showAlert(res['MESSAGE.ERROR'], value.error, NotificationTypes.ERROR);
    });
    this.onError(value);
  }

  public onHttp413(value: { error: string }) {
    this.getTranslation(['MESSAGE.ERROR']).subscribe(res => {
      this.getNotificationService().showAlert(res['MESSAGE.ERROR'], value.error, NotificationTypes.ERROR);
    });
    this.onError(value);
  }

  public onHttpError(value: string | { error: string }, readable = true) {
    if (readable) {
      this.getTranslation(['MESSAGE.ERROR']).subscribe(res => {
        (hasOwnProp(value, 'error'))
          ? this.getNotificationService().showAlert(res['MESSAGE.ERROR'], (value as { error: string }).error, NotificationTypes.ERROR)
          : this.getNotificationService().showAlert(res['MESSAGE.ERROR'], value as string, NotificationTypes.ERROR);
      });
    }
    this.onError(value);
  }
}
