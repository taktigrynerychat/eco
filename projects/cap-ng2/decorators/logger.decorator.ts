import { isObservable, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export function LogObservable<T>(target: any, propertyKey: string): void {
  let propertyValue: Observable<any>;
  const originalDescriptor: PropertyDescriptor = Object.getOwnPropertyDescriptor(target, propertyKey);

  Object.defineProperty(target, propertyKey, {
    get: () => originalDescriptor ? originalDescriptor.get() : propertyValue,
    set: (value: any) => {
      if (isObservable(value)) {
        if (originalDescriptor) {
          originalDescriptor.set(prepareData(value, propertyKey));
        } else {
          propertyValue = prepareData(value, propertyKey);
        }
      } else {
        if (originalDescriptor) {
          originalDescriptor.set(value);
        } else {
          propertyValue = value;
        }
      }
    },
    enumerable: originalDescriptor ? originalDescriptor.enumerable : true,
    configurable: originalDescriptor ? originalDescriptor.configurable : true,
  });
}

function prepareData(data: Observable<any>, propertyKey: string): Observable<any> {
  return data.pipe(
    tap((nextValue: any) => {
      const isArrayOfObjects: boolean = Array.isArray(nextValue) && typeof nextValue[0] === 'object';

      console.groupCollapsed(propertyKey);
      console[isArrayOfObjects ? 'table' : 'log'](nextValue);
      console.groupEnd();
    }),
  );
}
