import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {ConnectionService} from '../connect/connection.service';
import {Subscription} from 'rxjs/Subscription';
import {Image} from '../model/Image';
import {OverviewLayout} from '../model/layout/OverviewLayout';
import {DetailLayout} from '../model/layout/DetailLayout';
import {Position} from '../model/layout/Position';
import {isUndefined} from 'util';

@Component({
  selector: 'event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})

export class EventComponent implements OnInit, OnDestroy {

  private connectionSubscription: Subscription;
  private overviewLayoutSubscription: Subscription;
  private detailLayoutSubscription: Subscription;
  private privateMessageSubscription: Subscription;
  private eventIdSubscription: Subscription;
  private eventId: string;
  private imagesSubscription: Subscription;
  private images: Image[] = [];
  private deleteImageSubscription: Subscription;

  private overviewLayout: OverviewLayout;
  private detailLayout: DetailLayout;

  private selectedImages: Image[] = [];
  private eventOverviewIsShowed = true;

  private overviewReady: boolean;
  private detailReady: boolean;

  constructor(private connectionService: ConnectionService, private zone: NgZone) {
  }

  ngOnInit(): void {
    this.overviewReady = false;
    this.detailReady = false;
    this.overviewLayout = new OverviewLayout();
    this.detailLayout = new DetailLayout();

    this.connectionSubscription = this.connectionService.connectToServer().subscribe(() => {
    });

    this.eventIdSubscription = this.connectionService.receiveEventId().subscribe((id) => {
      console.log('EventId: ' + id);
      this.zone.run(() => {
        this.eventId = id;
      });
    });

    this.overviewLayoutSubscription = this.connectionService.receiveOverviewLayout().subscribe((ol) => {
      console.log('OverviewLayout: ');
      console.log(ol);

      this.parseOverviewLayout(ol);
      console.log('Background color overview: ' + this.overviewLayout.logo);
      this.overviewReady = true;
    });

    this.detailLayoutSubscription = this.connectionService.receiveDetailLayout().subscribe((dl) => {
      console.log('DetailLayout: ');
      console.log(dl);

      this.parseDetailLayout(dl);
      this.detailReady = true;
    });

    this.privateMessageSubscription = this.connectionService.privateMessage().subscribe(() => {
    });

    this.imagesSubscription = this.connectionService.receiveImages().subscribe(imageCode => {
      this.zone.run(() => {
        const imageCount = parseInt(imageCode.imageCount);
        const imageSource = imageCode.imageBase;

        // If the image doesn't exist yet, add it to the array.
        if (isUndefined(this.images.find(image => image.imageNumber === imageCount))) {
          const newImage: Image = new Image(imageCount, imageSource);
          console.log('EventComponent - Received image with number: ' + imageCount + ' and source: ' + imageSource.substr(0, 10) + '...');
          this.images.push(newImage);
          this.sortImages();
        } else {
          console.log('Image with number ' + imageCount + ' already existed!');
        }
      });
    });

    this.deleteImageSubscription = this.connectionService.deleteImage().subscribe(photoNumber => {
      this.zone.run(() => {
        console.log('Deleting image with number ' + photoNumber + '!');
        this.images = this.images.filter(x => x.imageNumber !== photoNumber);

        if (this.selectedImages.length > 0) {
          this.selectedImages = this.selectedImages.filter(x => x.imageNumber !== photoNumber);
        }
      });
    });
  }

  private sortImages() {
    this.images.sort((a: Image, b: Image) => {
      if (a.imageNumber < b.imageNumber) {
        return 1;
      } else if (a.imageNumber > b.imageNumber) {
        return -1;
      } else {
        return 0;
      }
    });
  }

  ngOnDestroy(): void {
    this.connectionSubscription.unsubscribe();
    this.overviewLayoutSubscription.unsubscribe();
    this.detailLayoutSubscription.unsubscribe();
    this.privateMessageSubscription.unsubscribe();
    this.imagesSubscription.unsubscribe();
    this.deleteImageSubscription.unsubscribe();
  }

  /**
   * Do actions based on events emitted by event-detail or event-overview.
   */

  showEventDetail(evt) {
    if (this.selectedImages.length > 0) {
      this.eventOverviewIsShowed = false;
    }
  }

  showEventOverview(evt) {
    if (!evt) {
      this.selectedImages = [];
    }
    this.eventOverviewIsShowed = true;
  }

  setSelectedImages(evt) {
    this.selectedImages = evt;
  }

  private parseOverviewLayout(jsonString: string) {
    let overviewJSON = JSON.parse(jsonString);

    if (!isUndefined(overviewJSON.logo)) {
      this.overviewLayout.logo = overviewJSON.logo;
    }
    if (!isUndefined(overviewJSON.logoPosition)) {
      switch (overviewJSON.logoPosition) {
        case 'LEFT':
          this.overviewLayout.logoPosition = Position.LEFT;
          break;
        case 'CENTER':
          this.overviewLayout.logoPosition = Position.CENTER;
          break;
        case 'RIGHT':
          this.overviewLayout.logoPosition = Position.RIGHT;
          break;
      }
    }
    if (!isUndefined(overviewJSON.backgroundColor)) {
      this.overviewLayout.backgroundColor = overviewJSON.backgroundColor;
    }
    if (!isUndefined(overviewJSON.backgroundImage)) {
      this.overviewLayout.backgroundImage = overviewJSON.backgroundImage;
    }
    if (!isUndefined(overviewJSON.imageBorderColor)) {
      this.overviewLayout.imageBorderColor = overviewJSON.imageBorderColor;
    }
    if (!isUndefined(overviewJSON.imageBorderWidth)) {
      this.overviewLayout.imageBorderWidth = overviewJSON.imageBorderWidth;
    }

    if (!isUndefined(overviewJSON.imageContainer)) {
      this.overviewLayout.imageContainer = overviewJSON.imageContainer;
    }
    if (!isUndefined(overviewJSON.imageContainerColor)) {
      this.overviewLayout.imageContainerColor = overviewJSON.imageContainerColor;
    }
    if (!isUndefined(overviewJSON.imageContainerBorderColor)) {
      this.overviewLayout.imageContainerBorderColor = overviewJSON.imageContainerBorderColor;
    }
    if (!isUndefined(overviewJSON.imageContainerBorderWidth)) {
      this.overviewLayout.imageContainerBorderWidth = overviewJSON.imageContainerBorderWidth;
    }
    if (!isUndefined(overviewJSON.selectionIcon)) {
      this.overviewLayout.selectionIcon = overviewJSON.selectionIcon;
    }
    if (!isUndefined(overviewJSON.selectionContainer)) {
      this.overviewLayout.selectionContainer = overviewJSON.selectionContainer;
    }
    if (!isUndefined(overviewJSON.selectionContainerColor)) {
      this.overviewLayout.selectionContainerColor = overviewJSON.selectionContainerColor;
    }
    if (!isUndefined(overviewJSON.selectionContainerBorderColor)) {
      this.overviewLayout.selectionContainerBorderColor = overviewJSON.selectionContainerBorderColor;
    }
    if (!isUndefined(overviewJSON.selectionContainerBorderWidth)) {
      this.overviewLayout.selectionContainerBorderWidth = overviewJSON.selectionContainerBorderWidth;
    }
    if (!isUndefined(overviewJSON.selectBtnText)) {
      this.overviewLayout.selectBtnText = overviewJSON.selectBtnText;
    }
    if (!isUndefined(overviewJSON.selectBtnColor)) {
      this.overviewLayout.selectBtnColor = overviewJSON.selectBtnColor;
    }
    if (!isUndefined(overviewJSON.selectBtnImage)) {
      this.overviewLayout.selectBtnImage = overviewJSON.selectBtnImage;
    }
    if (!isUndefined(overviewJSON.selectBtnBorderColor)) {
      this.overviewLayout.selectBtnBorderColor = overviewJSON.selectBtnBorderColor;
    }
    if (!isUndefined(overviewJSON.selectBtnBorderWidth)) {
      this.overviewLayout.selectBtnBorderWidth = overviewJSON.selectBtnBorderWidth;
    }
  }

  private parseDetailLayout(jsonString: string) {
    let detailJSON = JSON.parse(jsonString);

    if (!isUndefined(detailJSON.logo)) {
      this.detailLayout.logo = detailJSON.logo;
    }
    if (!isUndefined(detailJSON.logoPosition)) {
      switch (detailJSON.logoPosition) {
        case 'LEFT':
          this.detailLayout.logoPosition = Position.LEFT;
          break;
        case 'CENTER':
          this.detailLayout.logoPosition = Position.CENTER;
          break;
        case 'RIGHT':
          this.detailLayout.logoPosition = Position.RIGHT;
          break;
      }
    }
    if (!isUndefined(detailJSON.backgroundColor)) {
      this.detailLayout.backgroundColor = detailJSON.backgroundColor;
    }
    if (!isUndefined(detailJSON.backgroundImage)) {
      this.detailLayout.backgroundImage = detailJSON.backgroundImage;
    }
    if (!isUndefined(detailJSON.imageBorderColor)) {
      this.detailLayout.imageBorderColor = detailJSON.imageBorderColor;
    }
    if (!isUndefined(detailJSON.imageBorderWidth)) {
      this.detailLayout.imageBorderWidth = detailJSON.imageBorderWidth;
    }

    if (!isUndefined(detailJSON.printBtnText)) {
      this.detailLayout.printBtnText = detailJSON.printBtnText;
    }
    if (!isUndefined(detailJSON.printBtnColor)) {
      this.detailLayout.printBtnColor = detailJSON.printBtnColor;
    }
    if (!isUndefined(detailJSON.printBtnImage)) {
      this.detailLayout.printBtnImage = detailJSON.printBtnImage;
    }
    if (!isUndefined(detailJSON.printBtnBorderColor)) {
      this.detailLayout.printBtnBorderColor = detailJSON.printBtnBorderColor;
    }
    if (!isUndefined(detailJSON.printBtnBorderWidth)) {
      this.detailLayout.printBtnBorderWidth = detailJSON.printBtnBorderWidth;
    }
    if (!isUndefined(detailJSON.shareBtnText)) {
      this.detailLayout.shareBtnText = detailJSON.shareBtnText;
    }
    if (!isUndefined(detailJSON.shareBtnColor)) {
      this.detailLayout.shareBtnColor = detailJSON.shareBtnColor;
    }
    if (!isUndefined(detailJSON.shareBtnImage)) {
      this.detailLayout.shareBtnImage = detailJSON.shareBtnImage;
    }
    if (!isUndefined(detailJSON.shareBtnBorderColor)) {
      this.detailLayout.shareBtnBorderColor = detailJSON.shareBtnBorderColor;
    }
    if (!isUndefined(detailJSON.shareBtnBorderWidth)) {
      this.detailLayout.shareBtnBorderWidth = detailJSON.shareBtnBorderWidth;
    }
    if (!isUndefined(detailJSON.backBtnText)) {
      this.detailLayout.backBtnText = detailJSON.backBtnText;
    }
    if (!isUndefined(detailJSON.backBtnColor)) {
      this.detailLayout.backBtnColor = detailJSON.backBtnColor;
    }
    if (!isUndefined(detailJSON.backBtnImage)) {
      this.detailLayout.backBtnImage = detailJSON.backBtnImage;
    }
    if (!isUndefined(detailJSON.backBtnBorderColor)) {
      this.detailLayout.backBtnBorderColor = detailJSON.backBtnBorderColor;
    }
    if (!isUndefined(detailJSON.backBtnBorderWidth)) {
      this.detailLayout.backBtnBorderWidth = detailJSON.backBtnBorderWidth;
    }
    if (!isUndefined(detailJSON.finishBtnText)) {
      this.detailLayout.finishBtnText = detailJSON.finishBtnText;
    }
    if (!isUndefined(detailJSON.finishBtnColor)) {
      this.detailLayout.finishBtnColor = detailJSON.finishBtnColor;
    }
    if (!isUndefined(detailJSON.finishBtnImage)) {
      this.detailLayout.finishBtnImage = detailJSON.finishBtnImage;
    }
    if (!isUndefined(detailJSON.finishBtnBorderColor)) {
      this.detailLayout.finishBtnBorderColor = detailJSON.finishBtnBorderColor;
    }
    if (!isUndefined(detailJSON.finishBtnBorderWidth)) {
      this.detailLayout.finishBtnBorderWidth = detailJSON.finishBtnBorderWidth;
    }
    if (!isUndefined(detailJSON.printMessageImage)) {
      this.detailLayout.printMessageImage = detailJSON.printMessageImage;
    }
    if (!isUndefined(detailJSON.printMessageText)) {
      this.detailLayout.printMessageText = detailJSON.printMessageText;
    }
    if (!isUndefined(detailJSON.printMessageColor)) {
      this.detailLayout.printMessageColor = detailJSON.printMessageColor;
    }
    if (!isUndefined(detailJSON.printMessageBorderColor)) {
      this.detailLayout.printMessageBorderColor = detailJSON.printMessageBorderColor;
    }
    if (!isUndefined(detailJSON.printMessageBorderWidth)) {
      this.detailLayout.printMessageBorderWidth = detailJSON.printMessageBorderWidth;
    }
    /*if (!isUndefined(detailJSON.imagePosition)) {
      switch (detailJSON.imagePosition) {
        case 'LEFT':
          this.detailLayout.imagePosition = Position.LEFT;
          break;
        case 'CENTER':
          this.detailLayout.imagePosition = Position.CENTER;
          break;
        case 'RIGHT':
          this.detailLayout.imagePosition = Position.RIGHT;
          break;
      }
    }*/
  }

  // The styling of the background has to happen here, because it has to happen on the :host element
  public setOverviewBackground(): any {
    if (this.overviewLayout != null && this.overviewLayout.backgroundImage) {
      return {'background-image': 'url(' + this.overviewLayout.backgroundImage + ')', 'background-repeat': 'round', 'background-size:': 'cover'};
    } else {
      return {'background-color': this.overviewLayout.backgroundColor};
    }
  }

  public setDetailBackground(): any {
    if (this.detailLayout != null && this.detailLayout.backgroundImage) {
      return {'background-image': 'url(' + this.detailLayout.backgroundImage + ')', 'background-cover': 'cover'};
    } else {
      return {'background-color': this.detailLayout.backgroundColor};
    }
  }

}
