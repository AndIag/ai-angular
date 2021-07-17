import {Component} from '@angular/core';
import {AbstractControl, FormGroup} from '@angular/forms';
import {BaseField, FieldConfig} from '../../../models/form-field';

@Component({
  selector: 'form-textarea',
  templateUrl: './form-textarea.component.html',
  styleUrls: ['./form-textarea.component.scss'],
})
export class FormTextareaComponent extends BaseField {
  config!: FieldConfig;
  group!: FormGroup;
  control!: AbstractControl;

  required = () => this.control && this.control!.errors && this.control!.errors!.hasOwnProperty('required');
}
