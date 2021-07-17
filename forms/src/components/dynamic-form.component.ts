import {AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {FieldConfig} from '../models/form-field';
import {Observable} from 'rxjs';

/* tslint:disable:no-any */
@Component({
  selector: 'dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
})
export class DynamicFormComponent implements OnChanges, OnInit, AfterViewInit {

  @Input() config: FieldConfig[] = [];
  @Input() debug = false;

  @Output() onSubmitted: EventEmitter<any>;
  @Output() onChanges: EventEmitter<any>;

  form!: FormGroup;

  get controls(): FieldConfig[] {
    return this.config.filter(({type}) => type !== 'button' && type !== 'separator');
  }

  get changes(): Observable<any> {
    return this.form!.valueChanges;
  }

  get valid(): boolean {
    return this.form && this.form!.valid || this.form?.pristine || this.form!.untouched || false;
  }

  get value() {
    return this.form && this.form!.value;
  }

  constructor(private fb: FormBuilder) {
    this.onSubmitted = new EventEmitter();
    this.onChanges = new EventEmitter();
  }

  ngOnInit() {
    this.form = this.createGroup();
    this.form.valueChanges.subscribe(x => this.onChanges.emit(x));
  }

  ngOnChanges() {
    if (this.form) {
      const controls = Object.keys(this.form.controls);
      const configControls = this.controls.map((item: FieldConfig) => item.name);

      controls
        .filter((control) => !configControls.includes(control))
        .forEach((control) => this.form!.removeControl(control));

      configControls
        .filter((control) => !controls.includes(control))
        .forEach((name) => {
          const config = this.config.find((control) => control.name === name);
          this.form!.addControl(name, this.createControl(config!));
        });

    }
  }

  ngAfterViewInit() {
    this.changes!.subscribe(() => {
      this.setDisabled('submit', !this.form!.valid);
    });
  }

  createGroup(): FormGroup {
    const group = this.fb.group({});
    this.controls.forEach((control: FieldConfig) => group.addControl(control.name, this.createControl(control)));
    return group;
  }

  createControl(config: FieldConfig): FormControl {
    const {disabled, validation, value} = config;
    return this.fb.control({value, disabled}, validation);
  }

  handleSubmit(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    if (this.form!.valid) {
      this.onSubmitted.emit(this.value);
    }
  }

  patchValue(name: string, value: any, options?: {}) {
    if (this.form!.controls[name]) {
      this.form!.controls[name].patchValue(value, options);
      this.config = this.config.map((item) => {
        if (item.name === name) {
          item.value = value;
        }
        return item;
      });
    }
  }

  setDisabled(name: string, disable: boolean) {
    if (this.form!.controls[name]) {
      const method = disable ? 'disable' : 'enable';
      this.form!.controls[name][method]();
      return;
    }

    this.config = this.config.map((item) => {
      if (item.name === name) {
        item.disabled = disable;
      }
      return item;
    });
  }

  reset() {
    const rvalue = this.config.filter((x: FieldConfig) => x.type === 'checkbox').reduce(
      (acc: { [key: string]: any }, item) => {
        acc[item.name] = item.value || false;
        return acc;
      }, {});
    this.form!.reset(rvalue);
  }

}
