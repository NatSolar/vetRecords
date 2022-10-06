  import { ActivatedRoute, Router } from '@angular/router';
  import { Component, Input, OnInit } from '@angular/core';
  import { Location } from '@angular/common';
  import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
  import { ToastrService } from 'ngx-toastr';
  import { zip } from 'rxjs';

  import { AdditionalRecord } from 'src/app/interfaces/additionalRecord';
  import { Appointment } from '../../interfaces/appointment';
  import { AppointmentsService } from '../../services/appointments.service';
  import { GeneralDataService } from '../../services/generalData.service';
  import { Owner } from 'src/app/interfaces/owner';
  import { OwnerService } from '../../services/owners.service';
  import { Record } from 'src/app/interfaces/record';
  import { RecordsService } from 'src/app/services/records.service';

  @Component({
    selector: 'app-record',
    templateUrl: './record.component.html'
  })
  export class RecordComponent implements OnInit {

    @Input('readOnly') readOnly: boolean = true
  
    record: Record = { name: '', birthday: '', yearsOld: 0, breed: '', genre: '', specie: '', color: '', ownerId: 0 }
    owner: Owner = { firstname: '', lastnameF: '', lastnameM: '', address: '', email: '', telephone: '', cedula: 0 }
    appointments:Appointment[] = []
    generalData: AdditionalRecord = { observations: [], dewormings: [], injectables: [], physicalExams: [], exams: [] }
    urlAvatar!:string
  
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
  
  }
  
