import {Observable} from 'rxjs/internal/Observable';

export abstract class AITranslationService {
  public abstract get(key: string | string[], interpolateParams?: Object): Observable<{ [name: string]: string }>;
}
