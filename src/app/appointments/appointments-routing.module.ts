import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentsComponent } from './appointments/appointments.component';

const routes: Routes = [
  { path: '', component: AppointmentsComponent},
  //{ path: 'owners/:id', component: OwnerComponent},
  //{ path: 'owner-new', component: OwnerNewComponent},
  //{ path: 'owner-edit/:id', component: OwnerEditComponent},
  { path: '', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppointmentsRoutingModule { }
