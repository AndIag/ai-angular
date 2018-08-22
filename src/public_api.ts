import {NgModule} from '@angular/core';

/*
 * Public API Surface of lib
 */

export * from './http/callbacks/index';
export * from './http/interceptors/index';
export * from './http/utils/index';

export * from './http/http.handler';
export * from './http/http.service';
export * from './polyfills';

@NgModule({
    imports: [],
    declarations: []
})
export class HttpModule {
}
