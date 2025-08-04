import { DestroyRef, inject } from "@angular/core";
import { Subject, takeUntil, MonoTypeOperatorFunction } from "rxjs";

export const destroyCustom = (): <T>() => MonoTypeOperatorFunction<T> => {

  const subject = new Subject();

  inject(DestroyRef).onDestroy(() => {
    console.warn('Component is being destroyed');
    subject.next(true);
    subject.complete();
  })

  return <T>() => takeUntil<T>(subject.asObservable())
}
