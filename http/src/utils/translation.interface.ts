import {Observable} from 'rxjs/internal/Observable';

export abstract class AITranslationService {
  abstract get(key: string | string[], interpolateParams?: {}): Observable<{ [name: string]: string }>;
}
