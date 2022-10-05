import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Exam } from 'src/app/interfaces/exam';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit {

  exam: Exam = {
    recordId: 0,
    regDt: new Date(),
    name: ''
  }

  @Output() emitService = new EventEmitter();
  
  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  addExam(examForm: any){
    this.emitService.next(examForm.value)
    this.modalService.dismissAll()
  }

}
