/**
 * This class is used to define the layout of an Event.
 */
export class EventLayout {
  private eventLayout: number;
  private backgroundColor: string;

  constructor(eventLayout: number, backgroundColor: string) {
    this.eventLayout = eventLayout;
    this.backgroundColor = backgroundColor;
  }
}
