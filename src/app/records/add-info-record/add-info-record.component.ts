import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { zip } from 'rxjs';

import { AdditionalRecord } from 'src/app/interfaces/additionalRecord';
import { Appointment } from '../../interfaces/appointment';
import { AppointmentNewComponent } from 'src/app/appointments/components/appointment-new/appointment-new.component';
import { AppointmentsService } from '../../services/appointments.service';
import { Deworming } from '../../interfaces/deworning';
import { DewormingComponent } from '../components/deworming/deworming.component';
import { Exam } from '../../interfaces/exam';
import { ExamComponent } from '../components/exam/exam.component';
import { GeneralDataService } from '../../services/generalData.service';
import { InjectableMed } from '../../interfaces/injectable';
import { InjectablesComponent } from '../components/injectables/injectables.component';
import { Record } from 'src/app/interfaces/record';
import { RecordsService } from 'src/app/services/records.service';
import { Observation } from '../../interfaces/observations';
import { ObservationComponent } from '../components/observation/observation.component';
import { Owner } from 'src/app/interfaces/owner';
import { OwnerService } from '../../services/owners.service';
import { PhysicalExamComponent } from '../components/physical-exam/physical-exam.component';
import { PhysicalExam } from '../../interfaces/physicalExam';

@Component({
  selector: 'app-add-info-record',
  templateUrl: './add-info-record.component.html',
  styleUrls: ['./add-info-record.component.css']
})
export class AddInfoRecordComponent implements OnInit {

  record: Record = { name: '', birthday: '', yearsOld: 0, breed: '', genre: '', specie: '', color: '', ownerId: 0 }
  owner: Owner = { firstname: '', lastnameF: '', lastnameM: '', address: '', email: '', telephone: '', cedula: 0 }
  appointments:Appointment[] = []
  generalData: AdditionalRecord = { observations: [], dewormings: [], injectables: [], physicalExams: [], exams: [] }
  urlAvatar!:string
  recordForm! : FormGroup
  petId!: number

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
        this.petId = this.record.id!
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

    switch(arg) {
      case 1: {
        this.generalDataService.deleteObservation(id).subscribe({
          next: () => {
            this.toastr.success('Se ha eliminado la observación.'),
            this.generalDataService.getObservationByRecordId(this.petId).subscribe(data => this.generalData.observations = data)
          },
          error: err => { console.warn('Error: ', err) }
        })
        break;
      }

      case 2: {
        this.generalDataService.deleteDeworming(id).subscribe({
          next: () => {
            this.toastr.success('Se ha eliminado la desparasitación.'),
            this.generalDataService.getDewormingByRecordId(this.petId).subscribe(data => this.generalData.dewormings = data)
          },
          error: err => { console.warn('Error: ', err) }
        })
        break;
      }

      case 3: {
        this.generalDataService.deleteExam(id).subscribe({
          next: () => {
            this.toastr.success('Se ha eliminado el examen.'),
            this.generalDataService.getExamByRecordId(this.petId).subscribe(data => this.generalData.exams = data)
          },
          error: err => { console.warn('Error: ', err) }
        })
        break;
      }

      case 4: {
        this.generalDataService.deletePhysical(id).subscribe({
          next: () => {
            this.toastr.success('Se ha eliminado el examen físico.'),
            this.generalDataService.getPhysicalByRecordId(this.petId).subscribe(data => this.generalData.physicalExams = data)
          },
          error: err => { console.warn('Error: ', err) }
        })
        break;
      }

      case 5: {
        this.generalDataService.deleteInjectableMed(id).subscribe({
          next: () => {
            this.toastr.success('Se ha eliminado el medicamento o inyectable.'),
            this.generalDataService.getInjectableByRecordId(this.petId).subscribe(data => this.generalData.injectables = data)
          },
          error: err => { console.warn('Error: ', err) }
        })
        break;
      }

    }

  }

  add(arg:number){
    let component: any

    switch(arg) {
      case 1 : { component = ObservationComponent; break; }
      case 2: { component = DewormingComponent; break; }
      case 3: { component = ExamComponent; break; }
      case 4: { component = PhysicalExamComponent; break; }
      case 5: { component = InjectablesComponent; break;}
      case 6: { component = AppointmentNewComponent; break; }
    }

    const modalRef = this.modalService.open(component)
    modalRef.componentInstance.needRecordId = false
    modalRef.componentInstance.emitService.subscribe((emmitedValue:any) => {

    if(arg == 1){
      let observation:Observation = emmitedValue
      observation.recordId = this.petId
      this.generalDataService.addObservation(observation).subscribe({
        next: () => {
          this.toastr.success('Se ha registrado la observación.')
          this.generalDataService.getObservationByRecordId(this.petId).subscribe(data => this.generalData.observations = data)
        },
        error: err => console.warn(err)
      })
    } else
    
    if(arg == 2){
      let deworming:Deworming = emmitedValue
      deworming.recordId = this.petId
      this.generalDataService.addDeworming(deworming).subscribe({
        next: () => {
          this.toastr.success('Se ha registrado la desparasitación.')
          this.generalDataService.getDewormingByRecordId(this.petId).subscribe(data => this.generalData.dewormings = data)
        },
        error: err => console.warn(err)
      })
    } else
      
    if(arg == 3){
      let exam:Exam = emmitedValue
      exam.recordId = this.petId
      this.generalDataService.addExam(exam).subscribe({
        next: () => {
          this.toastr.success('Se ha registrado el examen.')
          this.generalDataService.getExamByRecordId(this.petId).subscribe(data => this.generalData.exams = data)
        },
        error: err => console.warn(err)
      })
    } else 

    if(arg == 4){
      let physicalExam:PhysicalExam = emmitedValue
      physicalExam.recordId = this.petId
      this.generalDataService.addPhysical(physicalExam).subscribe({
        next: () => {
          this.toastr.success('Se ha registrado el examen físico.')
          this.generalDataService.getPhysicalByRecordId(this.petId).subscribe(data => this.generalData.physicalExams = data)
        },
        error: err => console.warn(err)
      })
    } else

    if(arg == 5){
      let injectable:InjectableMed = emmitedValue
      injectable.recordId = this.petId
      this.generalDataService.addInjectableMed(injectable).subscribe({
        next: () => {
          this.toastr.success('Se ha registrado el medicamento/inyectable.')
          this.generalDataService.getInjectableByRecordId(this.petId).subscribe(data => this.generalData.injectables = data)
        },
        error: err => console.warn(err)
      })
    } else

    if(arg == 6){
      let appointment:Appointment = emmitedValue
      appointment.recordId = this.petId
      console.log(appointment)
      this.appointmentsService.addAppointment(appointment).subscribe({
        next: () => {
          this.toastr.success('Se ha registrado la nueva cita.')
          this.appointmentsService.getByRecordId(this.petId).subscribe(data => this.appointments = data)
        },
        error: err => console.warn(err)
      })
    }
    });
  }

  edit(object:any, arg:number){
    let component: any

    switch(arg) {
      case 1 : { component = ObservationComponent; break; }
      case 2: { component = DewormingComponent; break; }
      case 3: { component = ExamComponent; break; }
      case 4: { component = PhysicalExamComponent; break; }
      case 5: { component = InjectablesComponent; break;}
      case 6: { component = AppointmentNewComponent; break; }
    }

    const modalRef = this.modalService.open(component)
    modalRef.componentInstance.data = object

    modalRef.componentInstance.emitService.subscribe((emmitedValue:any) => {

    if(arg == 1){
      let observation:Observation = object
      observation.observation = emmitedValue.observation
      observation.regDt = emmitedValue.regDt
      this.generalDataService.updateObservation(observation, observation.id!).subscribe({
        next: () => {
          this.toastr.success('Se ha modificado la observación.')
          this.generalDataService.getObservationByRecordId(this.petId).subscribe(data => this.generalData.observations = data)
        },
        error: err => console.warn(err)
      })
    } else 

    if(arg == 2){
      let deworming:Deworming = object
      deworming.anthelmintic = emmitedValue.anthelmintic
      deworming.regDt = emmitedValue.regDt
      deworming.nextDate = emmitedValue.nextDate
      this.generalDataService.updateDeworming(deworming, deworming.id!).subscribe({
        next: () => {
          this.toastr.success('Se ha modificado la desparasitación.')
          this.generalDataService.getDewormingByRecordId(this.petId).subscribe(data => this.generalData.dewormings = data)
        },
        error: err => console.warn(err)
      })
    } else 

    if(arg == 3){
      let exam:Exam = object
      exam.name = emmitedValue.name
      exam.regDt = emmitedValue.regDt
      this.generalDataService.updateExam(exam, exam.id!).subscribe({
        next: () => {
          this.toastr.success('Se ha modificado el examen.')
          this.generalDataService.getExamByRecordId(this.petId).subscribe(data => this.generalData.exams = data)
        },
        error: err => console.warn(err)
      })
    } else

    if(arg == 4){
      let physicalExam:PhysicalExam = object
      physicalExam.weight = emmitedValue.weight
      physicalExam.regDt = emmitedValue.regDt
      this.generalDataService.updatePhysical(physicalExam, physicalExam.id!).subscribe({
        next: () => {
          this.toastr.success('Se ha modificado el examen físico.')
          this.generalDataService.getPhysicalByRecordId(this.petId).subscribe(data => this.generalData.physicalExams = data)
        },
        error: err => console.warn(err)
      })
    } else

    if(arg == 5){
      let injectable:InjectableMed = object
      injectable.recordId = this.petId
      this.generalDataService.updateInjectableMed(injectable, injectable.id!).subscribe({
        next: () => {
          this.toastr.success('Se ha modificado el medicamento/inyectable.')
          this.generalDataService.getInjectableByRecordId(this.petId).subscribe(data => this.generalData.injectables = data)
        },
        error: err => console.warn(err)
      })
    }
    })
  }

}
