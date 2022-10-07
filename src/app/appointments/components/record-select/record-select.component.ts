import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Record } from 'src/app/interfaces/record';
import { RecordsService } from 'src/app/services/records.service';

@Component({
  selector: 'app-record-select',
  templateUrl: './record-select.component.html'
})
export class RecordSelectComponent implements OnInit {

  @Output() emitService = new EventEmitter();

  records:Record[] = []
  recordData!: Record
  
  constructor(private recordsService: RecordsService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.recordsService.getAll().subscribe({
      next: data => this.records = data,
      error: err => console.warn(err)
    })
  }

  selectRecord(record:Record){
    this.emitService.next(record)
    this.modalService.dismissAll()
  }

}
