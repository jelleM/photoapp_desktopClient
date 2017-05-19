import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {ConnectionService} from '../connect/connection.service';
import {Subscription} from 'rxjs/Subscription';
import {Image} from '../model/Image';
import {OverviewLayout} from '../model/layout/OverviewLayout';
import {DetailLayout} from '../model/layout/DetailLayout';
import {isUndefined} from "util";

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
  private imagesSubscription: Subscription;
  private images: Image[] = [];
  private deleteImageSubscription: Subscription;

  private tempOverviewLayout: OverviewLayout = new OverviewLayout();
  private tempDetailLayout: DetailLayout = new DetailLayout();

  private selectedImages: Image[] = [];
  private eventOverviewIsShowed = true;

  constructor(private connectionService: ConnectionService, private zone: NgZone) {
  }

  ngOnInit(): void {
    this.connectionSubscription = this.connectionService.connectToServer().subscribe(() => { });

    this.overviewLayoutSubscription = this.connectionService.receiveOverviewLayout().subscribe((ol) => {
      console.log('OverviewLayout: ');
      console.log(ol);
    });

    this.detailLayoutSubscription = this.connectionService.receiveDetailLayout().subscribe((dl) => {
      console.log('DetailLayout: ');
      console.log(dl);
    });

    this.privateMessageSubscription = this.connectionService.privateMessage().subscribe(() => { });

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
        const index: number = this.images.findIndex(image => image.imageNumber === parseInt(photoNumber));
        this.images.splice(index, 1);
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

}
