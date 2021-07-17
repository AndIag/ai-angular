import {Component} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Field, FieldConfig} from '../../../models/form-field';

export const ANTISPAM_KEY = 'antispam';

@Component({
  selector: 'form-antispam',
  templateUrl: './form-antispam.component.html',
  styleUrls: ['./form-antispam.component.scss'],
})
export class FormAntiSpamComponent implements Field {
  config!: FieldConfig;
  group!: FormGroup;
}
