import {NgModule} from '@angular/core';

/*
 * Public API Surface of lib
 */

// Core
export * from './src/core/http.handler';
export * from './src/utils/url.builder';
export * from './src/core/http.service';

// Callbacks
export * from './src/callbacks/http200.callback';
export * from './src/callbacks/http201.callback';
export * from './src/callbacks/http400.callback';
export * from './src/callbacks/http402.callback';
export * from './src/callbacks/http403.callback';
export * from './src/callbacks/http404.callback';
export * from './src/callbacks/http413.callback';
export * from './src/callbacks/http-success.callback';
export * from './src/callbacks/http-error.callback';

// Interceptors
export * from './src/interceptors/http-error.interceptor';
export * from './src/interceptors/http-not-found.interceptor';

// Utils
export * from './src/utils/http-status-codes';
export * from './src/utils/notification.interface';
export * from './src/utils/translation.interface';

export {hasOwnProp} from './src/polyfills';

@NgModule({
  imports: [],
  declarations: []
})
export class HttpModule {
}
