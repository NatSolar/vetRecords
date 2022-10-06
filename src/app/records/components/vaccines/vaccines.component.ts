import { Component, Input, OnInit, } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { GeneralDataService } from '../../../services/generalData.service';
import { Vaccines } from 'src/app/interfaces/vaccines';

@Component({
  selector: 'app-vaccines',
  templateUrl: './vaccines.component.html',
  styleUrls: ['./vaccines.component.css']
})

export class VaccinesComponent implements OnInit  {

  petId:number = 0
  
  @Input('readOnly') readOnly: any

  lineVaccine : Vaccines = { petId: 0, yearsOld: 0, date: '', vac1: false, vac2: false, vac3: false, vac4: false, vac5: false, vac6: false, vac7: false, vac8: false, unit: '' }
  count: number = 0
  generalVaccines: Vaccines[] =[]

  constructor(private readonly vaccinesService: GeneralDataService, 
              private readonly toastr: ToastrService,
              private activatedRouter : ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRouter.params.subscribe(({id}) => {
      this.petId = id
      this.vaccinesService.getVaccinesByRecordId(id).subscribe({
        next: data => {
          this.generalVaccines = data.sort((a, b) => a.date.localeCompare(b.date))
          this.count = this.generalVaccines.length
        },
        error: err => console.warn(err)
      })
    }) 
  }

  onSubmit(){
    this.count = this.generalVaccines.length
    let vaccine = this.lineVaccine
    vaccine.petId = this.petId

    this.vaccinesService.addVaccine(this.lineVaccine).subscribe({
      next: () => {
        this.vaccinesService.getVaccinesByRecordId(this.petId).subscribe(data => {
          this.generalVaccines = data.sort((a, b) => a.date.localeCompare(b.date)) 
        })
        this.toastr.success('Se ha registrado exitosamente las vacunas.')
        this.lineVaccine = { petId: 0, yearsOld: 0, date: '', vac1: false, vac2: false, vac3: false, vac4: false, vac5: false, vac6: false, vac7: false, vac8: false, unit: '' }
      },
      error: err => console.warn(err)
    })
  }

  deleteVaccine(id: number){
    this.vaccinesService.deleteVaccine(id).subscribe({
      next: () => {
        this.toastr.success('Se ha eliminado la vacuna seleccionada.')
        this.vaccinesService.getVaccinesByRecordId(this.petId).subscribe(data => {
          this.generalVaccines = data.sort((a, b) => a.date.localeCompare(b.date)) 
        })
      },
      error: err => console.warn(err)
    })
  }

}
