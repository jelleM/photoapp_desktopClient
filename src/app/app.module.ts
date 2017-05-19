// Modules
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {AppRoutingModule} from './app-routing.module';
import {SwiperModule}     from 'angular2-useful-swiper';

// Components
import {AppComponent} from './app.component';
import {ConnectComponent} from './connect/connect.component';
import {EventComponent} from './event/event.component';

// Services
import {ConnectionService} from './connect/connection.service';
import {EventDetailComponent} from './event/event-detail/event-detail.component';
import {EventOverviewComponent} from './event/event-overview/event-overview.component';

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
    SwiperModule
  ],
  providers: [
    ConnectionService
  ],
  bootstrap: [
    AppComponent
  ]
})

export class AppModule {
}
