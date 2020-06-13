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
import {Observable, of} from 'rxjs';


export abstract class BaseHttpHandler implements Http200Callback, Http201Callback, HttpSuccessCallback,
  Http400Callback, Http402Callback, Http403Callback, Http404Callback, Http413Callback,
  HttpErrorCallback<AIErrorList | AIErrorMap> {

  protected abstract translations(): AITranslationService | undefined;

  protected abstract notifications(): AINotificationsService;

  protected onSuccess(): void {
  }

  protected onError(error?: string | AIError | AIErrorList | AIErrorMap): void {
  }

  protected getErrorMessageKey(): string {
    return (!!this.translations()) ? 'MESSAGE.ERROR' : 'ERROR';
  }


  public onHttp200(title: string, message: string): void {
    this.notifications().clear();
    this._getTranslation([title, message]).subscribe(res => {
      this.notifications().showAlert(res[title], res[message], NotificationTypes.SUCCESS);
    });
    this.onSuccess();
  }

  public onHttp201(title: string, message: string): void {
    this.notifications().clear();
    this._getTranslation([title, message]).subscribe(res => {
      this.notifications().showAlert(res[title], res[message], NotificationTypes.SUCCESS);
    });
    this.onSuccess();
  }

  public onHttpSuccess(title: string, message: string): void {
    this.notifications().clear();
    this._getTranslation([title, message]).subscribe(res => {
      this.notifications().showAlert(res[title], res[message], NotificationTypes.SUCCESS);
    });
    this.onSuccess();
  }

  public onHttp400(value: string | AIError | AIErrorList | AIErrorMap | AIErrorListWithData<any>): void {
    if (hasOwnProp(value, 'data')) {
      console.log('Not implemented \'data\' handling for 400');
    }

    this.notifications().clear();
    this._getTranslation([this.getErrorMessageKey()]).subscribe(res => {
      this._showError(res, value);
    });
    this.onError(value);
  }

  public onHttp401(value: AIErrorWithDescription) {
    this.notifications().clear();
    this._getTranslation([this.getErrorMessageKey()]).subscribe(res => {
      this.notifications().showAlert(res[this.getErrorMessageKey()], value.error_description, NotificationTypes.ERROR);
    });
    this.onError(value);
  }

  public onHttp402(value: AIError | AIErrorListWithData<any>): void {
    console.log('Not implemented 402');
    this.onError();
  }

  public onHttp403(value: { error: string }) {
    this.notifications().clear();
    this._getTranslation([this.getErrorMessageKey()]).subscribe(res => {
      this.notifications().showAlert(res[this.getErrorMessageKey()], value.error, NotificationTypes.ERROR);
    });
    this.onError(value);
  }

  public onHttp404(value: AIError) {
    this.notifications().clear();
    this._getTranslation([this.getErrorMessageKey()]).subscribe(res => {
      this.notifications().showAlert(res[this.getErrorMessageKey()], value.error, NotificationTypes.ERROR);
    });
    this.onError(value);
  }

  public onHttp413(value: AIError) {
    this.notifications().clear();
    this._getTranslation([this.getErrorMessageKey()]).subscribe(res => {
      this.notifications().showAlert(res[this.getErrorMessageKey()], value.error, NotificationTypes.ERROR);
    });
    this.onError(value);
  }

  public onHttpError(value: string | AIError | AIErrorList | AIErrorMap, readable = true) {
    if (readable) {
      this.notifications().clear();
      this._getTranslation([this.getErrorMessageKey()]).subscribe(res => {
        this._showError(res, value);
      });
    }
    this.onError(value);
  }

  private _showError(res: { [name: string]: string }, value: string | AIError | AIErrorList | AIErrorMap) {
    if (value) {
      if (typeof value === 'string') {
        // Error is a simple string
        this.notifications().showAlert(res[this.getErrorMessageKey()], value as string, NotificationTypes.ERROR);
      } else if (hasOwnProp(value, 'error')) {
        // Error is an object containing an error or a list of errors
        if (Array.isArray((value as { error: string[] | string }).error)) {
          this.notifications().showAlerts(value as { error: string[] }, NotificationTypes.ERROR);
        } else {
          this.notifications().showAlert(res[this.getErrorMessageKey()], (value as { error: string }).error, NotificationTypes.ERROR);
        }
      } else if (hasOwnProp(value, 'detail')) {
        // Error is an object containing an error or a list of errors
        if (Array.isArray((value as { detail: string[] | string }).detail)) {
          this.notifications().showAlerts(value as { error: string[] }, NotificationTypes.ERROR);
        } else {
          this.notifications().showAlert(res[this.getErrorMessageKey()], (value as { detail: string }).detail, NotificationTypes.ERROR);
        }
      } else {
        // Error is an object containing named errors
        const mapValue: { [key: string]: string[] | string } = value as { [key: string]: string[] | string };
        Object.keys(mapValue).forEach(
          key => {
            if (Array.isArray(mapValue[key])) {
              this.notifications().showAlerts(mapValue as { [key: string]: string[] }, NotificationTypes.ERROR);
            } else {
              this.notifications().showAlert(res[this.getErrorMessageKey()], mapValue[key] as string, NotificationTypes.ERROR);
            }
          }
        );
      }
    }
  }

  private _getTranslation(messages: string[]): Observable<{ [name: string]: string }> {
    if (!!this.translations()) {
      return this.translations()!.get(messages);
    } else {
      return of(messages.reduce((dict, message: string) => Object.assign(dict, {[message]: message}), {}));
    }
  }

}
