import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Record } from 'src/app/interfaces/record';
import { RecordsService } from 'src/app/services/records.service';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css']
})
export class RecordsComponent implements OnInit {

  records: Record[] = []

  constructor(private recordsService: RecordsService,
              private readonly toastr: ToastrService) { }

  ngOnInit(): void {
    this.recordsService.getAll().subscribe({
      next: data => this.records = data,
      error: err => console.warn(err)
      })
  }

  deleteRecord(id: number){
    this.recordsService.deleteRecord(id).subscribe({
      next: () => {
        this.toastr.success('Se ha eliminado exitosamente el paciente.')
        setTimeout(()=>{
          location.reload();
        }, 1000)
      },
      error: err => {
        console.warn('Error: ', err)
        this.toastr.error('Se ha producido un error! ', err)
      }
    })
  }

}
