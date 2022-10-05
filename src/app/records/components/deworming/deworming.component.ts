import { Component, EventEmitter, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Deworming } from 'src/app/interfaces/deworning';

@Component({
  selector: 'app-deworming',
  templateUrl: './deworming.component.html',
  styleUrls: ['./deworming.component.css']
})
export class DewormingComponent {

  deworming: Deworming = {
    recordId: 0,
    regDt: new Date(),
    anthelmintic: '',
    nextDate: new Date()
  }

  @Output() emitService = new EventEmitter();

  constructor(private modalService: NgbModal) { }

    addDeworming(dewormingForm: any){
      this.emitService.next(dewormingForm.value)
      this.modalService.dismissAll()
    }

}
