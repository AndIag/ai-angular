import {ChangeDetectionStrategy, Component, Inject, InjectionToken, Input} from '@angular/core';
import {UnavailableConfig} from './unavailable.config';

export const UNAVAILABLE_CONFIG = new InjectionToken<string>('Default \'unavailable\' message');
const DEFAULT_CONFIG = {unavailable: 'UNAVAILABLE', retry: 'RETRY', redirectTo: '/'};

@Component({
  selector: 'ai-unavailable',
  templateUrl: './unavailable.component.html',
  styleUrls: ['./unavailable.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UnavailableComponent {

  @Input() public text: string;
  @Input() public retry: string;
  @Input() public redirectTo: string;

  constructor(@Inject(UNAVAILABLE_CONFIG) public config: UnavailableConfig = DEFAULT_CONFIG) {
    this.text = config.unavailable;
    this.retry = config.retry;
    this.redirectTo = config.redirectTo;
  }

}
