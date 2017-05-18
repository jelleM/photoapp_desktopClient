import {SafeResourceUrl} from '@angular/platform-browser';

export class Image {
  imageNumber: number;
  imageBase64: string;

  constructor(imageNumber, imageBase64) {
    this.imageNumber = imageNumber;
    this.imageBase64 = imageBase64;
  }

}
