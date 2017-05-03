import {Component, OnDestroy, OnInit} from '@angular/core';
import { ConnectionService } from '../connect/connection.service';
import { Subscription }      from 'rxjs/Subscription';

@Component({
  selector: 'event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})

export class EventComponent implements OnInit, OnDestroy {

  private overviewLayoutSubscription: Subscription;
  private detailLayoutSubscription: Subscription;
  private testImagesSubscription: Subscription;
  private images: string[] = [];

  constructor(private connectionService: ConnectionService) { }

  ngOnInit(): void {
    this.testImagesSubscription = this.connectionService.receiveTestImages().subscribe(image => {
      this.images.push(image);
    });
    this.overviewLayoutSubscription = this.connectionService.receiveOverviewLayout().subscribe(() => { });
    this.detailLayoutSubscription = this.connectionService.receiveDetailLayout().subscribe(() => { });
  }

  ngOnDestroy(): void {
    this.testImagesSubscription.unsubscribe();
  }

}
