import {Component, OnDestroy, OnInit} from '@angular/core';
import { ConnectionService } from '../connect/connection.service';
import { Subscription }      from 'rxjs/Subscription';
import {Image} from '../model/Image';

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
  private deletePhotoSubscription: Subscription;

  constructor(private connectionService: ConnectionService) { }

  ngOnInit(): void {
    this.connectionSubscription = this.connectionService.connectToServer().subscribe(() => { });
    this.overviewLayoutSubscription = this.connectionService.receiveOverviewLayout().subscribe(() => { });
    this.detailLayoutSubscription = this.connectionService.receiveDetailLayout().subscribe(() => { });
    this.privateMessageSubscription = this.connectionService.privateMessage().subscribe(() => { });
    this.imagesSubscription = this.connectionService.receiveImages().subscribe(imageCode => {
      const imageFields = imageCode.split('%%%');
      const imageSource = imageFields[0];
      const imageCount = imageFields[1];
      const newImage: Image = new Image(imageCount, imageSource);
      console.log('Image with number ' + newImage.imageNumber + ' has been added!');
      this.images.push(newImage);
    });
    this.deletePhotoSubscription = this.connectionService.deletePhoto().subscribe(photoNumber => {
      console.log('Deleting image with number ' + photoNumber + '!');
      const imageToDelete = this.images.find(image => image.imageNumber === photoNumber);
      if (imageToDelete !== null) {
        this.images = this.images.filter(image => image !== imageToDelete);
      }
    });
  }

  ngOnDestroy(): void {
    this.imagesSubscription.unsubscribe();
  }

}
