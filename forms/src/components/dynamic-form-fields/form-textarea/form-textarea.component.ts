import {Component} from '@angular/core';
import {AbstractControl, FormGroup} from '@angular/forms';
import {Field, FieldConfig} from '../../../models/form-field';

@Component({
  selector: 'form-textarea',
  templateUrl: './form-textarea.component.html',
  styleUrls: ['./form-textarea.component.scss']
})
export class FormTextareaComponent implements Field {
  public config: FieldConfig;
  public group: FormGroup;
  public control: AbstractControl;

  public required = () => this.control && this.control.errors && this.control.errors.hasOwnProperty('required');
}
