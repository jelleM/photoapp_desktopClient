import {Injectable, NgZone} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import * as io        from 'socket.io-client';

@Injectable()
export class ConnectionService {

  private host: string;
  private port: string;
  private socket: any;

  constructor(private zone: NgZone) { }

  public setServerAddress(host: string, port: string): void {
    this.host = host;
    this.port = port;
    this.socket = io(host + ':' + port);
  }

  public getHost(): string {
    return this.host;
  }

  public getPort(): string {
    return this.port;
  }

  /**
   * Connect to the server.
   * @param host
   * @param port
   * @returns {Observable}
   */
  /*public connectToServer(host, port): Observable<any> {
   return new Observable(o => {
   this.host = host;
   this.port = port;

   this.socket = io(host + ':' + port);

   // Socket.io callbacks need to be in constructor.
   this.socket.on('connect', function () {
   console.log('Client is connected!');
   });

   this.socket.on('overview-layout', function (ol) {
   console.log('Received OverviewLayout: ' + JSON.stringify(ol));
   });

   this.socket.on('detail-layout', function (dl) {
   console.log('Received DetailLayout: ' + JSON.stringify(dl));
   });

   this.socket.on('test-image', function (i) {
   let zoneTwo: NgZone;
   zoneTwo.run(() => {
   this.imageAvailable = true;
   this.imageUrl = i;
   });
   console.log('Received image: ' + i);
   });
   });
   }*/

  public connectToServer(): Observable<any> {
    return new Observable(o => {
      this.socket.on('connect', (message) => {
        o.next(message);
        console.log('ConnectionService - connect() - Client is connected!');
      });
      return () => {
        this.socket.disconnect();
        console.log('ConnectionService - connect() - Socket disconnected!');
      };
    });
  }

  public receiveOverviewLayout(): Observable<any> {
    return new Observable(o => {
      this.socket.on('overview-layout', (overviewLayout) => {
        o.next(overviewLayout);
        console.log('ConnectionService - receiveOverviewLayout() - OverviewLayout received!');
      });
      return () => {
        this.socket.disconnect();
        console.log('ConnectionService - receiveOverviewLayout() - Socket disconnected!');
      };
    });
  }

  public receiveDetailLayout(): Observable<any> {
    return new Observable(o => {
      this.socket.on('detail-layout', (detailLayout) => {
        o.next(detailLayout);
        console.log('ConnectionService - receiveDetailLayout() - DetailLayout received!');
      });
      return () => {
        this.socket.disconnect();
        console.log('ConnectionService - receiveDetailLayout() - Socket disconnected!');
      };
    });
  }

  public receiveTestImages(): Observable<any> {
    return new Observable(o => {
      this.socket.on('test-image', (image) => {
        o.next(image);
        console.log('ConnectionService - receiveTestImages() - Image received!');
      });
      return () => {
        this.socket.disconnect();
        console.log('ConnectionService - receiveTestImages() - Socket disconnected!');
      };
    });
  }

}
