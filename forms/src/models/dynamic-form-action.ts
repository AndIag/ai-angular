/* tslint:disable:no-any */

export interface Action {
  context: any;
  retryFunction: string;
  args: any[];
}

export class DynamicFormAction implements Action {
  context: any;
  retryFunction: string;
  args: any[];

  constructor(context: any, retryFunction: string, ...args: any[]) {
    this.context = context;
    this.retryFunction = retryFunction;
    this.args = [].concat(...args);
  }
}
