export interface HttpErrorCallback<T> {
    onHttpError(value: T | { error: string } | string): void;
}
