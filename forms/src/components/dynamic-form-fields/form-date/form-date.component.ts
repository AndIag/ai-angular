import {Component, Inject, LOCALE_ID} from '@angular/core';
import {AbstractControl, FormGroup} from '@angular/forms';
import {Field, FieldConfig} from '../../../models/form-field';

@Component({
  selector: 'form-date',
  templateUrl: './form-date.component.html',
  styleUrls: ['./form-date.component.scss']
})
export class FormDateComponent implements Field {
  public config: FieldConfig;
  public group: FormGroup;
  public control: AbstractControl;

  public required = () => this.control && this.control.errors && this.control.errors.hasOwnProperty('required');

  constructor(@Inject(LOCALE_ID) public locale: string) {
  }

}
