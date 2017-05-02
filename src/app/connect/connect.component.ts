import { Component } from '@angular/core';
import {ConnectMessage} from './ConnectMessage';
import {ConnectionService} from './connection.service';
import {Router} from '@angular/router';

@Component({
  selector: 'connect',
  templateUrl: 'connect.component.html',
  styleUrls: ['connect.component.css']
})

export class ConnectComponent {

  public messages: ConnectMessage = {errorMessage: '', succesMessage: ''};

  constructor(private connectService: ConnectionService, private router: Router) {}

  /**
   * Checks if the host and port are correctly filled in.
   * @param host
   * @param port
   * @returns {boolean}
   */
  allFieldsFilledIn(host, port): boolean {
    if (host === '' && port === '') {
      this.messages.errorMessage = 'Host and port need to be filled in!';
      this.messages.succesMessage = '';
      return false;
    } else if (host === '') {
      this.messages.errorMessage = 'Host needs to be filled in!';
      this.messages.succesMessage = '';
      return false;
    } else if (port === '') {
      this.messages.errorMessage = 'Port needs to be filled in!';
      this.messages.succesMessage = '';
      return false;
    }
    return true;
  }

  /**
   * Connect to websockets server.
   * @param host
   * @param port
   */
  connectToServer(host, port) {
    if (this.allFieldsFilledIn(host, port)) {
      this.connectService.connectToServer(host, port).subscribe(() => { });
      this.router.navigate(['/start-event']).then(() => { });
    }
  }

}
