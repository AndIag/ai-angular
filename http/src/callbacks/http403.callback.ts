import {AIError} from '../core/http.types';

export interface Http403Callback {
  onHttp403(value: AIError): void;
}
