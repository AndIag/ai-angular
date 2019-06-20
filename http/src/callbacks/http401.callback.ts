import {AIErrorWithDescription} from '../core/http.types';

export interface Http401Callback {
  onHttp401(value: AIErrorWithDescription): void;
}
