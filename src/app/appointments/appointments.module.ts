import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { AppointmentNewComponent } from './components/appointment-new/appointment-new.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { AppointmentsRoutingModule } from './appointments-routing.module';
import { CalendarComponent } from './components/calendar/calendar.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { RecordSelectComponent } from './components/record-select/record-select.component';


@NgModule({
  declarations: [
    AppointmentsComponent,
    AppointmentNewComponent,
    CalendarComponent,
    RecordSelectComponent    
  ],
  imports: [
    CommonModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory,}),
    FormsModule,
    NgbModule,
    
    AppointmentsRoutingModule
  ]
})
export class AppointmentsModule { }
