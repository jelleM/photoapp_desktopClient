import {Pipe, PipeTransform} from '@angular/core';
import {Image} from '../model/Image';

@Pipe({name: 'imageSort'})
export class ImageSortPipe implements PipeTransform {

  transform(array: Image[]): Image[] {
    // Reverse sort the array.
    // Newest image is displayed first.
    array.sort((a: Image, b: Image) => {
      if (a.imageNumber < b.imageNumber) {
        return 1;
      } else if (a.imageNumber > b.imageNumber) {
        return -1;
      } else {
        return 0;
      }
    });

    return array;
  }

}
