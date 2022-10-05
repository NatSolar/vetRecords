import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observation } from '../../../interfaces/observations';

@Component({
  selector: 'app-observation',
  templateUrl: './observation.component.html',
  styleUrls: ['./observation.component.css']
})
export class ObservationComponent implements OnInit {

  observation: Observation = {
    observation: '',
    regDt: new Date(),
    recordId: 0
  }

  @Output() emitService = new EventEmitter();
  
  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  addObservation(observationForm: any){
    this.emitService.next(observationForm.value)
    this.modalService.dismissAll()
  }

}
