import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap/modal';
import {DynamicFormComponent, FieldConfig} from 'ai-angular/forms';

@Component({
  selector: 'ai-creation-dialog',
  templateUrl: './creation-dialog.component.html',
  styleUrls: ['./creation-dialog.component.scss'],
})
export class CreationDialogComponent<T> {

  @ViewChild('modal') public modal?: ModalDirective;
  @ViewChild('form') public form?: DynamicFormComponent;

  @Input() public title?: string;
  @Input() public dialogSizeClass = 'modal-sm';
  @Input() public config: FieldConfig[] = [];

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
