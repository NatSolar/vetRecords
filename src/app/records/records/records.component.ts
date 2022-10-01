import { Component, OnInit } from '@angular/core';
import { Record } from 'src/app/interfaces/record';
import { RecordsService } from 'src/app/services/records.service';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css']
})
export class RecordsComponent implements OnInit {

  records: Record[] = []

  constructor(private recordsService: RecordsService) { }

  ngOnInit(): void {
    this.recordsService.getAll().subscribe({
      next: data => this.records = data,
      error: err => console.warn(err)
      })
  }

  deleteRecord(id: any){

  }

}
