import {TemplateConfig} from './template-config';
import {AbstractControl, FormGroup, ValidatorFn} from '@angular/forms';
import {DynamicFormAction} from './dynamic-form-action';
import {DurationConfig} from './duration-config';

export interface Field {
  config?: FieldConfig;
  group?: FormGroup;
  /**
   * Used when access to control are required in form-***.component
   */
  control?: AbstractControl;
}

export class BaseField implements Field {
  config?: FieldConfig;
  group?: FormGroup;
  control?: AbstractControl;

  valid(): boolean {
    return !!this.control && this.control.valid && !this.control.pristine;
  }

  invalid(): boolean {
    return !this.control || (this.control.invalid && !this.control.pristine);
  }
}

export interface FieldExtraConfig {
  duration?: DurationConfig;
  template?: TemplateConfig;
  locale?: string;
}

// tslint:disable:no-any
export interface FieldConfig {
  disabled?: boolean;
  label?: string;
  name: string;
  options?: any[];
  option_key?: string;
  placeholder?: string;
  type: string;
  validation?: ValidatorFn[];
  value?: any;
  addon_left?: string;
  addon_right?: string;
  action?: DynamicFormAction;
  extra?: FieldExtraConfig;
}
