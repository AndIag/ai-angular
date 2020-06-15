import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ISO_8601, Moment} from 'moment';
import {WeekDayAction} from './week-day.action';

// tslint:disable-next-line:no-duplicate-imports
import * as momentNS from 'moment';

const moment = momentNS;

@Component({
  selector: 'ai-week-day-selector',
  templateUrl: './week-day-selector.component.html',
  styleUrls: ['./week-day-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeekDaySelectorComponent implements OnInit {
  readonly WEEK_DAYS = moment.weekdays(true);

  @Input() tag = 'AI-DATE';
  @Input() title?: string;
  @Input() enableCaching = false;
  @Input() enabled: Moment[] = [];
  @Input() actionPrimary?: WeekDayAction;
  @Input() actionSecondary?: WeekDayAction;

  @Output() onChange: EventEmitter<Moment>;
  @Output() onPrimaryAction: EventEmitter<Moment>;
  @Output() onSecondaryAction: EventEmitter<Moment>;

  private currentMoment?: Moment;

  get selectedWeek() {
    return this.currentMoment!.week();
  }

  get startOfWeek(): string {
    return this.currentMoment!.clone().startOf('week').format('L');
  }

  get endOfWeek(): string {
    return this.currentMoment!.clone().endOf('week').format('L');
  }

  showDayActions = (day: string) => (!!this.actionPrimary || !!this.actionSecondary) && this.isDaySelected(day) && this.isDayEnabled(day);
  dayClass = (day: string) => ({
    selected: this.isDaySelected(day),
    disabled: !this.isDayEnabled(day),
    enabled: this.isDayEnabled(day),
  });

  isDaySelected = (day: string) => this.currentMoment!.isSame(this.momentFromDay(day), 'day');
  isDayEnabled = (day: string) => this.enabled.find(d => this.momentFromDay(day).isSame(d, 'day'));

  private momentFromDay = (day: string): Moment => moment().day(day).week(this.selectedWeek).year(this.currentMoment!.year());

  constructor() {
    this.onChange = new EventEmitter<Moment>();
    this.onPrimaryAction = new EventEmitter<Moment>();
    this.onSecondaryAction = new EventEmitter<Moment>();
  }

  ngOnInit() {
    this.currentMoment = this.enableCaching && !!sessionStorage.getItem(this.tag)
      ? moment(sessionStorage.getItem(this.tag)!, ISO_8601)
      : moment(new Date());

    // Emit first Moment
    this.onChange.emit(this.currentMoment!);
  }

  selectDay(day: string) {
    this.currentMoment!.weekday(this.WEEK_DAYS.indexOf(day));

    this.saveCacheIfRequired();
    this.onChange.emit(this.currentMoment!);
  }

  onChangeWeek(week: number) {
    this.currentMoment!.week(week);

    this.saveCacheIfRequired();
    this.onChange.emit(this.currentMoment!);
  }

  incrementWeek() {
    this.currentMoment!.week(this.selectedWeek + 1);

    this.saveCacheIfRequired();
    this.onChange.emit(this.currentMoment!);
  }

  decrementWeek() {
    this.currentMoment!.week(this.selectedWeek - 1);

    this.saveCacheIfRequired();
    this.onChange.emit(this.currentMoment!);
  }

  primaryAction() {
    this.onPrimaryAction.emit(this.currentMoment!);
  }

  secondaryAction() {
    this.onSecondaryAction.emit(this.currentMoment!);
  }

  private saveCacheIfRequired() {
    if (this.enableCaching) {
      sessionStorage.setItem(this.tag, this.currentMoment!.toISOString());
    }
  }

}
