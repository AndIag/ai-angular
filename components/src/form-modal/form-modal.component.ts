import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap/modal';
import {DynamicFormComponent, FieldConfig} from 'ai-angular/forms';

@Component({
  selector: 'ai-form-modal',
  templateUrl: './form-modal.component.html',
  styleUrls: ['./form-modal.component.scss'],
})
export class FormModalComponent<T> {

  @ViewChild('modal') public modal?: ModalDirective;
  @ViewChild('form') public form?: DynamicFormComponent;

  @Input() public title?: string;
  @Input() public dialogSizeClass = 'modal-sm';
  @Input() public config: FieldConfig[] = [];
  @Input() debug = false;

  @Output() public onSubmitted: EventEmitter<T>;
  @Output() public onDismissed: EventEmitter<boolean>;

  constructor() {
    this.onSubmitted = new EventEmitter<any>();
    this.onDismissed = new EventEmitter<boolean>();
  }

  public show() {
    this.form!.reset();
    this.modal!.show();
  }

  public confirm($event: T) {
    this.onSubmitted.emit($event);
    this.close();
  }

  public dismiss() {
    this.onDismissed.emit(true);
    this.close();
  }

  public close() {
    this.modal!.hide();
  }

}
