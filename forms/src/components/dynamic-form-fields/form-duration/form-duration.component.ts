import {AfterViewInit, Component, ElementRef, Input, Renderer2, ViewChild} from '@angular/core';
import {AbstractControl, FormGroup} from '@angular/forms';
import {Field, FieldConfig} from '../../../models/form-field';
import {DurationConfig} from '../../../models/duration-config';

export class Duration {
  public get hours(): number {
    return this._hours;
  }

  public set hours(value: number) {
    this._hours = value % 24;
  }

  public get minutes(): number {
    return this._minutes;
  }

  public set minutes(value: number) {
    this._minutes = value % 60;
  }

  public get seconds(): number {
    return this._seconds;
  }

  public set seconds(value: number) {
    this._seconds = value % 60;
  }

  constructor(public _hours: number = 0, public _minutes: number = 0, public _seconds: number = 0) {

  }
}

// TODO re-implement
@Component({
  selector: 'form-duration',
  templateUrl: './form-duration.component.html',
  styleUrls: ['./form-duration.component.scss']
})
export class FormDurationComponent implements Field, AfterViewInit {
  @ViewChild('hours', {static: true}) public hours: ElementRef;
  @ViewChild('minutes', {static: true}) public minutes: ElementRef;
  @ViewChild('seconds', {static: true}) public seconds: ElementRef;
  @ViewChild('hiddenInput', {static: true}) public hiddenInput: ElementRef;

  @Input() public control: AbstractControl;

  public config: FieldConfig;
  public group: FormGroup;

  public duration: Duration = new Duration();
  private _disabled: boolean; // Avoid constant updates

  public elements = (n: number) => this.config.extra.duration.elements === n;
  public required = () => this.control && this.control.errors && this.control.errors.hasOwnProperty('required');
  public extra = (): DurationConfig => this.config && this.config.extra && this.config.extra.duration;

  constructor(private renderer: Renderer2) {
  }

  public ngAfterViewInit(): void {
    this._disabled = this.hiddenInput.nativeElement.disabled;
    (this._disabled) ? this.disable(true) : this.disable(false);
    this.control.statusChanges.subscribe(
      (value) => {
        const disable = value === 'DISABLED';
        if (this._disabled !== disable) {
          this._disabled = disable;
          (this._disabled) ? this.disable(true) : this.disable(false);
        }
      });
    this.control.valueChanges.subscribe(
      value => {
        if (value === null) {
          this.reset();
        }
      }
    );
  }

  public updateHours() {
    this.duration.hours = Number(this.hours.nativeElement.value);
    this.notifyChanges();
  }

  public updateMinutes() {
    this.duration.minutes = Number(this.minutes.nativeElement.value);
    this.notifyChanges();
  }

  public updateSeconds() {
    this.duration.seconds = Number(this.seconds.nativeElement.value);
    this.notifyChanges();
  }

  private reset() {
    this.duration = new Duration();
    if (this.hours) {
      this.hours.nativeElement.value = null;
    }
    if (this.minutes) {
      this.minutes.nativeElement.value = null;
    }
    if (this.seconds) {
      this.seconds.nativeElement.value = null;
    }
    this.notifyChanges();
  }

  private notifyChanges() {
    if (this.duration.hours > 0 || this.duration.minutes > 0 || this.duration.seconds > 0) {
      this.hiddenInput.nativeElement.value = ('0' + this.duration.hours).slice(-2) + ':'
        + ('0' + this.duration.minutes).slice(-2) + ':' + ('0' + this.duration.seconds).slice(-2);
    } else {
      this.hiddenInput.nativeElement.value = null;
    }
    this.hiddenInput.nativeElement.dispatchEvent(new Event('input'));
  }

  public disable(disable: boolean) {
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
