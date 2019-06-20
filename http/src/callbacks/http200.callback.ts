export interface Http200Callback {
  onHttp200(title: string, message: string, interpolateParams?: {}): void;
}
