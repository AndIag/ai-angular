import {AfterContentChecked, Directive, ElementRef, HostListener, Input} from '@angular/core';

const MAX_LOOKUP_RETRIES = 3;

@Directive({
  selector: 'textarea[autosize]',
})
export class AutosizeDirective implements AfterContentChecked {
  @Input() minRows?: number;
  @Input() maxRows?: number;

  // tslint:disable-next-line:no-any
  private textAreaEl: any;
  private retries = 0;

  @HostListener('input', ['$event.target'])
  onInput(textArea: HTMLTextAreaElement) {
    this.adjust();
  }

  constructor(public element: ElementRef) {
    if (this.element.nativeElement.tagName !== 'TEXTAREA') {
      this._findNestedTextArea();
    } else {
      this.textAreaEl = this.element.nativeElement;
      this.textAreaEl.style.overflow = 'hidden';
    }
  }

  _findNestedTextArea() {
    this.textAreaEl = this.element.nativeElement.querySelector('TEXTAREA');

    if (!this.textAreaEl && this.element.nativeElement.shadowRoot) {
      this.textAreaEl = this.element.nativeElement.shadowRoot.querySelector('TEXTAREA');
    }

    if (!this.textAreaEl) {
      if (this.retries >= MAX_LOOKUP_RETRIES) {
        console.warn('autosize: textarea not found');

      } else {
        this.retries++;
        setTimeout(() => this._findNestedTextArea(), 100);
      }
      return;
    }
    this.textAreaEl.style.overflow = 'hidden';
  }

  ngAfterContentChecked() {
    this.adjust();
  }

  adjust() {
    if (this.textAreaEl) {
      const clone = this.textAreaEl.cloneNode(true);
      const parent = this.textAreaEl.parentNode;
      clone.style.visibility = 'hidden';
      parent.appendChild(clone);

      clone.style.overflow = 'auto';
      clone.style.height = 'auto';

      const lineHeight = this._getLineHeight();
      let height = clone.scrollHeight;
      const rowsCount = height / lineHeight;
      if (this.minRows && this.minRows >= rowsCount) {
        // clone.style.overflow = 'auto';
        height = this.minRows * lineHeight;

      } else if (this.maxRows && this.maxRows <= rowsCount) {
        // clone.style.overflow = 'auto';
        height = this.maxRows * lineHeight;
        this.textAreaEl.style.overflow = 'auto';

      } else {
        this.textAreaEl.style.overflow = 'hidden';
      }

      this.textAreaEl.style.height = `${height}px`;
      parent.removeChild(clone);
    }
  }

  private _getLineHeight(): number {
    let lineHeight = +this.textAreaEl.style.lineHeight;
    if (isNaN(lineHeight)) {
      const style = window.getComputedStyle(this.textAreaEl, null);
      lineHeight = +style.lineHeight!;

      if (isNaN(lineHeight)) {
        const fontSize = style.getPropertyValue('font-size');
        lineHeight = Math.floor(+fontSize.replace('px', '') * 1.2);
      }
    }

    return lineHeight;
  }
}
