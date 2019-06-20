import {AIError, AIErrorListWithData} from '../core/http.types';

export interface Http402Callback {
  onHttp402(value: AIError | AIErrorListWithData<any>): void;
}
