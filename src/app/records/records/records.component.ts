import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { Record } from 'src/app/interfaces/record';
import { RecordsService } from 'src/app/services/records.service';
import { AppointmentsService } from '../../services/appointments.service';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html'
})
export class RecordsComponent implements OnInit {

  records: Record[] = []

  constructor(private recordsService: RecordsService,
              private readonly toastr: ToastrService,
              private appointmentService: AppointmentsService) { }

  ngOnInit(): void {
    this.recordsService.getAll().subscribe({
      next: data => this.records = data.sort((a, b) => a.id! - b.id!) ,
      error: err => console.warn(err)
    })
  }

  deleteRecord(record: Record){
    record.useYn = false;
    this.recordsService.deleteRecords(record.id!, record).subscribe({
      next: () => {
        this.appointmentService.deleteAppointmentByRecordId(record.id!).subscribe({
          complete: () => {
            this.toastr.success('Se ha eliminado el paciente.')
            this.recordsService.getAll().subscribe(data => this.records = data.sort((a, b) => a.id! - b.id!))
          }
        })
      },
      error: err => {
        console.warn('Error: ', err)
        this.toastr.error('Se ha producido un error! ', err)
      }
    })
  }

}
