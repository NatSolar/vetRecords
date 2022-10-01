import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppointmentsRoutingModule } from './appointments-routing.module';
import { AppointmentsComponent } from './appointments/appointments.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { AppointmentNewComponent } from './components/appointment-new/appointment-new.component';


@NgModule({
  declarations: [
    AppointmentsComponent,
    CalendarComponent,
    AppointmentNewComponent
  ],
  imports: [
    CommonModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory,}),
    NgbModule,
    
    AppointmentsRoutingModule
  ]
})
export class AppointmentsModule { }
