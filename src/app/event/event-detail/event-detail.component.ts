import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {DetailLayout} from '../../model/layout/DetailLayout';
import {Image} from '../../model/Image';
import {QRCodeComponent} from 'angular2-qrcode';
import {ConnectionService} from '../../connect/connection.service';
import {LayoutSwitchService} from '../services/layout-switch.service';

@Component({
  selector: 'event-detail',
  templateUrl: 'event-detail.component.html',
  styleUrls: ['event-detail.component.css'],
  entryComponents: [QRCodeComponent]
})

export class EventDetailComponent implements OnInit {
  @Input() detailLayout: DetailLayout;
  @Input() isFullScreen: boolean;
  @Input() images: Image[];
  @Input() eventId: string;
  @Output() goToEventOverview: EventEmitter<any> = new EventEmitter();

  private selectedImage: Image;

  private isPrinted = false;

  private qrCode: string;

  private config: Object = {
    slidesPerView: 3,
    spaceBetween: 5
  };

  constructor(private connectionService: ConnectionService, private layoutSwitchService: LayoutSwitchService) {
  }

  ngOnInit(): void {
    if (this.images.length > 0) {
      this.selectedImage = this.images[0];
    }
    /**
     *  Generate the QR-Code link.
     */
    this.qrCode = 'https://photoapp-share.herokuapp.com/photo?eventId=' + this.eventId;
    for (let image of this.images) {
      this.qrCode = this.qrCode + '&photo=' + image.imageNumber;
    }
  }

  /**
   *  Show the menu on 3 clicks in left corner and 1 in the right corner.
   */
  private exitCounter = 0;
  private timer;

  switchLayoutLeftBtn() {
    this.exitCounter++;
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.exitCounter = 0, 3000);
  }

  switchLayoutRightBtn() {
    if (this.exitCounter >= 3) {
      this.layoutSwitchService.toggleSwitched();
    }
  }

  private setLeftSwitchButton(): any {
    return {
      'z-index': '10',
      'position': 'absolute',
      'left': '0',
      'height': '7%',
      'width': '10%'
    };
  }

  private setRightSwitchButton(): any {
    return {
      'z-index': '10',
      'position': 'absolute',
      'right': '0',
      'height': '7%',
      'width': '10%'
    };
  }

  setImageStyle(): any {
    if (this.detailLayout != null) {
      return {
        'border': this.detailLayout.imageBorderWidth + 'px solid ' + this.detailLayout.imageBorderColor
      };
    } else {
      return {'border': 'none'};
    }
  }

  setPrintButton(): any {
    if (this.detailLayout != null && this.detailLayout.printBtnImage == null) {
      return {
        'background': this.detailLayout.printBtnColor,
        'border': this.detailLayout.printBtnBorderWidth + 'px solid ' + this.detailLayout.printBtnBorderColor,
        'color': this.detailLayout.printBtnBorderColor
      };
    } else {
      return {'background': 'none', 'border': 'none'};
    }
  }

  setShareButton(): any {
    if (this.detailLayout != null && this.detailLayout.shareBtnImage == null) {
      return {
        'background': this.detailLayout.shareBtnColor,
        'border': this.detailLayout.shareBtnBorderWidth + 'px solid ' + this.detailLayout.shareBtnBorderColor,
        'color': this.detailLayout.shareBtnBorderColor

      };
    } else {
      return {'background': 'none', 'border': 'none'};
    }
  }

  setBackButton(): any {
    if (this.detailLayout != null && this.detailLayout.backBtnImage == null) {
      return {
        'background': this.detailLayout.backBtnColor,
        'border': this.detailLayout.backBtnBorderWidth + 'px solid ' + this.detailLayout.backBtnBorderColor,
        'color': this.detailLayout.backBtnBorderColor
      };
    } else {
      return {'background': 'none', 'border': 'none'};
    }
  }

  setFinishButton(): any {
    if (this.detailLayout != null && this.detailLayout.finishBtnImage == null) {
      return {
        'background': this.detailLayout.finishBtnColor,
        'border': this.detailLayout.finishBtnBorderWidth + 'px solid ' + this.detailLayout.finishBtnBorderColor,
        'color': this.detailLayout.finishBtnBorderColor
      };
    } else {
      return {'background': 'none', 'border': 'none'};
    }
  }

  setPrintMessage(): any {
    if (this.detailLayout !== null && this.detailLayout.printMessageImage === null) {
      return {
        'display': 'flex',
        'justify-content': 'center',
        'flex-direction': 'column',
        'text-align': 'center',
        'background-color': this.detailLayout.printMessageColor,
        'border': this.detailLayout.printMessageBorderWidth + 'px solid ' + this.detailLayout.printMessageBorderColor,
        'color': this.detailLayout.printMessageBorderColor
      };
    } else {
      return {'background': 'none', 'border': 'none'};
    }
  }

  setImagePositionAndBackground(): any {
    if ((this.detailLayout.imagePosition === 0) && (this.detailLayout.backgroundImage)) {
      return {
        'flex-direction': 'row',
        'background-image': 'url(' + this.detailLayout.backgroundImage + ')',
        'background-repeat': 'round',
        'background-size:': 'cover'
      };
    } else if ((this.detailLayout.imagePosition === 0) && (!this.detailLayout.backgroundImage)) {
      return {'flex-direction': 'row', 'background-color': this.detailLayout.backgroundColor};
    } else if ((this.detailLayout.imagePosition !== 0) && (!this.detailLayout.backgroundImage)) {
      return {'flex-direction': 'row-reverse', 'background-color': this.detailLayout.backgroundColor};
    } else {
      return {
        'flex-direction': 'row-reverse',
        'background-image': 'url(' + this.detailLayout.backgroundImage + ')',
        'background-repeat': 'round',
        'background-size:': 'cover'
      };
    }
  }

  /**
   * select image
   */
  selectImage(img: Image) {
    this.selectedImage = img;
    console.log(this.selectedImage.imageNumber);
  }

  /**
   * Click back button and go back to event-overview
   */

  clickBackBtn() {
    this.isPrinted = false;
    this.goToEventOverview.emit(true);
  }

  /**
   * Click finish button and go back to event-overview
   */

  clickFinishBtn() {
    this.isPrinted = false;
    this.goToEventOverview.emit(false);
  }


  /**
   * Send the images to print and display the print message.
   */
  printImages() {
    if (this.images != null) {
      this.connectionService.printImages(this.images);
      this.isPrinted = true;
    }
  }
}
