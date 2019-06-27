import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {AbstractControl, FormGroup} from '@angular/forms';
import {Field, FieldConfig} from '../../../models/form-field';

@Component({
  selector: 'form-select',
  templateUrl: './form-select.component.html',
  styleUrls: ['./form-select.component.scss'],
})
export class FormSelectComponent implements Field, AfterViewInit {
  @ViewChild('select', {static: true}) select?: ElementRef;

  config?: FieldConfig;
  group?: FormGroup;
  control?: AbstractControl;

  ngAfterViewInit(): void {
    /**
     * On form reset set placeholder as value
     */
    this.control!.valueChanges.subscribe(
      (value) => {
        if (value === null) {
          this.select!.nativeElement.options.selectedIndex = 0;
        }
      }
    );
  }
}
