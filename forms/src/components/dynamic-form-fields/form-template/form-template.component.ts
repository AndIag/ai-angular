import {Component} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Field, FieldConfig} from '../../../models/form-field';
import {TemplateConfig} from '../../../models/template-config';


@Component({
  selector: 'form-template',
  templateUrl: './form-template.component.html',
  styleUrls: ['./form-template.component.scss'],
})
export class FormTemplateComponent implements Field {
  config: FieldConfig | undefined;
  group: FormGroup | undefined;

  template = (): TemplateConfig | undefined => this.config && this.config!.extra && this.config!.extra!.template;
}
