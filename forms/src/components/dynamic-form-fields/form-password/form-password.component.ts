import {Component} from '@angular/core';
import {AbstractControl, FormGroup} from '@angular/forms';
import {BaseField, FieldConfig} from '../../../models/form-field';

@Component({
  selector: 'form-password',
  templateUrl: './form-password.component.html',
  styleUrls: ['./form-password.component.scss'],
})
export class FormPasswordComponent extends BaseField {
  config!: FieldConfig;
  group!: FormGroup;
  control!: AbstractControl;

  required = () => this.control && this.control!.errors && this.control!.errors.hasOwnProperty('required');
}
