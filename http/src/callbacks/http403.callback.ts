export interface Http403Callback {
    onHttp403(value: { error: string }): void;
}
