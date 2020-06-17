import {AfterViewInit, Component, ElementRef, Input, Renderer2, ViewChild} from '@angular/core';
import {AbstractControl, FormGroup} from '@angular/forms';
import {BaseField, FieldConfig} from '../../../models/form-field';
import {DurationConfig} from '../../../models/duration-config';

export class Duration {
  get hours(): number {
    return this._hours;
  }

  set hours(value: number) {
    this._hours = value % 24;
  }

  get minutes(): number {
    return this._minutes;
  }

  set minutes(value: number) {
    this._minutes = value % 60;
  }

  get seconds(): number {
    return this._seconds;
  }

  set seconds(value: number) {
    this._seconds = value % 60;
  }

  constructor(public _hours = 0, public _minutes = 0, public _seconds = 0) {

  }
}

// TODO re-implement
@Component({
  selector: 'form-duration',
  templateUrl: './form-duration.component.html',
  styleUrls: ['./form-duration.component.scss'],
})
export class FormDurationComponent extends BaseField implements AfterViewInit {
  @ViewChild('hours', {static: true}) hours?: ElementRef;
  @ViewChild('minutes', {static: true}) minutes?: ElementRef;
  @ViewChild('seconds', {static: true}) seconds?: ElementRef;
  @ViewChild('hiddenInput', {static: true}) hiddenInput?: ElementRef;

  @Input() control?: AbstractControl;

  config?: FieldConfig;
  group?: FormGroup;

  duration: Duration = new Duration();
  private _disabled = false; // Avoid constant updates

  extra = (): DurationConfig | undefined => this.config && this.config!.extra && this.config!.extra!.duration;
  required = () => this.control && this.control!.errors && this.control!.errors.hasOwnProperty('required');
  elements = (n: number) => this.extra() && this.extra()!.elements === n;

  constructor(private renderer: Renderer2) {
    super();
  }

  ngAfterViewInit(): void {
    this._disabled = this.hiddenInput!.nativeElement.disabled || false;
    (this._disabled) ? this.disable(true) : this.disable(false);
    this.control!.statusChanges.subscribe(
      (value) => {
        const disable = value === 'DISABLED';
        if (this._disabled !== disable) {
          this._disabled = disable;
          (this._disabled) ? this.disable(true) : this.disable(false);
        }
      });
    this.control!.valueChanges.subscribe(
      value => {
        if (value === null) {
          this.reset();
        }
      },
    );
  }

  updateHours() {
    this.duration.hours = Number(this.hours!.nativeElement.value!);
    this.notifyChanges();
  }

  updateMinutes() {
    this.duration.minutes = Number(this.minutes!.nativeElement.value!);
    this.notifyChanges();
  }

  updateSeconds() {
    this.duration.seconds = Number(this.seconds!.nativeElement.value!);
    this.notifyChanges();
  }

  private reset() {
    this.duration = new Duration();
    if (this.hours) {
      this.hours!.nativeElement.value = null;
    }
    if (this.minutes) {
      this.minutes!.nativeElement.value = null;
    }
    if (this.seconds) {
      this.seconds!.nativeElement.value = null;
    }
    this.notifyChanges();
  }

  private notifyChanges() {
    if (this.duration.hours > 0 || this.duration.minutes > 0 || this.duration.seconds > 0) {
      const hours = `0${this.duration.hours}`.slice(-2);
      const minutes = `0${this.duration.minutes}`.slice(-2);
      const seconds = `0${this.duration.seconds}`.slice(-2);
      this.hiddenInput!.nativeElement.value = `${hours}:${minutes}:${seconds}`;
    } else {
      this.hiddenInput!.nativeElement.value = null;
    }
    this.hiddenInput!.nativeElement.dispatchEvent(new Event('input'));
  }

  disable(disable: boolean) {
    if (this.hours) {
      (disable) ? this.renderer.setAttribute(this.hours.nativeElement, 'disabled', 'true')
        : this.renderer.removeAttribute(this.hours.nativeElement, 'disabled');
    }
    if (this.minutes) {
      (disable) ? this.renderer.setAttribute(this.minutes.nativeElement, 'disabled', 'true')
        : this.renderer.removeAttribute(this.minutes.nativeElement, 'disabled');
    }
    if (this.seconds) {
      (disable) ? this.renderer.setAttribute(this.seconds.nativeElement, 'disabled', 'true')
        : this.renderer.removeAttribute(this.seconds.nativeElement, 'disabled');
    }
  }

}
