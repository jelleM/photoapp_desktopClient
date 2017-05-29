import {Injectable, NgZone} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import * as io from 'socket.io-client';

@Injectable()
export class ConnectionService {

  private host: string;
  private port: string;
  private socket: any;

  constructor(private zone: NgZone) { }

  /**
   * Connect to the socket.io server.
   * @param host
   * @param port
   */
  public setServerAddress(host: string, port: string): void {
    this.host = host;
    this.port = port;
    this.socket = io('http://' + host + ':' + port);
  }

  public getHost(): string {
    return this.host;
  }

  public getPort(): string {
    return this.port;
  }

  public connectToServer(): Observable<any> {
    return new Observable(o => {
      this.socket.on('connect', (message) => {
        o.next(message);
        console.log('ConnectionService - connect() - Client is connected!');
      });
    });
  }

  public receiveEventId(): Observable<any> {
    return new Observable(o => {
      this.socket.on('event-id', (id) => {
        o.next(id);
        console.log('ConnectionService - receiveEventId() - Client is connected!');
      });
    });
  }

  public receiveOverviewLayout(): Observable<any> {
    return new Observable(o => {
      this.socket.on('overview-layout', (overviewLayout) => {
        o.next(overviewLayout);
        console.log('ConnectionService - receiveOverviewLayout() - OverviewLayout received!');
      });
    });
  }

  public receiveDetailLayout(): Observable<any> {
    return new Observable(o => {
      this.socket.on('detail-layout', (detailLayout) => {
        o.next(detailLayout);
        console.log('ConnectionService - receiveDetailLayout() - DetailLayout received!');
      });
    });
  }

  public receiveImages(): Observable<any> {
    return new Observable(o => {
      this.socket.on('image', (image) => {
        o.next(image);
        console.log('ConnectionService - receiveImages() - Image received!');
      });
    });
  }

  public privateMessage(): Observable<any> {
    return new Observable(o => {
      this.socket.on('private-message', (msg) => {
        o.next(msg);
        console.log('ConnectionService - privateMessage() - ' + msg);
      });
    });
  }

  public deleteImage(): Observable<any> {
    return new Observable(o => {
      this.socket.on('delete-image', (imageNumber) => {
        o.next(imageNumber);
        console.log('ConnectionService - deleteImage() - ' + imageNumber);
      });
    });
  }

  /**
   * Send the image number to the server for printing.
   * @param images
   */
  public printImages(images): void {
    this.socket.emit('print', images.map(i => i.imageNumber));
    console.log('Printing selected images!');
  }

}
