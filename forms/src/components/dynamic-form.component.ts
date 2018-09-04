import {AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {FieldConfig} from '../models/form-field';
import {Observable} from 'rxjs';

@Component({
  selector: 'dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnChanges, OnInit, AfterViewInit {

  @Input() public config: FieldConfig[] = [];
  @Input() public debug = false;

  @Output() public onSubmitted: EventEmitter<any> = new EventEmitter<any>();
  @Output() public onChanges: EventEmitter<any> = new EventEmitter<any>();

  public form: FormGroup;

  get controls(): FieldConfig[] {
    return this.config.filter(({type}) => type !== 'button');
  }

  get changes(): Observable<any> {
    return this.form.valueChanges;
  }

  get valid(): boolean {
    return this.form.valid;
  }

  get value() {
    return this.form.value;
  }

  constructor(private fb: FormBuilder) {
  }

  public ngOnInit() {
    this.form = this.createGroup();
  }

  public ngOnChanges() {
    if (this.form) {
      const controls = Object.keys(this.form.controls);
      const configControls = this.controls.map((item: FieldConfig) => item.name);

      controls
        .filter((control) => !configControls.includes(control))
        .forEach((control) => this.form.removeControl(control));

      configControls
        .filter((control) => !controls.includes(control))
        .forEach((name) => {
          const config = this.config.find((control) => control.name === name);
          this.form.addControl(name, this.createControl(config));
        });

    }
  }

  public ngAfterViewInit() {
    this.changes.subscribe(() => {
      this.setDisabled('submit', !this.form.valid);
    });
  }

  public createGroup(): FormGroup {
    const group = this.fb.group({});
    this.controls.forEach((control: FieldConfig) => group.addControl(control.name, this.createControl(control)));
    return group;
  }

  public createControl(config: FieldConfig): FormControl {
    const {disabled, validation, value} = config;
    return this.fb.control({disabled, value}, validation);
  }

  public handleSubmit(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    if (this.form.valid) {
      this.onSubmitted.emit(this.value);
    }
  }

  public setDisabled(name: string, disable: boolean) {
    if (this.form.controls[name]) {
      const method = disable ? 'disable' : 'enable';
      this.form.controls[name][method]();
      return;
    }

    this.config = this.config.map((item) => {
      if (item.name === name) {
        item.disabled = disable;
      }
      return item;
    });
  }

  public reset() {
    this.form.reset();
  }

}
