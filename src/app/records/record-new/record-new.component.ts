import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Record } from 'src/app/interfaces/record';
import { RecordsService } from 'src/app/services/records.service';
import { Location } from '@angular/common'; 
import { OwnerSelectComponent } from '../../owners/owner-select/owner-select.component';
import { Owner } from 'src/app/interfaces/owner';

@Component({
  selector: 'app-record-new',
  templateUrl: './record-new.component.html',
  styleUrls: ['./record-new.component.css']
})
export class RecordNewComponent {

  record : Record = {
    name: '',
    birthday: '',
    yearsOld: 0,
    breed: '',
    genre: '',
    specie: '',
    color: '',
    ownerId: 0
  }

  ownerId: number = 0;
  ownerNm: string = "";

  constructor(private readonly recordsService: RecordsService, 
              private location: Location, 
              private readonly toastr: ToastrService,
              private readonly modalService: NgbModal) { }

  onSubmit(contactForm : any){
    this.record = contactForm.value
    let age = this.calculateAge(this.record.birthday);
    this.record.yearsOld = age
    this.record.ownerId = this.ownerId
    this.record.ownerNm! = this.ownerNm
    this.recordsService.addRecord(this.record).subscribe({
      next: () => {
        this.toastr.success('Se ha registrado exitosamente el paciente!')
        contactForm.resetForm()
      },
      error: err => {
        console.warn('Error: ', err)
        this.toastr.error('Se ha producido un error: ', err)
      } 
    })
  }

  calculateAge(birthdate: string): number{
    let age:number = 0
    const [year, month, day] = birthdate.split('-')
    let newDate = new Date(+year, +month - 1, +day);
    if (newDate) {
      const timeDiff = Math.abs(Date.now() - newDate.getTime() );
      age = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365);
    }
    return age
  }

  goBack() : void{
    this.location.back();
  }

  open() {
    const modalRef = this.modalService.open(OwnerSelectComponent);
    modalRef.componentInstance.emitService.subscribe((emmitedValue: Owner) => {
      this.ownerNm = emmitedValue.firstname + " " + emmitedValue.lastnameF + " " + emmitedValue.lastnameM
      this.ownerId = emmitedValue.id!
    });
  }

}
