import { Component } from '@angular/core';
import {ConnectionService} from '../connect/connection.service';

@Component({
  selector: 'start-event',
  templateUrl: './start-event.component.html',
  styleUrls: ['./start-event.component.css']
})

export class StartEventComponent {

  constructor(private connectionService: ConnectionService) {}

}
