export interface Http402Callback<T> {
    onHttp402(value: { errors: string[], data?: T }): void;
}
