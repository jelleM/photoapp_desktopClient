import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {ConnectionService} from '../connect/connection.service';
import {Subscription} from 'rxjs/Subscription';
import {Image} from '../model/Image';
import {OverviewLayout} from "../model/layout/OverviewLayout";

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

  constructor(private connectionService: ConnectionService, private zone: NgZone) { }

  ngOnInit(): void {
    this.connectionSubscription = this.connectionService.connectToServer().subscribe(() => { });

    this.overviewLayoutSubscription = this.connectionService.receiveOverviewLayout().subscribe(() => { });

    this.detailLayoutSubscription = this.connectionService.receiveDetailLayout().subscribe(() => { });

    this.privateMessageSubscription = this.connectionService.privateMessage().subscribe(() => { });

    this.imagesSubscription = this.connectionService.receiveImages().subscribe(imageCode => {
      this.zone.run(() => {
        const imageCount = imageCode.imageCount;
        const imageSource = imageCode.imageBase;
        const newImage: Image = new Image(imageCount, imageSource);
        console.log('EventComponent - Received image with number: ' + imageCount + ' and source: ' + imageSource.substr(0, 10) + '...');
        this.images.push(newImage);
      });
    });

    this.deleteImageSubscription = this.connectionService.deleteImage().subscribe(photoNumber => {
      console.log('Deleting image with number ' + photoNumber + '!');
      const imageToDelete = this.images.find(image => image.imageNumber === photoNumber);
      if (imageToDelete !== null) {
        this.images = this.images.filter(image => image !== imageToDelete);
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

}
