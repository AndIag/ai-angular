export interface Http400Callback {
  onHttp400(value: string | { error: string[] | string } | { [key: string]: string }): void;
}
