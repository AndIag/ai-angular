import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {TooltipModule} from 'ngx-bootstrap/tooltip';
import {LineChartComponent} from './src/line/line-chart.component';
import {BarChartComponent} from './src/bar/bar-chart.component';
import {NgxChartsModule} from '@swimlane/ngx-charts';

/*
 * Public API Surface of lib
 */

export * from './src/bar/bar-chart-value';
export * from './src/bar/bar-chart.component';

export * from './src/line/line-chart-value';
export * from './src/line/line-chart.component';

const components = [
  BarChartComponent,
  LineChartComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TooltipModule.forRoot(),
    NgxChartsModule,
  ],
  declarations: [
    ...components,
  ],
  exports: [
    ...components,
  ],
  entryComponents: [
    ...components,
  ]
})
export class ChartsModule {
}
