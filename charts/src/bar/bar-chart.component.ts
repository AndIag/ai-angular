import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {BarChartValue} from './bar-chart-value';

@Component({
  selector: 'ai-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BarChartComponent<X, Y> {

  @Input() title?: string;
  @Input() xAxisLabel?: ((...args: any[]) => string) | string;
  @Input() yAxisLabel?: ((...args: any[]) => string) | string;
  @Input() data: BarChartValue<X, Y>[] = [];
  @Input() xFormat?: (val: X) => string;
  @Input() yFormat?: (val: Y) => string;

  public colors = {domain: ['#234d6d', '#3BDAE2']};

  constructor() {
  }

}
