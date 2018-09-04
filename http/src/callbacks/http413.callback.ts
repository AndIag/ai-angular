export interface Http413Callback {
    onHttp413(value: { error: string }): void;
}
