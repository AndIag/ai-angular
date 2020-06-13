import {Observable} from 'rxjs/internal/Observable';

export abstract class AITranslationService {
  public abstract get(key: string | string[]): Observable<{ [name: string]: string }>;
}
