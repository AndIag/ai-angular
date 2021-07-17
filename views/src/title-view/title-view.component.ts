import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {TitlePosition} from './title-position.enum';

@Component({
  selector: 'ai-title',
  templateUrl: './title-view.component.html',
  styleUrls: ['./title-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TitleViewComponent {
  @Input() title?: string;
  @Input() textStyle: string = "";
  @Input() position: TitlePosition = TitlePosition.CENTER;

  get positionClass(): { [klass: string]: any } {
    const position: { [klass: string]: any } = {};
    switch (this.position) {
      case TitlePosition.CENTER:
        position['text-center'] = true;
        break;
      case TitlePosition.RIGHT:
        position['text-right'] = true;
        break;
      default:
        position['text-left'] = true;
        break;
    }
    return position;
  }
}
