import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Observation } from '../../../interfaces/observations';

@Component({
  selector: 'app-observation',
  templateUrl: './observation.component.html'
})
export class ObservationComponent implements OnInit {

  observation: Observation = { observation: '', regDt: new Date(), recordId: 0 }

  @Input() public data: any;
  @Output() emitService = new EventEmitter();

  isEdit: boolean = false
  action: string = 'Nueva'
  btn: string = 'Agregar'
  
  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
    if(this.data != null){
      this.isEdit = true
      this.action = 'Modificar'
      this.btn = 'Modificar'
      this.observation = this.data
    }
  }

  actionObservation(observationForm: any){
    this.emitService.next(observationForm.value)
    this.modalService.dismissAll()
  }

}
