import {Component} from '@angular/core';
import {AbstractControl, FormGroup} from '@angular/forms';
import {BaseField, FieldConfig} from '../../../models/form-field';

@Component({
  selector: 'form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.scss'],
})
export class FormInputComponent extends BaseField {
  config?: FieldConfig;
  group?: FormGroup;
  control?: AbstractControl;

  required = () => this.control && this.control!.errors && this.control!.errors.hasOwnProperty('required');

  onClickAction() {
    const action = this.config!.action;
    if (action != null) {
      action.context[action.retryFunction].apply(action.context, action.args);
    }
  }

}
