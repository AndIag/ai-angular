import {hasOwnProp} from '../polyfills';
import {Http200Callback} from '../callbacks/http200.callback';
import {Http201Callback} from '../callbacks/http201.callback';
import {HttpSuccessCallback} from '../callbacks/http-success.callback';
import {Http400Callback} from '../callbacks/http400.callback';
import {Http402Callback} from '../callbacks/http402.callback';
import {Http403Callback} from '../callbacks/http403.callback';
import {Http404Callback} from '../callbacks/http404.callback';
import {Http413Callback} from '../callbacks/http413.callback';
import {HttpErrorCallback} from '../callbacks/http-error.callback';
import {AINotificationsService, NotificationTypes} from '../utils/notification.interface';
import {AITranslationService} from '../utils/translation.interface';


export abstract class BaseHttpHandler implements Http200Callback, Http201Callback, HttpSuccessCallback,
  Http400Callback, Http402Callback<any>, Http403Callback, Http404Callback, Http413Callback, HttpErrorCallback<any> {

  protected abstract translations(): AITranslationService;

  protected abstract notifications(): AINotificationsService;

  protected onSuccess(): void {
  }

  protected onError(error?: string | { error: string[] | string } | { [key: string]: string }): void {
  }


  public onHttp200(title: string, message: string, interpolateParams?: Object): void {
    this.translations().get([title, message], interpolateParams).subscribe(res => {
      this.notifications().clear();
      this.notifications().showAlert(res[title], res[message], NotificationTypes.SUCCESS);
    });
    this.onSuccess();
  }

  public onHttp201(title: string, message: string, interpolateParams?: Object): void {
    this.translations().get([title, message], interpolateParams).subscribe(res => {
      this.notifications().clear();
      this.notifications().showAlert(res[title], res[message], NotificationTypes.SUCCESS);
    });
    this.onSuccess();
  }

  public onHttpSuccess(title: string, message: string, interpolateParams?: Object): void {
    this.translations().get([title, message], interpolateParams).subscribe(res => {
      this.notifications().clear();
      this.notifications().showAlert(res[title], res[message], NotificationTypes.SUCCESS);
    });
    this.onSuccess();
  }

  public onHttp400(value: string | { error: string[] | string } | { [key: string]: string }): void {
    this.translations().get(['MESSAGE.ERROR']).subscribe(res => {
      this.notifications().clear();
      this._showError(res, value);
    });
    this.onError(value);
  }

  public onHttp402(value: { errors: string[]; data?: any }): void {
    this.onError();
  }

  public onHttp403(value: { error: string }) {
    this.translations().get(['MESSAGE.ERROR']).subscribe(res => {
      this.notifications().clear();
      this.notifications().showAlert(res['MESSAGE.ERROR'], value.error, NotificationTypes.ERROR);
    });
    this.onError(value);
  }

  public onHttp404(value: { error: string }) {
    this.translations().get(['MESSAGE.ERROR']).subscribe(res => {
      this.notifications().clear();
      this.notifications().showAlert(res['MESSAGE.ERROR'], value.error, NotificationTypes.ERROR);
    });
    this.onError(value);
  }

  public onHttp413(value: { error: string }) {
    this.translations().get(['MESSAGE.ERROR']).subscribe(res => {
      this.notifications().clear();
      this.notifications().showAlert(res['MESSAGE.ERROR'], value.error, NotificationTypes.ERROR);
    });
    this.onError(value);
  }

  public onHttpError(value: string | { error: string[] | string } | { [key: string]: string }, readable = true) {
    if (readable) {
      this.translations().get(['MESSAGE.ERROR']).subscribe(res => {
        this.notifications().clear();
        this._showError(res, value);
      });
    }
    this.onError(value);
  }

  private _showError(res: { [name: string]: string }, value: string | { error: string[] | string } | { [key: string]: string }) {
    if (value) {
      if (typeof value === 'string') {
        // Error is a simple string
        this.notifications().showAlert(res['MESSAGE.ERROR'], value as string, NotificationTypes.ERROR);
      } else if (hasOwnProp(value, 'error')) {
        // Error is an object containing an error or a list of errors
        if (Array.isArray((value as { error: string[] | string }).error)) {
          this.notifications().showAlerts(value as { error: string[] }, NotificationTypes.ERROR);
        } else {
          this.notifications().showAlert(res['MESSAGE.ERROR'], (value as { error: string }).error, NotificationTypes.ERROR);
        }
      } else {
        // Error is an object containing named errors
        Object.keys(value as { [key: string]: string[] | string }).forEach(
          key => {
            if (Array.isArray(value[key])) {
              this.notifications().showAlerts(value as { [key: string]: string[] }, NotificationTypes.ERROR);
            } else {
              this.notifications().showAlert(res['MESSAGE.ERROR'], value[key], NotificationTypes.ERROR);
            }
          }
        );
      }
    }
  }

}
