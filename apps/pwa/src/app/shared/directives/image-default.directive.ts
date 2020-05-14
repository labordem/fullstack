import { Directive, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
  // tslint:disable-next-line
  selector: 'img[default]',
})
export class ImageDefaultDirective {
  /**
   * Replace undefined image by a default one.
   *
   * Usage example : <img src="" default="profile"/>
   */
  @Input()
  default: 'profile';

  @HostBinding('src')
  @Input()
  src: string;

  constructor() {}

  @HostListener('error')
  onError() {
    if (this.default === 'profile')
      this.src = '../../../assets/images/default_profile.png';
  }
}
