import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {TitleViewComponent} from './src/title-view/title-view.component';
import {EmptyViewComponent} from './src/empty-view/empty-view.component';
import {UnavailableComponent} from './src/unavailable/unavailable.component';
import {TooltipModule} from 'ngx-bootstrap/tooltip';

/*
 * Public API Surface of lib
 */

export * from './src/empty-view/empty-view.component';

export * from './src/title-view/title-view.component';
export * from './src/title-view/title-position.enum';

export * from './src/unavailable/unavailable.component';
export * from './src/unavailable/unavailable.config';

const components = [
  TitleViewComponent,
  EmptyViewComponent,
  UnavailableComponent,
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    TooltipModule.forRoot(),
  ],
  declarations: [
    ...components,
  ],
  exports: [
    ...components,
  ],
  entryComponents: [
    ...components,
  ],
})
export class ViewsModule {
}
