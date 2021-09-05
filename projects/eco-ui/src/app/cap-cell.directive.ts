import { Directive, Inject, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[capCell]',
})
export class CapCellDirective {

  @Input()
  public capCell: string = '';

  constructor(@Inject(TemplateRef) public readonly template: TemplateRef<{}>) {
  }

}
