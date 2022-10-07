import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentsComponent } from './appointments/appointments.component';
import { AppointmentNewComponent } from './components/appointment-new/appointment-new.component';

const routes: Routes = [
  { path: '', component: AppointmentsComponent},
  { path: 'appointment-new', component: AppointmentNewComponent},
  { path: '', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppointmentsRoutingModule { }
