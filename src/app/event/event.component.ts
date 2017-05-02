import { Component }         from '@angular/core';
import { ConnectionService } from '../connect/connection.service';

@Component({
  selector: 'start-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})

export class EventComponent {

  constructor(public connectionService: ConnectionService) {}

}
