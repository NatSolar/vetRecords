import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Owner } from 'src/app/interfaces/owner';
import { OwnerSelectComponent } from 'src/app/owners/owner-select/owner-select.component';

import { Appointment } from '../../../interfaces/appointment';

@Component({
  selector: 'app-appointment-new',
  templateUrl: './appointment-new.component.html',
  styleUrls: ['./appointment-new.component.css']
})
export class AppointmentNewComponent implements OnInit {

  @Input() public needRecordId!: boolean
  @Output() emitService = new EventEmitter();

  appointment: Appointment = { title: '', recordId: 0, start: new Date(), end: new Date() , content: ''}
  isEdit: boolean = false
  action: string = 'Nueva'
  btn: string = 'Agregar'

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
    if(this.needRecordId == null){
      this.needRecordId = true
    }
  }

  actionAppointment(appointmentForm:any){
    this.emitService.next(appointmentForm.value)
    this.modalService.dismissAll()
  }

  open() {
    const modalRef = this.modalService.open(OwnerSelectComponent);
    modalRef.componentInstance.emitService.subscribe((emmitedValue: Owner) => {
      this.appointment.recordId = emmitedValue.id!
      console.log(this.appointment.recordId)
    });
  }

}
