import {Component, Inject, LOCALE_ID} from '@angular/core';
import {AbstractControl, FormGroup} from '@angular/forms';
import {BaseField, FieldConfig} from '../../../models/form-field';
import {BsLocaleService} from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'form-date',
  templateUrl: './form-date.component.html',
  styleUrls: ['./form-date.component.scss'],
})
export class FormDateComponent extends BaseField {
  config?: FieldConfig;
  group?: FormGroup;
  control?: AbstractControl;

  required = () => this.control && this.control!.errors && this.control!.errors.hasOwnProperty('required');

  constructor(@Inject(LOCALE_ID) private locale: string, private localeService: BsLocaleService) {
    super();
    localeService.use(locale);
  }

}
