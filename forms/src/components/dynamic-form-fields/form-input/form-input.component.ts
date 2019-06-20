import {Component} from '@angular/core';
import {AbstractControl, FormGroup} from '@angular/forms';
import {Field, FieldConfig} from '../../../models/form-field';

@Component({
  selector: 'form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.scss'],
})
export class FormInputComponent implements Field {
  config: FieldConfig | undefined;
  group: FormGroup | undefined;
  control: AbstractControl | undefined;

  required = () => this.control && this.control.errors && this.control.errors.hasOwnProperty('required');

  onClickAction() {
    const action = this.config!.action;
    if (action != null) {
      action.context[action.retryFunction].apply(action.context, action.args);
    }
  }

}
