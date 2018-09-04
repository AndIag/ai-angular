export interface Http404Callback {
    onHttp404(value: { error: string }): void;
}
