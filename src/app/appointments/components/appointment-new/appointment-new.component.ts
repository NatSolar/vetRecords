import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Location } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Appointment } from '../../../interfaces/appointment';
import { Record } from 'src/app/interfaces/record';
import { RecordSelectComponent } from '../record-select/record-select.component';
import { AppointmentsService } from '../../../services/appointments.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-appointment-new',
  templateUrl: './appointment-new.component.html'
})
export class AppointmentNewComponent implements OnInit {

  @Input() public needRecordId!: boolean
  @Input() public recordId!: number
  @Input() public data: any;
  @Output() emitService = new EventEmitter();

  appointment: Appointment = { title: '', recordId: 0, start: new Date(), end: new Date(), ownerId: 0}
  isEdit: boolean = false
  action: string = 'Nueva'
  btn: string = 'Agregar'
  petNm: string = ''

  constructor(
    private modalService: NgbModal, 
    private location: Location, 
    private readonly appointmentsService: AppointmentsService,
    private readonly toastr: ToastrService) { }

  ngOnInit(): void {
    if(this.needRecordId == null){
      this.needRecordId = true
    }
    if(this.data != null){
      this.appointment = this.data
      this.btn = 'Modificar'
      this.action = 'Modificar'
    }
  }

  actionAppointment(appointmentForm:any){
    if(!this.needRecordId){
      this.appointment = appointmentForm.value
      this.emitService.next(this.appointment)
      this.modalService.dismissAll()
    } else {
      this.appointment = appointmentForm.value      
      this.appointmentsService.addAppointment(this.appointment).subscribe({
        next: () => {
          this.toastr.success('Se ha registrado la nueva cita.')
          appointmentForm.resetForm()
          this.petNm = ''
        },
        error: err => console.warn(err)
      })
    }
    
  }

  open() {
    const modalRef = this.modalService.open(RecordSelectComponent);
    modalRef.componentInstance.emitService.subscribe((emmitedValue: Record) => {
      this.appointment.recordId = emmitedValue.id!
      this.petNm = emmitedValue.name!
      this.appointment.ownerId = emmitedValue.ownerId
    });
  }

  goBack() : void{
    this.location.back();
  }

}
