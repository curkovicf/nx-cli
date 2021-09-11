import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

@Injectable()
export class ProjectsFacade {
  constructor(private store: Store<any>) {}
}
