import {AIError} from '../core/http.types';

export interface Http404Callback {
  onHttp404(value: AIError): void;
}
