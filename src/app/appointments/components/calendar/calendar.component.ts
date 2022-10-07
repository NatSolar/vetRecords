import { Component, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { isSameDay, isSameMonth } from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { AppointmentsService } from '../../../services/appointments.service';
import { Appointment } from '../../../interfaces/appointment';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html'
})
export class CalendarComponent implements OnInit{

  @ViewChild('modalContent', { static: true }) modalContent!: TemplateRef<any>;

  view: CalendarView = CalendarView.Week;
  viewDate: Date = new Date();
  eventsData:CalendarEvent[] = []
  appointments:Appointment[] = []
  events: CalendarEvent[] = []

  CalendarView = CalendarView;
  
  modalData!: {
    action: string;
    event: CalendarEvent;
  };

  refresh = new Subject<void>();
  activeDayIsOpen: boolean = true;

  constructor(private modal: NgbModal, private appointmentService: AppointmentsService) {}

  ngOnInit(): void {

    let calendarEvent:CalendarEvent = {
      start: new Date (),
      title: ''
    }

    this.appointmentService.getAll().subscribe({
      next: data => {
        this.appointments = data
        for(let appointment of this.appointments){
          calendarEvent.title = appointment.title
          calendarEvent.start = new Date(appointment.start)
          calendarEvent.end = new Date(appointment.end)
          this.eventsData.push(calendarEvent)
          calendarEvent = { start: new Date (), title: '' }
        }
        this.events = this.eventsData
      }
    })
  }
  
  /* Abre el modal para consultar detalles */
  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

}
