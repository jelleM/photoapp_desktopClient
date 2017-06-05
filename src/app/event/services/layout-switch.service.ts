import {Injectable} from '@angular/core';

@Injectable()
export class LayoutSwitchService {

  private switched: boolean;

  constructor() {
    this.switched = false;
  }

  public getSwitchState(): boolean {
    return this.switched;
  }

  public toggleSwitched(): void {
    this.switched = !this.switched;
  }

}
