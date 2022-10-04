import { Component, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Owner } from 'src/app/interfaces/owner';
import { Record } from 'src/app/interfaces/record';
import { OwnerSelectComponent } from 'src/app/owners/owner-select/owner-select.component';
import { RecordsService } from 'src/app/services/records.service';
import { Location } from '@angular/common';
import { OwnerService } from '../../services/owners.service';
import { Appointment } from '../../interfaces/appointment';
import { AppointmentsService } from '../../services/appointments.service';
import { Deworming } from '../../interfaces/deworning';
import { zip } from 'rxjs';
import { InjectableMed } from '../../interfaces/injectable';
import { Observation } from '../../interfaces/observations';
import { GeneralDataService } from '../../services/generalData.service';
import { AdditionalRecord } from 'src/app/interfaces/additionalRecord';
import { AppointmentNewComponent } from 'src/app/appointments/components/appointment-new/appointment-new.component';

@Component({
  selector: 'app-add-info-record',
  templateUrl: './add-info-record.component.html',
  styleUrls: ['./add-info-record.component.css']
})
export class AddInfoRecordComponent implements OnInit {

  record: Record = { name: '', birthday: '', yearsOld: 0, breed: '', genre: '', specie: '', color: '', ownerId: 0 }
  owner: Owner = { firstname: '', lastnameF: '', lastnameM: '', address: '', email: '', telephone: '', cedula: 0 }
  appointments:Appointment[] = []
  generalData: AdditionalRecord = {
    observations: [],
    dewormings: [],
    injectables: [],
    physicalExams: [],
    exams: []
  }

  urlAvatar!:string
  recordForm! : FormGroup

  constructor(
    private location: Location, 
    private activatedRouter : ActivatedRoute, 
    private recordsService: RecordsService,
    private readonly toastr: ToastrService,
    private readonly modalService: NgbModal,
    private readonly ownerService: OwnerService,
    private readonly appointmentsService: AppointmentsService,
    private readonly generalDataService: GeneralDataService,
    public router: Router) { }

  ngOnInit(): void {
    this.activatedRouter.params.subscribe(({id}) => {

      let callRecords = this.recordsService.getById(id)
      let callOwner = this.ownerService.getById(id)
      let callAppointments = this.appointmentsService.getByRecordId(id)
      let callDewormings = this.generalDataService.getDewormingByRecordId(id)
      let callInjectables = this.generalDataService.getInjectableByRecordId(id)
      let callObservations = this.generalDataService.getObservationByRecordId(id)
      let callPhysicalExams = this.generalDataService.getPhysicalByRecordId(id)
      let callExams = this.generalDataService.getExamByRecordId(id)

      zip(callRecords, callOwner, callAppointments, callDewormings, callInjectables, callObservations, callPhysicalExams, callExams).subscribe((
        [results1, results2, results3, results4, results5, results6, results7, results8]) => {
        this.record = results1[0],
        this.owner = results2[0],
        this.appointments = results3
        this.generalData.dewormings = results4
        this.generalData.injectables = results5
        this.generalData.observations = results6
        this.generalData.physicalExams = results7
        this.generalData.exams = results8
      })
    })
  }

  goBack() : void{
    this.location.back();
  }

  getAvatar(specie: string){
    switch(specie) { 
      case 'Canina': {
          this.urlAvatar = "https://cdn3.iconfinder.com/data/icons/avatars-9/145/Avatar_Dog-512.png"
          break;
      }
      case 'Felina': {
        this.urlAvatar = "https://cdn3.iconfinder.com/data/icons/avatars-9/145/Avatar_Cat-512.png"
        break;
      }
      default: { 
        this.urlAvatar = "https://cdn3.iconfinder.com/data/icons/avatars-9/145/Avatar_Penguin-512.png" 
        break; 
      } 
   } 
   return this.urlAvatar;
  }

  delete(id:number, arg:number){

    if(arg == 1){
      this.generalDataService.deleteObservation(id).subscribe({
        next: () => {
          this.toastr.success('Se ha eliminado la observación.')
          setTimeout(()=>{
            this.router.navigate(['records']);
          }, 1000)
        },
        error: err => {
          console.warn('Error: ', err)
          this.toastr.error('Se ha producido un error! ', err)
        }
      })
    } else if (arg == 2){
      this.generalDataService.deleteDeworming(id).subscribe({
        next: () => {
          this.toastr.success('Se ha eliminado la desparasitación.')
          setTimeout(()=>{
            this.router.navigate(['records']);
          }, 1000)
        },
        error: err => {
          console.warn('Error: ', err)
          this.toastr.error('Se ha producido un error! ', err)
        }
      })
    } else if (arg == 3){
      this.generalDataService.deleteExam(id).subscribe({
        next: () => {
          this.toastr.success('Se ha eliminado el examen.')
          setTimeout(()=>{
            this.router.navigate(['records']);
          }, 1000)
        },
        error: err => {
          console.warn('Error: ', err)
          this.toastr.error('Se ha producido un error! ', err)
        }
      })
    } else if (arg == 4){
      this.generalDataService.deletePhysical(id).subscribe({
        next: () => {
          this.toastr.success('Se ha eliminado el examen físico.')
          setTimeout(()=>{
            this.router.navigate(['records']);
          }, 1000)
        },
        error: err => {
          console.warn('Error: ', err)
          this.toastr.error('Se ha producido un error! ', err)
        }
      })
    } else if (arg == 5){
      this.generalDataService.deletePhysical(id).subscribe({
        next: () => {
          this.toastr.success('Se ha eliminado el medicamento o inyectable.')
          setTimeout(()=>{
            this.router.navigate(['records']);
          }, 1000)
        },
        error: err => {
          console.warn('Error: ', err)
          this.toastr.error('Se ha producido un error! ', err)
        }
      })
    }

  }

  add(arg:number){
    let component: any
    switch(arg) {
      case 1 : {
        component = OwnerSelectComponent
        break;
      }
      case 2: {
        component = OwnerSelectComponent
        break;
      }
      case 3: {
        component = OwnerSelectComponent
        break;
      }
      case 4: {
        component = OwnerSelectComponent
        break;
      }
      case 5: {
        component = OwnerSelectComponent
        break;
      }
      case 6: {
        component = AppointmentNewComponent
        break;
      }
    }

    const modalRef = this.modalService.open(component)
  }

}
