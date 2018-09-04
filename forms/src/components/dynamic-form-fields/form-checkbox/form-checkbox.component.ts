import {Component} from '@angular/core';
import {AbstractControl, FormGroup} from '@angular/forms';
import {Field, FieldConfig} from '../../../models/form-field';


@Component({
  selector: 'form-checkbox',
  templateUrl: './form-checkbox.component.html',
  styleUrls: ['./form-checkbox.component.scss']
})
export class FormCheckboxComponent implements Field {
  public config: FieldConfig;
  public group: FormGroup;
  public control: AbstractControl;

  /**
   * Required logic to set a unique name to each FormCheckbox instance.
   */
  private name = null;
  public random = () => {
    if (!this.name) {
      this.name = Math.random().toString(36).substr(2, 5);
    }
    return this.name;
  };

  public required = () => this.control && this.control.errors && this.control.errors.hasOwnProperty('required');

  public onChange() {
    const action = this.config.action;
    if (action != null) {
      action.context[action.retryFunction].apply(action.context, action.args);
    }
  }
}
