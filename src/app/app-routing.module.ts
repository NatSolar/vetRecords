import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutComponent } from './about/about.component';

const routes: Routes = [
  { path: 'about', component: AboutComponent},
  { path: 'owners', loadChildren: () => import('./owners/owners.module').then(m => m.OwnersModule)},
  { path: 'appointments', loadChildren: () => import('./appointments/appointments.module').then(m => m.AppointmentsModule)},
  { path: 'records', loadChildren: () => import('./records/records.module').then(m => m.RecordsModule)},
  { path: '', redirectTo: 'records', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
