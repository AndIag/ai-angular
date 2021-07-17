import {Component} from '@angular/core';
import {AbstractControl, FormGroup} from '@angular/forms';
import {BaseField, FieldConfig} from '../../../models/form-field';

@Component({
  selector: 'form-time',
  templateUrl: './form-time.component.html',
  styleUrls: ['./form-time.component.scss'],
})
export class FormTimeComponent extends BaseField {
  config!: FieldConfig;
  group!: FormGroup;
  control!: AbstractControl;
}
