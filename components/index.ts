import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {TooltipModule} from 'ngx-bootstrap/tooltip';
import {WeekDaySelectorComponent} from './src/week-day-selector/week-day-selector.component';
import {NavbarComponent} from './src/navbar/navbar.component';
import {ViewsModule} from 'ai-angular/views';

/*
 * Public API Surface of lib
 */

export * from './src/week-day-selector/week-day-selector.component';
export * from './src/week-day-selector/week-day.action';

export * from './src/navbar/navbar.component';
export * from './src/navbar/navbar.metadata';

const components = [
  WeekDaySelectorComponent,
  NavbarComponent,
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TooltipModule.forRoot(),
    ViewsModule,
  ],
  declarations: [
    ...components,
  ],
  exports: [
    ...components,
    ViewsModule,
  ],
  entryComponents: [
    ...components,
  ],
})
export class ComponentsModule {
}
