import { Directive, Inject, Input, TemplateRef } from '@angular/core';

export interface CapRowContext<T> {
  $implicit: T;
  readonly index: number;
}

@Directive({
  selector: '[capRow]',
})
export class CapRowDirective<T> {
  @Input()
  public capRowOf: ReadonlyArray<T> = [];

  constructor(@Inject(TemplateRef) readonly template: TemplateRef<CapRowContext<T>>) {
  }

  static ngTemplateContextGuard<T>(
    _dir: CapRowDirective<T>,
    _ctx: any,
  ): _ctx is CapRowContext<T> {
    return true;
  }

}
