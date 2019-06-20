import {ValidatorFn} from '@angular/forms';
import {TemplateRef} from '@angular/core';
import {TemplateConfig} from '../models/template-config';
import {FieldConfig} from '../models/form-field';
import {DynamicFormAction} from '../models/dynamic-form-action';
import {ANTISPAM_KEY} from '../components/dynamic-form-fields/form-antispam/form-antispam.component';
import {DurationConfig} from '../models/duration-config';

/* tslint:disable:variable-name */
export class DynamicFormBuilder {

  private readonly translate: boolean;
  private readonly translations: { [key: string]: string };

  private config: FieldConfig[] = [];

  constructor(translate = false, translations?: { [key: string]: string }) {
    this.translate = translate;
    this.translations = translations || {};
  }

  addInput(name: string, placeholder: string, validators?: ValidatorFn[], addon_left?: string,
           addon_right?: string, action?: DynamicFormAction): DynamicFormBuilder {
    const p = (this.translate) ? this.translations[placeholder] : placeholder;
    this.config.push({
      type: 'input', name, placeholder: p, validation: validators, addon_left, addon_right,
      action,
    });
    return this;
  }

  addPassword(name: string, placeholder: string, validators?: ValidatorFn[], addon_left?: string): DynamicFormBuilder {
    const p = (this.translate) ? this.translations[placeholder] : placeholder;
    this.config.push({type: 'password', name, placeholder: p, validation: validators, addon_left});
    return this;
  }

  addCheckbox(name: string, label: string, action: DynamicFormAction, value?: boolean): DynamicFormBuilder {
    const l = (this.translate) ? this.translations[label] : label;
    this.config.push({type: 'checkbox', name, value, label: l, action});
    return this;
  }

  addNumber(name: string, placeholder: string, validators?: ValidatorFn[], disabled?: boolean): DynamicFormBuilder {
    const p = (this.translate) ? this.translations[placeholder] : placeholder;
    this.config.push({
      type: 'number', name, placeholder: p, disabled, validation: validators,
    });
    return this;
  }

  addSelect(name: string, placeholder: string, options: any[], option_key?: string,
            validators?: ValidatorFn[], disabled?: boolean): DynamicFormBuilder {
    const p = (this.translate) ? this.translations[placeholder] : placeholder;
    this.config.push({
      type: 'select', name, options, option_key, placeholder: p,
      validation: validators, disabled,
    });
    return this;
  }

  addTextarea(name: string, placeholder: string, disabled?: boolean, validators?: ValidatorFn[]): DynamicFormBuilder {
    const p = (this.translate) ? this.translations[placeholder] : placeholder;
    this.config.push({type: 'textarea', name, placeholder: p, disabled, validation: validators});
    return this;
  }

  addTime(name: string, placeholder: string, validators?: ValidatorFn[], disabled?: boolean): DynamicFormBuilder {
    const p = (this.translate) ? this.translations[placeholder] : placeholder;

    this.config.push({type: 'time', name, placeholder: p, disabled, validation: validators});
    return this;
  }

  addDate(name: string, placeholder: string, validators?: ValidatorFn[], locale?: string): DynamicFormBuilder {
    const p = (this.translate) ? this.translations[placeholder] : placeholder;

    this.config.push({type: 'date', name, placeholder: p, validation: validators, extra: {locale}});
    return this;
  }

  public addDuration(name: string, label?: string, validators?: ValidatorFn[],
                     disabled?: boolean, extra?: DurationConfig): DynamicFormBuilder {
    const l = (this.translate) ? this.translations[label] : label;
    if (extra) {
      extra.seconds = (this.translate) ? this.translations[extra.seconds] : extra.seconds;
      extra.minutes = (this.translate) ? this.translations[extra.minutes] : extra.minutes;
      extra.hours = (this.translate) ? this.translations[extra.hours] : extra.hours;
    }
    this.config.push({type: 'duration', name: name, label: l, disabled: disabled, validation: validators, extra: {duration: extra}});
    return this;
  }

  addSeparator(): DynamicFormBuilder {
    this.config.push({name: '', type: 'separator'});
    return this;
  }

  addSubmit(label: string): DynamicFormBuilder {
    const l = (this.translate) ? this.translations[label] : label;
    this.config.push({name: 'submit', label: l, type: 'button'});
    return this;
  }

  addTemplate(template: TemplateRef<any>) {
    this.config.push({name: 'template', type: 'template', extra: {template: new TemplateConfig(template)}});
    return this;
  }

  addAntiSpam() {
    this.config.push({name: ANTISPAM_KEY, type: 'antispam'});
    return this;
  }

  build(): FieldConfig[] {
    return this.config;
  }

}
