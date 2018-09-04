import {Component} from '@angular/core';
import {AbstractControl, FormGroup} from '@angular/forms';
import {Field, FieldConfig} from '../../../models/form-field';

@Component({
  selector: 'form-password',
  templateUrl: './form-password.component.html',
  styleUrls: ['./form-password.component.scss']
})
export class FormPasswordComponent implements Field {
  public config: FieldConfig;
  public group: FormGroup;
  public control: AbstractControl;

  public required = () => this.control && this.control.errors && this.control.errors.hasOwnProperty('required');
}
