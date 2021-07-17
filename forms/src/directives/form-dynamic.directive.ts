import {ComponentFactoryResolver, ComponentRef, Directive, Input, OnChanges, OnInit, Type, ViewContainerRef} from '@angular/core';
import {AbstractControl, FormGroup} from '@angular/forms';
import {Field, FieldConfig} from '../models/form-field';
import {FormButtonComponent} from '../components/dynamic-form-fields/form-button/form-button.component';
import {FormInputComponent} from '../components/dynamic-form-fields/form-input/form-input.component';
import {FormPasswordComponent} from '../components/dynamic-form-fields/form-password/form-password.component';
import {FormSelectComponent} from '../components/dynamic-form-fields/form-select/form-select.component';
import {FormTextareaComponent} from '../components/dynamic-form-fields/form-textarea/form-textarea.component';
import {FormCheckboxComponent} from '../components/dynamic-form-fields/form-checkbox/form-checkbox.component';
import {FormTimeComponent} from '../components/dynamic-form-fields/form-time/form-time.component';
import {FormDateComponent} from '../components/dynamic-form-fields/form-date/form-date.component';
import {FormNumberComponent} from '../components/dynamic-form-fields/form-number/form-number.component';
import {FormTemplateComponent} from '../components/dynamic-form-fields/form-template/form-template.component';
import {FormSeparatorComponent} from '../components/dynamic-form-fields/form-separator/form-separator.component';
import {FormAntiSpamComponent} from '../components/dynamic-form-fields/form-antispam/form-antispam.component';
import {FormDurationComponent} from '../components/dynamic-form-fields/form-duration/form-duration.component';

const components: { [type: string]: Type<Field> } = {
  button: FormButtonComponent,
  input: FormInputComponent,
  password: FormPasswordComponent,
  select: FormSelectComponent,
  textarea: FormTextareaComponent,
  checkbox: FormCheckboxComponent,
  duration: FormDurationComponent,
  time: FormTimeComponent,
  date: FormDateComponent,
  number: FormNumberComponent,
  separator: FormSeparatorComponent,
  template: FormTemplateComponent,
  antispam: FormAntiSpamComponent,
};

@Directive({
  selector: '[formDynamic]',
})
export class FormDynamicDirective implements Field, OnChanges, OnInit {
  @Input() config!: FieldConfig;
  @Input() group!: FormGroup;
  @Input() control!: AbstractControl;

  component?: ComponentRef<Field>;

  constructor(private resolver: ComponentFactoryResolver,
              private container: ViewContainerRef) {
  }

  ngOnChanges() {
    if (this.component) {
      this.component!.instance.config = this.config;
      this.component!.instance.group = this.group;
    }
  }

  ngOnInit() {
    if (!components[this.config!.type]) {
      const supportedTypes = Object.keys(components).join(', ');
      throw new Error(
        `Trying to use an unsupported type (${this.config!.type}).
        Supported types: ${supportedTypes}`,
      );
    }
    const component = this.resolver.resolveComponentFactory<Field>(components[this.config!.type]);
    this.component = this.container.createComponent(component);
    this.component!.instance.config = this.config;
    this.component!.instance.group = this.group;
    this.component!.instance.control = this.control;
  }
}
