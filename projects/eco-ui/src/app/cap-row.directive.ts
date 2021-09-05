import { Directive, Inject, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[capRow]',
})
export class CapRowDirective<T> {
  @Input()
  public capRowOf: ReadonlyArray<T> = [];

  constructor(@Inject(TemplateRef) readonly template: TemplateRef<any>) {
  }

}
