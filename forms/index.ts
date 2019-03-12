import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {ReactiveFormsModule} from '@angular/forms';
import {AutosizeDirective} from './src/directives/autosize.directive';
import {FormDynamicDirective} from './src/directives/form-dynamic.directive';
import {FormAntiSpamComponent} from './src/components/dynamic-form-fields/form-antispam/form-antispam.component';
import {FormButtonComponent} from './src/components/dynamic-form-fields/form-button/form-button.component';
import {FormInputComponent} from './src/components/dynamic-form-fields/form-input/form-input.component';
import {FormDateComponent} from './src/components/dynamic-form-fields/form-date/form-date.component';
import {FormSelectComponent} from './src/components/dynamic-form-fields/form-select/form-select.component';
import {FormTextareaComponent} from './src/components/dynamic-form-fields/form-textarea/form-textarea.component';
import {FormCheckboxComponent} from './src/components/dynamic-form-fields/form-checkbox/form-checkbox.component';
import {FormTimeComponent} from './src/components/dynamic-form-fields/form-time/form-time.component';
import {FormNumberComponent} from './src/components/dynamic-form-fields/form-number/form-number.component';
import {FormDurationComponent} from './src/components/dynamic-form-fields/form-duration/form-duration.component';
import {FormSeparatorComponent} from './src/components/dynamic-form-fields/form-separator/form-separator.component';
import {FormTemplateComponent} from './src/components/dynamic-form-fields/form-template/form-template.component';
import {FormPasswordComponent} from './src/components/dynamic-form-fields/form-password/form-password.component';
import {DynamicFormComponent} from './src/components/dynamic-form.component';

/*
 * Public API Surface of lib
 */

// Core
export * from './src/utils/dynamic-form.builder';
export * from './src/components/dynamic-form.component';

// Models
export * from './src/models/duration-config';
export * from './src/models/dynamic-form-action';
export * from './src/models/form-field';
export * from './src/models/template-config';

const formComponents = [
  FormAntiSpamComponent,
  FormButtonComponent,
  FormInputComponent,
  FormSelectComponent,
  FormTextareaComponent,
  FormCheckboxComponent,
  FormTimeComponent,
  FormDateComponent,
  FormNumberComponent,
  FormDurationComponent,
  FormSeparatorComponent,
  FormTemplateComponent,
  FormPasswordComponent
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot()
  ],
  declarations: [
    AutosizeDirective,
    FormDynamicDirective,
    DynamicFormComponent,
    ...formComponents
  ],
  exports: [
    DynamicFormComponent,
    AutosizeDirective,
  ],
  entryComponents: [
    ...formComponents
  ]
})
export class DynamicFormsModule {
}
