import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

/*
 * Public API Surface of lib
 */

// Core
export * from './src/core/http.types';
export * from './src/core/http.handler';
export * from './src/core/http.service';

// Callbacks
export * from './src/callbacks';

// Interceptors
export * from './src/interceptors/http-error.interceptor';
export * from './src/interceptors/http-not-found.interceptor';

// Utils
export * from './src/utils/url.builder';
export * from './src/utils/http-status-codes';
export * from './src/utils/notification.interface';
export * from './src/utils/translation.interface';

export {hasOwnProp} from './src/polyfills';

@NgModule({
  imports: [HttpClientModule],
  exports: [HttpClientModule],
})
export class HttpModule {
}
