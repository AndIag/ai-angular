import {Observable} from 'rxjs/internal/Observable';
import {AINotificationsService, NotificationTypes} from './utils/notification.interface';
import {hasOwnProp} from '../polyfills';

export abstract class BaseHttpHandler {

  protected constructor() {
  }

  protected abstract getNotificationService(): AINotificationsService;

  protected abstract getTranslation(key: string | string[], interpolateParams?: {}): Observable<{ [name: string]: string }>;

  protected onError(error: { error: string } | string) {

  }

  onHttp400(value: { [p: string]: string[] } | { error: string }) {
    this.getTranslation(['MESSAGE.ERROR']).subscribe(res => {
      hasOwnProp(value, 'error')
        ? this.getNotificationService().showAlert(res['MESSAGE.ERROR'], (value as { error: string }).error, NotificationTypes.ERROR)
        : this.getNotificationService().showAlerts(value as { [p: string]: string[] }, NotificationTypes.ERROR);
    });
  }

  onHttp402(value: { errors: string[]; data?: undefined }) {
  }

  onHttp403(value: { error: string }) {
    this.getTranslation(['MESSAGE.ERROR']).subscribe(res => {
      this.getNotificationService().showAlert(res['MESSAGE.ERROR'], value.error, NotificationTypes.ERROR);
    });
    this.onError(value);
  }

  onHttp404(value: { error: string }) {
    this.getTranslation(['MESSAGE.ERROR']).subscribe(res => {
      this.getNotificationService().showAlert(res['MESSAGE.ERROR'], value.error, NotificationTypes.ERROR);
    });
    this.onError(value);
  }

  onHttp413(value: { error: string }) {
    this.getTranslation(['MESSAGE.ERROR']).subscribe(res => {
      this.getNotificationService().showAlert(res['MESSAGE.ERROR'], value.error, NotificationTypes.ERROR);
    });
    this.onError(value);
  }

  onHttpError(value: string | { error: string }, readable = true) {
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
