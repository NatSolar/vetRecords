import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Deworming } from 'src/app/interfaces/deworning';

@Component({
  selector: 'app-deworming',
  templateUrl: './deworming.component.html'
})
export class DewormingComponent implements OnInit {

  deworming: Deworming = { recordId: 0, regDt: new Date(), anthelmintic: '', nextDate: new Date() }

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
      this.deworming = this.data
    }
  }

  actionDeworming(dewormingForm: any){
    this.emitService.next(dewormingForm.value)
    this.modalService.dismissAll()
  }

}
