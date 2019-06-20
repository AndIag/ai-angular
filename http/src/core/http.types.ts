export interface AIError {
  error: string;
}

export interface AIErrorList {
  error: string[];
}

export interface AIErrorWithDescription extends AIError {
  error_description: string;
}

export interface AIErrorListWithData<T> extends AIErrorList {
  data: T;
}

export interface AIErrorMap {
  [key: string]: string;
}
