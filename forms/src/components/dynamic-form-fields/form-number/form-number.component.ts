import {Component} from '@angular/core';
import {AbstractControl, FormGroup} from '@angular/forms';
import {Field, FieldConfig} from '../../../models/form-field';

@Component({
  selector: 'form-number',
  templateUrl: './form-number.component.html',
  styleUrls: ['./form-number.component.scss'],
})
export class FormNumberComponent implements Field {
  config: FieldConfig | undefined;
  group: FormGroup | undefined;
  control: AbstractControl | undefined;

  required = () => this.control && this.control.errors && this.control.errors.hasOwnProperty('required');
}
