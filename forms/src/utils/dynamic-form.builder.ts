import {ValidatorFn} from '@angular/forms';
import {TemplateRef} from '@angular/core';
import {FieldConfig} from '../models/form-field';
import {DynamicFormAction} from '../models/dynamic-form-action';
import {DurationConfig} from '../models/duration-config';
import {TemplateConfig} from '../models/template-config';
import {ANTISPAM_KEY} from '../components/dynamic-form-fields/form-antispam/form-antispam.component';

export class DynamicFormBuilder {

  private readonly translate: boolean;
  private readonly translations: { [key: string]: string };

  private config: FieldConfig[] = [];

  constructor(translate = false, translations?: { [key: string]: string }) {
    this.translate = translate;
    this.translations = translations;
  }

  public addInput(name: string, placeholder: string, validators?: ValidatorFn[], addon_left?: string,
                  addon_right?: string, action?: DynamicFormAction): DynamicFormBuilder {
    const p = (this.translate) ? this.translations[placeholder] : placeholder;
    this.config.push({
      type: 'input', name: name, placeholder: p, validation: validators, addon_left: addon_left, addon_right: addon_right,
      action: action
    });
    return this;
  }

  public addPassword(name: string, placeholder: string, validators?: ValidatorFn[], addon_left?: string): DynamicFormBuilder {
    const p = (this.translate) ? this.translations[placeholder] : placeholder;
    this.config.push({type: 'password', name: name, placeholder: p, validation: validators, addon_left: addon_left});
    return this;
  }

  public addCheckbox(name: string, label: string, action: DynamicFormAction, value?: boolean): DynamicFormBuilder {
    const l = (this.translate) ? this.translations[label] : label;
    this.config.push({type: 'checkbox', name: name, value: value, label: l, action: action});
    return this;
  }

  public addNumber(name: string, placeholder: string, validators?: ValidatorFn[], disabled?: boolean): DynamicFormBuilder {
    const p = (this.translate) ? this.translations[placeholder] : placeholder;
    this.config.push({
      type: 'number', name: name, placeholder: p, disabled: disabled, validation: validators
    });
    return this;
  }

  public addSelect(name: string, placeholder: string, options: Array<any>, option_key?: string,
                   validators?: ValidatorFn[], disabled?: boolean): DynamicFormBuilder {
    const p = (this.translate) ? this.translations[placeholder] : placeholder;
    this.config.push({
      type: 'select', name: name, options: options, option_key: option_key, placeholder: p,
      validation: validators, disabled: disabled
    });
    return this;
  }

  public addTextarea(name: string, placeholder: string, disabled?: boolean, validators?: ValidatorFn[]): DynamicFormBuilder {
    const p = (this.translate) ? this.translations[placeholder] : placeholder;
    this.config.push({type: 'textarea', name: name, placeholder: p, disabled: disabled, validation: validators});
    return this;
  }

  public addTime(name: string, placeholder: string, validators?: ValidatorFn[], disabled?: boolean): DynamicFormBuilder {
    const p = (this.translate) ? this.translations[placeholder] : placeholder;

    this.config.push({type: 'time', name: name, placeholder: p, disabled: disabled, validation: validators});
    return this;
  }

  public addDate(name: string, placeholder: string, validators?: ValidatorFn[], locale?: string): DynamicFormBuilder {
    const p = (this.translate) ? this.translations[placeholder] : placeholder;

    this.config.push({type: 'date', name: name, placeholder: p, validation: validators, extra: {locale: locale}});
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

  public addSeparator(): DynamicFormBuilder {
    this.config.push({name: null, type: 'separator'});
    return this;
  }

  public addSubmit(label: string): DynamicFormBuilder {
    const l = (this.translate) ? this.translations[label] : label;
    this.config.push({name: 'submit', label: l, type: 'button'});
    return this;
  }

  public addTemplate(template: TemplateRef<any>) {
    this.config.push({name: 'template', type: 'template', extra: {template: new TemplateConfig(template)}});
    return this;
  }

  public addAntiSpam() {
    this.config.push({name: ANTISPAM_KEY, type: 'antispam'});
    return this;
  }

  public build(): FieldConfig[] {
    return this.config;
  }

}
