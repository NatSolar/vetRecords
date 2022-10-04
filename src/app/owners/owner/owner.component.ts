import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Owner } from 'src/app/interfaces/owner'; 
import { OwnerService } from 'src/app/services/owners.service'; 
import { Location } from '@angular/common';
import { Record } from '../../interfaces/record';
import { RecordsService } from '../../services/records.service';
import { Appointment } from '../../interfaces/appointment';
import { AppointmentsService } from '../../services/appointments.service';

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.css']
})
export class OwnerComponent implements OnInit {

  owner: Owner = {
    firstname: '',
    lastnameF: '',
    lastnameM: '',
    address: '',
    email: '',
    telephone: '',
    cedula: 0
  }

  pets: Record[] = []
  appointments: Appointment[] = []
  appointment!: Appointment
  petsName: string[] = []
  
  urlAvatar!: string

  constructor(
    private activatedRouter : ActivatedRoute, 
    private ownersService: OwnerService, 
    private location: Location,
    private readonly recordsService: RecordsService,
    private readonly appointmentsService: AppointmentsService
    ) { }

  ngOnInit(): void {
    this.activatedRouter.params.subscribe(({id}) => {
      this.ownersService.getById(id).subscribe({
        next: data => this.owner = data[0],
        error: err => console.warn(err)
      }),
      this.recordsService.getAllPetsByOwnerId(id).subscribe({
        next: resp => this.pets = resp,
        error: err => console.warn(err)
      })
      this.appointmentsService.getByOwnerId(id).subscribe({
        next: data => this.appointments = data,
        error: err => console.warn(err)
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

  getPetNameFromId(id:number) {
    if(this.pets.length > 0 && id != null){
      return this.pets.find(pet => pet.id === id)!.name
    } else {
      return '';
    }
}

}
