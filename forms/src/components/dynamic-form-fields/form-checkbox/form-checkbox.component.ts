import {Component} from '@angular/core';
import {AbstractControl, FormGroup} from '@angular/forms';
import {Field, FieldConfig} from '../../../models/form-field';

@Component({
  selector: 'form-checkbox',
  templateUrl: './form-checkbox.component.html',
  styleUrls: ['./form-checkbox.component.scss'],
})
export class FormCheckboxComponent implements Field {
  config!: FieldConfig;
  group!: FormGroup;
  control!: AbstractControl;

  /**
   * Required logic to set a unique name to each FormCheckbox instance.
   */
  private name?: string;
  random = () => {
    if (!this.name) {
      this.name = Math.random().toString(36).substr(2, 5);
    }
    return this.name;
  }

  required = () => this.control && this.control.errors && this.control.errors.hasOwnProperty('required');

  onChange() {
    const action = this.config!.action;
    if (action != null) {
      action.context[action.retryFunction].apply(action.context, action.args);
    }
  }
}
