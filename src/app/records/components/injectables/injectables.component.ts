import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InjectableMed } from '../../../interfaces/injectable';

@Component({
  selector: 'app-injectables',
  templateUrl: './injectables.component.html',
  styleUrls: ['./injectables.component.css']
})
export class InjectablesComponent implements OnInit {

  injectable: InjectableMed = {
    recordId: 0,
    regDt: new Date(),
    name: ''
  }

  @Output() emitService = new EventEmitter();

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  addEInjectable(injectableForm: any){
    this.emitService.next(injectableForm.value)
    this.modalService.dismissAll()
  }

}
