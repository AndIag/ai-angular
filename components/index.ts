import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {TooltipModule} from 'ngx-bootstrap/tooltip';
import {ModalModule} from 'ngx-bootstrap/modal';
import {WeekDaySelectorComponent} from './src/week-day-selector/week-day-selector.component';
import {NavbarComponent} from './src/navbar/navbar.component';
import {CreationDialogComponent} from './src/creation-dialog/creation-dialog.component';
import {ViewsModule} from 'ai-angular/views';
import {DynamicFormsModule} from 'ai-angular/forms';

/*
 * Public API Surface of lib
 */

export * from './src/week-day-selector/week-day-selector.component';
export * from './src/week-day-selector/week-day.action';

export * from './src/navbar/navbar.component';
export * from './src/navbar/navbar.metadata';

export * from './src/creation-dialog/creation-dialog.component';

const components = [
  WeekDaySelectorComponent,
  NavbarComponent,
  CreationDialogComponent,
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    DynamicFormsModule,
    ViewsModule,
  ],
  declarations: [
    ...components,
  ],
  exports: [
    ...components,
    TooltipModule,
    ModalModule,
    DynamicFormsModule,
    ViewsModule,
  ],
  entryComponents: [
    ...components,
  ],
})
export class ComponentsModule {
}
