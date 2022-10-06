import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { PhysicalExam } from '../../../interfaces/physicalExam';

@Component({
  selector: 'app-physical-exam',
  templateUrl: './physical-exam.component.html',
  styles: [
  ]
})
export class PhysicalExamComponent implements OnInit {

  physicalExam: PhysicalExam = { recordId: 0, weight: '', regDt: new Date() }

  @Input() public data: any;
  @Output() emitService = new EventEmitter();

  isEdit: boolean = false
  action: string = 'Nuevo'
  btn: string = 'Agregar'
  
  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
    if(this.data != null){
      this.isEdit = true
      this.action = 'Modificar'
      this.btn = 'Modificar'
      this.physicalExam = this.data
    }
  }

  actionPhysicalExam(observationForm: any){
    this.emitService.next(observationForm.value)
    this.modalService.dismissAll()
  }

}
