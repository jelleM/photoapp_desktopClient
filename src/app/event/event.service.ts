import * as io from 'socket.io-client';
import {Injectable, NgZone, OnInit} from "@angular/core";
import {ConnectionService} from "../connect/connection.service";
import {Image} from "../model/Image";

@Injectable()
export class EventService implements OnInit {

  private host: string;
  private port: string;
  private socket: any;

  constructor(private zone: NgZone, private connectionService: ConnectionService) {
  }

  ngOnInit(): void {
    this.socket = io('http://' + this.connectionService.getHost() + ':' + this.connectionService.getPort());
  }

  public sendPrintImages(images: Image[]) {
    this.socket.emit('print', images.map(x => x.imageNumber), (() => console.log('print images sent!')));
  }
}
