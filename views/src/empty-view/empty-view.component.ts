import {ChangeDetectionStrategy, Component, Inject, InjectionToken, Input} from '@angular/core';

export const NOT_FOUND_MESSAGE = new InjectionToken<string>('Default \'not found\' message');

@Component({
  selector: 'ai-empty',
  templateUrl: './empty-view.component.html',
  styleUrls: ['./empty-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptyViewComponent {

  @Input() public text: string;
  @Input() public icon = 'error_outline';
  @Input() public class = 'material-icons';
  @Input() public textColor: string = '#E7E7E7';
  @Input() public topSpace?: number = 20;

  get topMargin() {
    return (!!this.topSpace) ? {'margin-top': `${this.topSpace}%`} : {'margin-top': '20%'};
  }

  get textStyle() {
    return {color: this.textColor, opacity: .3};
  }

  constructor(@Inject(NOT_FOUND_MESSAGE) public message: string = 'NOT FOUND') {
    this.text = message;
  }

}
