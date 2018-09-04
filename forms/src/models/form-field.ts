import {DurationConfig} from './duration-config';
import {TemplateConfig} from './template-config';
import {AbstractControl, FormGroup, ValidatorFn} from '@angular/forms';
import {DynamicFormAction} from './dynamic-form-action';

export interface Field {
  config: FieldConfig;
  group: FormGroup;
  /**
   * Used when access to control are required in form-***.component
   */
  control?: AbstractControl;
}

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

export interface FieldExtraConfig {
  duration?: DurationConfig;
  template?: TemplateConfig;
  locale?: string;
}
