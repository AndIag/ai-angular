import {Component} from '@angular/core';
import {AbstractControl, FormGroup} from '@angular/forms';
import {Field, FieldConfig} from '../../../models/form-field';

@Component({
  selector: 'form-date',
  templateUrl: './form-date.component.html',
  styleUrls: ['./form-date.component.scss']
})
export class FormDateComponent implements Field {
  public readonly DEFAULT_LOCALE = 'en-en';

  public config: FieldConfig;
  public group: FormGroup;
  public control: AbstractControl;

  public locale = (): string => this.config.extra && this.config.extra.locale || this.DEFAULT_LOCALE;
  public required = () => this.control && this.control.errors && this.control.errors.hasOwnProperty('required');
}
