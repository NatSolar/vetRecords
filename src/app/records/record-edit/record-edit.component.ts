import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Record } from 'src/app/interfaces/record';
import { RecordsService } from '../../services/records.service';
import { Location } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OwnerSelectComponent } from 'src/app/owners/owner-select/owner-select.component';
import { Owner } from 'src/app/interfaces/owner';

@Component({
  selector: 'app-record-edit',
  templateUrl: './record-edit.component.html',
  styleUrls: ['./record-edit.component.css']
})
export class RecordEditComponent implements OnInit {

  record: Record = {
    name: '',
    birthday: '',
    yearsOld: 0,
    breed: '',
    genre: '',
    specie: '',
    color: '',
    ownerId: 0
  }

  recordForm! : FormGroup

  constructor(
    private location: Location, 
    private activatedRouter : ActivatedRoute, 
    private recordsService: RecordsService,
    private readonly toastr: ToastrService,
    private readonly modalService: NgbModal) { }

  ngOnInit(): void {
    this.activatedRouter.params.subscribe(({id}) => {
      this.recordsService.getById(id).subscribe({
        next: data => this.record = data[0],
        error: err => console.warn(err)
      })
    })
  }

  editRecord(recordForm: any){
    let recordEdit: Record = recordForm.value
    this.activatedRouter.params.subscribe(({id}) => {
      this.recordsService.updateRecord(recordEdit, id).subscribe({
        complete: () => this.toastr.success('Se ha modificado el propietario con éxito.'),
        error: err => this.toastr.error('Ha ocurrido un error: ', err)
      })
    })
    
  }

  goBack() : void{
    this.location.back();
  }

  open() {
    const modalRef = this.modalService.open(OwnerSelectComponent);
    modalRef.componentInstance.emitService.subscribe((emmitedValue: Owner) => {
      this.record.ownerNm = emmitedValue.firstname + " " + emmitedValue.lastnameF + " " + emmitedValue.lastnameM
      this.record.ownerId = emmitedValue.id!
    });
  }

}
