import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { InjectableMed } from '../../../interfaces/injectable';

@Component({
  selector: 'app-injectables',
  templateUrl: './injectables.component.html'
})
export class InjectablesComponent implements OnInit {

  injectable: InjectableMed = { recordId: 0, regDt: new Date(), name: '' }

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
      this.injectable = this.data
    }
  }

  actionInjectable(injectableForm: any){
    this.emitService.next(injectableForm.value)
    this.modalService.dismissAll()
  }

}
