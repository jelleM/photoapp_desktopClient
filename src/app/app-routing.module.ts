import { NgModule }               from '@angular/core';
import { RouterModule, Routes }   from '@angular/router';
import { ConnectComponent }       from './connect/connect.component';
import { EventComponent }    from './event/event.component';

export const routes: Routes = [
  {path: '', component: ConnectComponent},
  {path: 'event', component: EventComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
