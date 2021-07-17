import {Component, TemplateRef} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Field, FieldConfig} from '../../../models/form-field';

@Component({
  selector: 'form-template',
  templateUrl: './form-template.component.html',
  styleUrls: ['./form-template.component.scss'],
})
export class FormTemplateComponent implements Field {
  config!: FieldConfig;
  group!: FormGroup;

  template = (): TemplateRef<any> | null => this.config && this.config!.extra && this.config!.extra!.template?.template || null;
}
