import {Injectable, NgZone} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import * as io        from 'socket.io-client';

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
    this.socket = io(host + ':' + port);
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
