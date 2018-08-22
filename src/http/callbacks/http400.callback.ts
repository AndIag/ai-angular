export interface Http400Callback {
    onHttp400(value: { [field: string]: string[] } | { error: string }): void;
}
