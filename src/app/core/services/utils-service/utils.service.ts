import { BreakpointObserver } from '@angular/cdk/layout';
import { DestroyRef, inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  private breakpointObserver = inject(BreakpointObserver);


  observeBreakpoint(breakpoint: string, callback: (matches: boolean) => void, destroyRef: DestroyRef) {
    this.breakpointObserver.observe(breakpoint)
      .pipe(takeUntilDestroyed(destroyRef))
      .subscribe(state => callback(state.matches));
  }
}
