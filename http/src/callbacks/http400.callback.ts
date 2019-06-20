import {AIError, AIErrorList, AIErrorListWithData, AIErrorMap} from '../core/http.types';

export interface Http400Callback {
  onHttp400(value: string | AIError | AIErrorList | AIErrorMap | AIErrorListWithData<any>): void;
}
