// Modules
import {BrowserModule} from '@angular/platform-browser';
import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {AppRoutingModule} from './app-routing.module';
import {SwiperModule}     from 'angular2-useful-swiper';
import { QRCodeModule } from 'angular2-qrcode';

// Components
import {AppComponent} from './app.component';
import {ConnectComponent} from './connect/connect.component';
import {EventComponent} from './event/event.component';

// Services
import {ConnectionService} from './connect/connection.service';
import {EventDetailComponent} from './event/event-detail/event-detail.component';
import {EventOverviewComponent} from './event/event-overview/event-overview.component';
import {LayoutSwitchService} from './event/services/layout-switch.service';

// Pipes
import {ImageSortPipe} from './pipe/ImageSort';

@NgModule({
  declarations: [
    AppComponent,
    ConnectComponent,
    EventComponent,
    EventOverviewComponent,
    EventDetailComponent,
    ImageSortPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    SwiperModule,
    QRCodeModule
  ],
  providers: [
    ConnectionService,
    LayoutSwitchService
  ],
  bootstrap: [
    AppComponent
  ],
  schemas:     [CUSTOM_ELEMENTS_SCHEMA]
})

export class AppModule {
}
