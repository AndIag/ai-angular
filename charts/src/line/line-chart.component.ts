import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {LineChartValue} from './line-chart-value';

@Component({
  selector: 'ai-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LineChartComponent<X, Y> {

  @Input() title?: string;
  @Input() xAxisLabel?: ((...args: any[]) => string) | string;
  @Input() yAxisLabel?: ((...args: any[]) => string) | string;
  @Input() data: LineChartValue<X, Y>[] = [];
  @Input() xFormat?: (val: X) => string;
  @Input() yFormat?: (val: Y) => string;

  public colors = {domain: ['#3BDAE2']};

  constructor() {
  }

}
