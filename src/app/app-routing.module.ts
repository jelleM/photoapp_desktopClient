import { NgModule }               from '@angular/core';
import { RouterModule, Routes }   from '@angular/router';
import { ConnectComponent }       from './connect/connect.component';
import { StartEventComponent }    from './start-event/start-event.component';

export const routes: Routes = [
  {path: '', component: ConnectComponent},
  {path: 'start-event', component: StartEventComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
