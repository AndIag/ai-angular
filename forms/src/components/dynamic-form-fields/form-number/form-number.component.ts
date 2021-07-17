import {Component} from '@angular/core';
import {AbstractControl, FormGroup} from '@angular/forms';
import {BaseField, FieldConfig} from '../../../models/form-field';

@Component({
  selector: 'form-number',
  templateUrl: './form-number.component.html',
  styleUrls: ['./form-number.component.scss'],
})
export class FormNumberComponent extends BaseField {
  config!: FieldConfig;
  group!: FormGroup;
  control!: AbstractControl;

  required = () => this.control && this.control!.errors && this.control!.errors.hasOwnProperty('required');
}
