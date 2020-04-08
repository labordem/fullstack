import { Pipe, PipeTransform } from '@angular/core';
// tslint:disable-next-line
import { environment } from 'apps/pwa/src/environments/environment';

@Pipe({
  name: 'imageApi'
})
export class ImageApiPipe implements PipeTransform {
  /**
   * Add url prefix to fetch API image.
   *
   * Usage example : <img src="{{ currentUser.avatar | imageApi }}"></img>
   */
  transform(imageUrlFromServer: string): string {
    const imageUrlSuffix = `//${environment.API_DOMAIN}/${environment.API_PREFIX}:${environment.API_PORT}`;
    return `${imageUrlSuffix}/${imageUrlFromServer}`;
  }
}
