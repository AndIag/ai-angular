export interface Action {
  context: any;
  retryFunction: string;
  args: any[];
}

export class DynamicFormAction implements Action {
  public context: any;
  public retryFunction: string;
  public args: any[];

  constructor(context: any, retryFunction: string, ...args) {
    this.context = context;
    this.retryFunction = retryFunction;
    this.args = [].concat(...args);
  }
}
