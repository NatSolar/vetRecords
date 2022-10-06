import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Exam } from 'src/app/interfaces/exam';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html'
})
export class ExamComponent implements OnInit {

  exam: Exam = { recordId: 0, regDt: new Date(), name: '' }

  @Output() emitService = new EventEmitter();
  @Input() public data: any;

  isEdit: boolean = false
  action: string = 'Nuevo'
  btn: string = 'Agregar'
  
  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
    if(this.data != null){
      this.isEdit = true
      this.action = 'Modificar'
      this.btn = 'Modificar'
      this.exam = this.data
    }
  }

  actionExam(examForm: any){
    this.emitService.next(examForm.value)
    this.modalService.dismissAll()
  }

}
