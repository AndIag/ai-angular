import {hasOwnProp} from '../polyfills';
import {
  Http200Callback,
  Http201Callback,
  Http400Callback,
  Http402Callback,
  Http403Callback,
  Http404Callback,
  Http413Callback,
  HttpErrorCallback,
  HttpSuccessCallback
} from '../callbacks';
import {AIError, AIErrorList, AIErrorListWithData, AIErrorMap, AIErrorWithDescription} from './http.types';
import {AITranslationService} from '../utils/translation.interface';
import {AINotificationsService, NotificationTypes} from '../utils/notification.interface';


export abstract class BaseHttpHandler implements Http200Callback, Http201Callback, HttpSuccessCallback,
  Http400Callback, Http402Callback, Http403Callback, Http404Callback, Http413Callback,
  HttpErrorCallback<AIErrorList | AIErrorMap> {

  protected abstract translations(): AITranslationService;

  protected abstract notifications(): AINotificationsService;

  protected onSuccess(): void {
  }

  protected onError(error?: string | AIError | AIErrorList | AIErrorMap): void {
  }


  onHttp200(title: string, message: string, interpolateParams?: {}): void {
    this.translations().get([title, message], interpolateParams).subscribe(res => {
      this.notifications().clear();
      this.notifications().showAlert(res[title], res[message], NotificationTypes.SUCCESS);
    });
    this.onSuccess();
  }

  onHttp201(title: string, message: string, interpolateParams?: {}): void {
    this.translations().get([title, message], interpolateParams).subscribe(res => {
      this.notifications().clear();
      this.notifications().showAlert(res[title], res[message], NotificationTypes.SUCCESS);
    });
    this.onSuccess();
  }

  onHttpSuccess(title: string, message: string, interpolateParams?: {}): void {
    this.translations().get([title, message], interpolateParams).subscribe(res => {
      this.notifications().clear();
      this.notifications().showAlert(res[title], res[message], NotificationTypes.SUCCESS);
    });
    this.onSuccess();
  }

  onHttp400(value: string | AIError | AIErrorList | AIErrorMap | AIErrorListWithData<any>): void {
    if (hasOwnProp(value, 'data')) {
      console.log('Not implemented \'data\' handling for 400');
    }

    this.translations().get(['MESSAGE.ERROR']).subscribe(res => {
      this.notifications().clear();
      this._showError(res, value);
    });
    this.onError(value);
  }

  onHttp401(value: AIErrorWithDescription) {
    this.translations().get(['MESSAGE.ERROR']).subscribe(res => {
      this.notifications().clear();
      this.notifications().showAlert(res['MESSAGE.ERROR'], value.error_description, NotificationTypes.ERROR);
    });
    this.onError(value);
  }

  onHttp402(value: AIError | AIErrorListWithData<any>): void {
    console.log('Not implemented 402');
    this.onError();
  }

  onHttp403(value: { error: string }) {
    this.translations().get(['MESSAGE.ERROR']).subscribe(res => {
      this.notifications().clear();
      this.notifications().showAlert(res['MESSAGE.ERROR'], value.error, NotificationTypes.ERROR);
    });
    this.onError(value);
  }

  onHttp404(value: AIError) {
    this.translations().get(['MESSAGE.ERROR']).subscribe(res => {
      this.notifications().clear();
      this.notifications().showAlert(res['MESSAGE.ERROR'], value.error, NotificationTypes.ERROR);
    });
    this.onError(value);
  }

  onHttp413(value: AIError) {
    this.translations().get(['MESSAGE.ERROR']).subscribe(res => {
      this.notifications().clear();
      this.notifications().showAlert(res['MESSAGE.ERROR'], value.error, NotificationTypes.ERROR);
    });
    this.onError(value);
  }

  onHttpError(value: string | AIError | AIErrorList | AIErrorMap, readable = true) {
    if (readable) {
      this.translations().get(['MESSAGE.ERROR']).subscribe(res => {
        this.notifications().clear();
        this._showError(res, value);
      });
    }
    this.onError(value);
  }

  private _showError(res: { [name: string]: string }, value: string | AIError | AIErrorList | AIErrorMap) {
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
        const mapValue: { [key: string]: string[] | string } = value as { [key: string]: string[] | string };
        Object.keys(mapValue).forEach(
          key => {
            if (Array.isArray(mapValue[key])) {
              this.notifications().showAlerts(mapValue as { [key: string]: string[] }, NotificationTypes.ERROR);
            } else {
              this.notifications().showAlert(res['MESSAGE.ERROR'], mapValue[key] as string, NotificationTypes.ERROR);
            }
          }
        );
      }
    }
  }

}
