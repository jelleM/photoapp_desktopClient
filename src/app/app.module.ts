// Modules
import { BrowserModule }    from '@angular/platform-browser';
import { NgModule }         from '@angular/core';
import { FormsModule }      from '@angular/forms';
import { HttpModule }       from '@angular/http';
import { AppRoutingModule } from './app-routing.module';

// Components
import { AppComponent }     from './app.component';
import { ConnectComponent } from './connect/connect.component';
import { EventComponent }   from './event/event.component';

// Services
import { ConnectionService } from './connect/connection.service';

@NgModule({
  declarations: [
    AppComponent,
    ConnectComponent,
    EventComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    ConnectionService
  ],
  bootstrap: [
    AppComponent
  ]
})

export class AppModule { }
