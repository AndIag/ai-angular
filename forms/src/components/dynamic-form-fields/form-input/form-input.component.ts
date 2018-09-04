import {Component} from '@angular/core';
import {AbstractControl, FormGroup} from '@angular/forms';
import {Field, FieldConfig} from '../../../models/form-field';

@Component({
  selector: 'form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.scss']
})
export class FormInputComponent implements Field {
  public config: FieldConfig;
  public group: FormGroup;
  public control: AbstractControl;

  public required = () => this.control && this.control.errors && this.control.errors.hasOwnProperty('required');

  public onClickAction() {
    const action = this.config.action;
    if (action != null) {
      action.context[action.retryFunction].apply(action.context, action.args);
    }
  }

}
