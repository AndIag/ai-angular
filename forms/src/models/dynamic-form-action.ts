export class DynamicFormAction {
  public context: any;
  public retryFunction: string;
  public args: any[];

  constructor(context: any, retryFunction: string, ...args) {
    this.context = context;
    this.retryFunction = retryFunction;
    this.args = [].concat(...args);
  }
}
