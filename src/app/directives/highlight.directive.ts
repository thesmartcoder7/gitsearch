import { Directive } from '@angular/core';
import { ElementRef } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective {
  constructor(private elem: ElementRef) {
    this.elem.nativeElement.style.backgroundColor = '#222327';
  }
}
