import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as io        from 'socket.io-client';

@Injectable()
export class ConnectionService {

  private host: string;
  private port: string;
  private socket: any;

  constructor(private zone: NgZone) { }

  /**
   * Connect to the server.
   * @param host
   * @param port
   * @returns {Observable}
   */
  public connectToServer(host, port): Observable<any> {
    return new Observable(o => {
      this.zone.run(() => {
        this.host = host;
        this.port = port;

        this.socket = io(host + ':' + port);

        // Socket.io callbacks need to be in constructor.
        this.socket.on('connect', function(){
          console.log('Client is connected!');
        });

        this.socket.on('overview-layout', function (ol) {
          console.log('Received OverviewLayout: ' + JSON.stringify(ol));
        });

        this.socket.on('detail-layout', function (dl) {
          console.log('Received DetailLayout: ' + JSON.stringify(dl));
        });
      });
    });
  }

}
