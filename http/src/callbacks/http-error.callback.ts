import {AIError} from '../core/http.types';

export interface HttpErrorCallback<T> {
    onHttpError(value: T | AIError | string): void;
}
