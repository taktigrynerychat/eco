import { ComponentRef } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

const isFunction: Function = <T>(value: T) => typeof value === 'function';

export const untilDestroyed: Function = (
  componentInstance: ComponentRef<any>,
  destroyMethodName: string = 'ngOnDestroy',
) => <T>(source: Observable<T>) => {
  const originalDestroy: Function = componentInstance[destroyMethodName];
  if (isFunction(originalDestroy) === false) {
    throw new Error(
      `${
        componentInstance.constructor.name
      } is using untilDestroyed but doesn't implement ${destroyMethodName}`,
    );
  }
  if (!componentInstance['__takeUntilDestroy']) {
    componentInstance['__takeUntilDestroy'] = new Subject();

    componentInstance[destroyMethodName] = function () {
      isFunction(originalDestroy) && originalDestroy.apply(this, arguments);
      componentInstance['__takeUntilDestroy'].next(true);
      componentInstance['__takeUntilDestroy'].complete();
    };
  }
  return source.pipe(takeUntil<T>(componentInstance['__takeUntilDestroy']));
};
