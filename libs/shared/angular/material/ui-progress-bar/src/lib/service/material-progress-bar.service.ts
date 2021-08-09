import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MaterialProgressBarService {
  isLoading = false;

  public toggleLoading(): void {
    this.isLoading = !this.isLoading;
  }
}
