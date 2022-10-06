import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Owner } from 'src/app/interfaces/owner';
import { OwnerService } from 'src/app/services/owners.service';

@Component({
  selector: 'app-owner-select',
  templateUrl: './owner-select.component.html'
})
export class OwnerSelectComponent implements OnInit {
  
  owners: Owner[] = []
  ownerData!: Owner

  @Output() emitService = new EventEmitter();
  
  constructor(private ownersService: OwnerService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.ownersService.getAll().subscribe({
      next: data => this.owners = data,
      error: err => console.warn('Error: ', err)
      })
  }

  selectOwner(owner:Owner){
    this.emitService.next(owner)
    this.modalService.dismissAll()
  }
}