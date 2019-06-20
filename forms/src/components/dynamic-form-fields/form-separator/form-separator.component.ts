import {Component} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Field, FieldConfig} from '../../../models/form-field';

@Component({
  selector: 'form-separator',
  templateUrl: './form-separator.component.html',
  styleUrls: ['./form-separator.component.scss'],
})
export class FormSeparatorComponent implements Field {
  config: FieldConfig | undefined;
  group: FormGroup | undefined;
}
