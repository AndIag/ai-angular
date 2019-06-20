import {AIError} from '../core/http.types';

export interface Http413Callback {
  onHttp413(value: AIError): void;
}
