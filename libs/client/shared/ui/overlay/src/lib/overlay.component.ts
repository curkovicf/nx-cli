import {Component, HostBinding, Input} from '@angular/core';

@Component({
  selector: 'nx-cli-overlay',
  template: '',
  styleUrls: ['./overlay.component.scss'],
})
export class OverlayComponent {
  @HostBinding('style.width.px')
  width: number;

  @HostBinding('style.height.px')
  height: number;

  @Input()
  @HostBinding('style.background-color')
  backgroundColor: string = 'black';

  @Input() set isOverlayVisible(isOverlayVisible: boolean) {
    if (isOverlayVisible) {
      this.expandOverlay();

      return;
    }

    this.resetOverlay();
  }

  private expandOverlay(): void {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
  }

  private resetOverlay(): void {
    this.width = 0;
    this.height = 0;
  }
}
